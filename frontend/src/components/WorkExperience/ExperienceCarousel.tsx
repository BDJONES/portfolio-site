import { useState, useEffect, useRef, useCallback } from "react";
import { ExperienceCard, ExperienceCardProps } from "./ExperienceCard";
import "./styling/ExperienceCarousel.css";
import { CarouselNavButton } from "../common/CarouselNavButton";

/** Minimum horizontal movement (px) before we treat the gesture as a horizontal swipe (avoids stealing vertical scroll). */
const SWIPE_LOCK_THRESHOLD = 12;
/** Minimum swipe distance (px) to change slide on release. */
const SWIPE_CHANGE_THRESHOLD = 40;

interface ExperienceCarouselProps {
    experiences: ExperienceCardProps[];
    onCardClick: (experience: ExperienceCardProps) => void;
    selectedExperience: ExperienceCardProps | null;
}

// Helper function to parse date strings in "MMM YYYY" format (e.g., "Feb 2025") or "Present"
function parseEndDate(endDate: string): Date {
    if (endDate.toLowerCase() === "present") {
        return new Date(); // Present is always the most recent
    }

    // Parse format "MMM YYYY" (e.g., "Feb 2025", "Jan 2025")
    const monthAbbreviations = [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
    ];

    const parts = endDate.trim().toLowerCase().split(" ");
    if (parts.length >= 2) {
        const month = monthAbbreviations.indexOf(parts[0]);
        const year = parseInt(parts[1]);
        if (month !== -1 && !isNaN(year)) {
            return new Date(year, month, 1);
        }
    }

    // Fallback: try to parse as a standard date
    const parsed = new Date(endDate);
    return isNaN(parsed.getTime()) ? new Date(0) : parsed;
}

// Default gap between cards (1.5rem = 24px)
const CARD_GAP = 24;

