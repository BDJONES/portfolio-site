import { useState, useEffect, useRef, useCallback } from "react";
import { ExperienceCard, ExperienceCardProps } from "./ExperienceCard";
import "./styling/ExperienceCarousel.css";
import { CarouselNavButton } from "../common/CarouselNavButton";

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
    const firstCardRef = useRef<HTMLDivElement>(null);

    // Measure actual card width on mount and resize
    const measureCardWidth = useCallback(() => {
        if (firstCardRef.current) {
            const width = firstCardRef.current.getBoundingClientRect().width;
            setCardWidth(width);
        }
    }, []);

    useEffect(() => {
        measureCardWidth();
        window.addEventListener("resize", measureCardWidth);
        return () => window.removeEventListener("resize", measureCardWidth);
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
                        className="experienceCarouselScroll"
                        style={{
                            transform: `translateX(${translateX}px)`,
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