function ExperienceCarousel({
    experiences,
    onCardClick,
    selectedExperience: _selectedExperience,
}: ExperienceCarouselProps) {
    // Sort experiences by end date, putting the most recent one first
    const sortedExperiences = [...experiences].sort((a, b) => {
        const dateA = parseEndDate(a.endDate);
        const dateB = parseEndDate(b.endDate);
        return dateB.getTime() - dateA.getTime(); // Sort descending, most recent first
    });

    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardWidth, setCardWidth] = useState(420); // Default card width
    const [dragOffset, setDragOffset] = useState(0); // Touch drag offset for visual feedback
    const firstCardRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);
    const gestureLockRef = useRef<"h" | "v" | null>(null);
    const lastDeltaXRef = useRef(0);
    const justSwipedRef = useRef(false);

    // Touch drag: only lock to horizontal after threshold so vertical page scroll is unaffected
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length !== 1) return;
            touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            gestureLockRef.current = null;
            lastDeltaXRef.current = 0;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length !== 1 || !touchStartRef.current) return;
            const deltaX = e.touches[0].clientX - touchStartRef.current.x;
            const deltaY = e.touches[0].clientY - touchStartRef.current.y;

            if (gestureLockRef.current === null) {
                if (Math.abs(deltaX) > SWIPE_LOCK_THRESHOLD || Math.abs(deltaY) > SWIPE_LOCK_THRESHOLD) {
                    gestureLockRef.current = Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
                }
            }

            if (gestureLockRef.current === "h") {
                e.preventDefault();
                lastDeltaXRef.current = deltaX;
                setDragOffset(deltaX);
            }
        };

        const handleTouchEnd = () => {
            if (gestureLockRef.current === "h") {
                const dx = lastDeltaXRef.current;
                if (dx < -SWIPE_CHANGE_THRESHOLD) {
                    setCurrentIndex((i) => Math.min(i + 1, sortedExperiences.length - 1));
                    justSwipedRef.current = true;
                    setTimeout(() => {
                        justSwipedRef.current = false;
                    }, 300);
                } else if (dx > SWIPE_CHANGE_THRESHOLD) {
                    setCurrentIndex((i) => Math.max(0, i - 1));
                    justSwipedRef.current = true;
                    setTimeout(() => {
                        justSwipedRef.current = false;
                    }, 300);
                }
            }
            setDragOffset(0);
            touchStartRef.current = null;
            gestureLockRef.current = null;
        };

        const handleClickCapture = (e: MouseEvent) => {
            if (justSwipedRef.current) {
                e.preventDefault();
                e.stopPropagation();
                justSwipedRef.current = false;
            }
        };

        el.addEventListener("touchstart", handleTouchStart, { passive: true });
        el.addEventListener("touchmove", handleTouchMove, { passive: false });
        el.addEventListener("touchend", handleTouchEnd, { passive: true });
        el.addEventListener("touchcancel", handleTouchEnd, { passive: true });
        el.addEventListener("click", handleClickCapture, true);
        return () => {
            el.removeEventListener("touchstart", handleTouchStart);
            el.removeEventListener("touchmove", handleTouchMove);
            el.removeEventListener("touchend", handleTouchEnd);
            el.removeEventListener("touchcancel", handleTouchEnd);
            el.removeEventListener("click", handleClickCapture, true);
        };
    }, [sortedExperiences.length]);

    // Measure actual card width on mount, resize, and when the card size changes (e.g. media query).
    // Use offsetWidth (not getBoundingClientRect) so scale(1.02) on the active card doesn't inflate the step and cause drift.
    const measureCardWidth = useCallback(() => {
        if (firstCardRef.current) {
            const width = firstCardRef.current.offsetWidth;
            setCardWidth(width);
        }
    }, []);

    useEffect(() => {
        measureCardWidth();
        window.addEventListener("resize", measureCardWidth);
        return () => window.removeEventListener("resize", measureCardWidth);
    }, [measureCardWidth]);

    // Keep cardWidth in sync when the first card's size changes (e.g. after layout or media query)
    useEffect(() => {
        const el = firstCardRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => measureCardWidth());
        ro.observe(el);
        return () => ro.disconnect();
    }, [measureCardWidth]);

    // When index changes, update selected experience in parent
    useEffect(() => {
        if (sortedExperiences.length > 0) {
            onCardClick(sortedExperiences[currentIndex]);
        }
    }, [currentIndex, sortedExperiences.length]);

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex > 0) {
                return prevIndex - 1;
            }
            return prevIndex;
        });
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex < sortedExperiences.length - 1) {
                return prevIndex + 1;
            }
            return prevIndex;
        });
    };

    if (sortedExperiences.length === 0) {
        return null;
    }

    const hasPrevious = currentIndex > 0;
    const hasNext = currentIndex < sortedExperiences.length - 1;

    // Calculate transform to shift the carousel
    // The CSS padding centers the first card, transform shifts to show current card
    const translateX = -(currentIndex * (cardWidth + CARD_GAP));
    const isDragging = dragOffset !== 0;

    return (
        <div className="experienceCarouselContainer">
            <div className="experienceCarouselWrapper">
                <CarouselNavButton
                    direction="left"
                    onClick={handlePrevious}
                    hidden={!hasPrevious}
                    className="experienceCarouselArrowLeft"
                />

                {/* Carousel viewport */}
                <div className="experienceCarouselViewport">
                    <div
                        ref={scrollRef}
                        className={`experienceCarouselScroll${isDragging ? " experienceCarouselScrollDragging" : ""}`}
                        style={{
                            transform: `translateX(${translateX + dragOffset}px)`,
                        }}
                    >
                        {sortedExperiences.map((experience, index) => (
                            <div
                                key={`${experience.companyName}-${experience.role}-${index}`}
                                ref={index === 0 ? firstCardRef : null}
                                className={`experienceCarouselItem ${
                                    index === currentIndex
                                        ? "experienceCarouselItemActive"
                                        : ""
                                }`}
                                onClick={() => setCurrentIndex(index)}
                            >
                                <ExperienceCard
                                    companyName={experience.companyName}
                                    role={experience.role}
                                    startDate={experience.startDate}
                                    endDate={experience.endDate}
                                    logo={experience.logo}
                                    onClick={() => setCurrentIndex(index)}
                                    isSelected={index === currentIndex}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <CarouselNavButton
                    direction="right"
                    onClick={handleNext}
                    hidden={!hasNext}
                    className="experienceCarouselArrowRight"
                />
            </div>
        </div>
    );
}

export default ExperienceCarousel;
