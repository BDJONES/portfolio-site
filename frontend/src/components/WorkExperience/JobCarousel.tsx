import { useState, useEffect, useRef } from "react";
import { JobProps, SkillItem } from "./Job";
import "./styling/JobCarousel.css";
import { motion } from "framer-motion";
import { CarouselNavButton } from "../common/CarouselNavButton";

/** Minimum horizontal movement (px) before we treat the gesture as horizontal (avoids stealing vertical scroll). */
const SWIPE_LOCK_THRESHOLD = 12;
/** Minimum swipe distance (px) to change slide on release. */
const SWIPE_CHANGE_THRESHOLD = 40;

// Only show tooltip when device supports hover (not on touch/mobile)
const supportsHover = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover)").matches;

// Skill icon component with custom tooltip
function SkillIcon({ skill }: { skill: SkillItem }) {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div
            className="jobCardTechItem"
            onMouseEnter={() => supportsHover() && setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <span className={`jobCardTechIcon ${skill.color}`}>
                {skill.icon}
            </span>
            {showTooltip && (
                <span className="jobCarouselSkillTooltip">{skill.name}</span>
            )}
        </div>
    );
}

interface JobCarouselProps {
    jobs: JobProps[];
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

function JobCarousel({ jobs }: JobCarouselProps) {
    // Sort jobs by end date, putting the most recent one last
    const sortedJobs = [...jobs].sort((a, b) => {
        const dateA = parseEndDate(a.endDate);
        const dateB = parseEndDate(b.endDate);
        return dateB.getTime() - dateA.getTime(); // Sort descending, most recent will be last
    });

    const [currentIndex, setCurrentIndex] = useState(0);
    const [slideDirection, setSlideDirection] = useState<"left" | "right">(
        "right",
    );
    const [dragOffset, setDragOffset] = useState(0);
    const swipeRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const pointerStartRef = useRef<{
        x: number;
        y: number;
        pointerId: number;
    } | null>(null);
    const gestureLockRef = useRef<"h" | "v" | null>(null);
    const lastDeltaXRef = useRef(0);
    const justSwipedRef = useRef(false);

    // Clamp currentIndex to valid range - handles case when jobs array shrinks
    const safeCurrentIndex =
        sortedJobs.length > 0
            ? Math.min(currentIndex, sortedJobs.length - 1)
            : 0;

    // Reset currentIndex if it was clamped (sync state for next render)
    useEffect(() => {
        if (currentIndex !== safeCurrentIndex) {
            setCurrentIndex(safeCurrentIndex);
        }
    }, [currentIndex, safeCurrentIndex, sortedJobs.length]);
    
    // Reset index to 0 when jobs array changes (new experience selected)
    useEffect(() => {
        setCurrentIndex(0);
    }, [sortedJobs.length]);

    // Pointer swipe: same behavior as Experience carousel (lock to horizontal after threshold, 40px to change slide)
    // Using Pointer Events (modern, works on mouse/touch/trackpad/Apple Pencil)
    // Only enable dragging when nav buttons are hidden (mobile, <=768px)
    useEffect(() => {
        const wrapperEl = swipeRef.current;
        const cardEl = cardRef.current;
        const el = cardEl || wrapperEl; // Prefer card element, fallback to wrapper
        if (!el) {
            return;
        }

        // Check if nav buttons are visible (they're hidden on screens <=768px)
        const mediaQuery = window.matchMedia("(max-width: 768px)");
        
        // Helper to check if dragging should be enabled
        const shouldEnableDragging = () => mediaQuery.matches;

        const handlePointerDown = (e: PointerEvent) => {
            // Only enable dragging when buttons are hidden
            if (!shouldEnableDragging()) {
                return;
            }
            // Only handle primary pointer (left mouse, first touch, etc.)
            if (e.isPrimary === false) return;
            pointerStartRef.current = {
                x: e.clientX,
                y: e.clientY,
                pointerId: e.pointerId,
            };
            gestureLockRef.current = null;
            lastDeltaXRef.current = 0;
            el!.setPointerCapture(e.pointerId); // Capture all pointer events for this pointer
        };

        const handlePointerMove = (e: PointerEvent) => {
            // Only enable dragging when buttons are hidden
            if (!shouldEnableDragging()) {
                // Reset state if buttons became visible during drag
                if (pointerStartRef.current) {
                    pointerStartRef.current = null;
                    gestureLockRef.current = null;
                    setDragOffset(0);
                }
                return;
            }
            if (
                !pointerStartRef.current ||
                e.pointerId !== pointerStartRef.current.pointerId
            ) {
                return;
            }
            const deltaX = e.clientX - pointerStartRef.current.x;
            const deltaY = e.clientY - pointerStartRef.current.y;

            if (gestureLockRef.current === null) {
                if (
                    Math.abs(deltaX) > SWIPE_LOCK_THRESHOLD ||
                    Math.abs(deltaY) > SWIPE_LOCK_THRESHOLD
                ) {
                    gestureLockRef.current =
                        Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
                }
            }

            if (gestureLockRef.current === "h") {
                e.preventDefault();
                e.stopPropagation(); // Stop scrollable children from handling
                lastDeltaXRef.current = deltaX;
                setDragOffset(deltaX);
            }
        };

        const handlePointerUp = (e: PointerEvent) => {
            // Only enable dragging when buttons are hidden
            if (!shouldEnableDragging()) {
                // Reset state if buttons became visible during drag
                if (pointerStartRef.current) {
                    pointerStartRef.current = null;
                    gestureLockRef.current = null;
                    setDragOffset(0);
                    el!.releasePointerCapture(e.pointerId);
                }
                return;
            }
            if (
                !pointerStartRef.current ||
                e.pointerId !== pointerStartRef.current.pointerId
            ) {
                return;
            }
            const wasH = gestureLockRef.current === "h";
            const dx = lastDeltaXRef.current;
            
            if (wasH) {
                if (dx < -SWIPE_CHANGE_THRESHOLD) {
                    setSlideDirection("right");
                    setCurrentIndex((i) =>
                        Math.min(i + 1, sortedJobs.length - 1)
                    );
                    justSwipedRef.current = true;
                    setTimeout(() => {
                        justSwipedRef.current = false;
                    }, 300);
                } else if (dx > SWIPE_CHANGE_THRESHOLD) {
                    setSlideDirection("left");
                    setCurrentIndex((i) => Math.max(0, i - 1));
                    justSwipedRef.current = true;
                    setTimeout(() => {
                        justSwipedRef.current = false;
                    }, 300);
                }
            }
            setDragOffset(0);
            pointerStartRef.current = null;
            gestureLockRef.current = null;
            el!.releasePointerCapture(e.pointerId);
        };

        const handleClickCapture = (e: MouseEvent) => {
            if (justSwipedRef.current) {
                e.preventDefault();
                e.stopPropagation();
                justSwipedRef.current = false;
            }
        };
        
        // Function to attach/detach handlers based on screen size
        const setupHandlers = () => {
            if (shouldEnableDragging()) {
                // Attach handlers when buttons are hidden (mobile)
                el.addEventListener("pointerdown", handlePointerDown);
                el.addEventListener("pointermove", handlePointerMove);
                el.addEventListener("pointerup", handlePointerUp);
                el.addEventListener("pointercancel", handlePointerUp);
                el.addEventListener("click", handleClickCapture, true);
            }
        };
        
        // Function to remove handlers
        const removeHandlers = () => {
            el.removeEventListener("pointerdown", handlePointerDown);
            el.removeEventListener("pointermove", handlePointerMove);
            el.removeEventListener("pointerup", handlePointerUp);
            el.removeEventListener("pointercancel", handlePointerUp);
            el.removeEventListener("click", handleClickCapture, true);
        };
        
        // Set up handlers initially
        setupHandlers();
        
        // Listen for media query changes (window resize)
        const handleMediaChange = (e: MediaQueryListEvent) => {
            removeHandlers();
            if (e.matches) {
                setupHandlers();
            } else {
                // Reset drag state when switching to desktop
                setDragOffset(0);
                pointerStartRef.current = null;
                gestureLockRef.current = null;
            }
        };
        
        // Modern browsers support addEventListener on MediaQueryList
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", handleMediaChange);
        } else {
            // Fallback for older browsers
            mediaQuery.addListener(handleMediaChange);
        }
        
        return () => {
            removeHandlers();
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener("change", handleMediaChange);
            } else {
                mediaQuery.removeListener(handleMediaChange);
            }
        };

    }, [sortedJobs.length, safeCurrentIndex]); // Re-attach when card changes

    const handlePrevious = () => {
        setSlideDirection("left");
        setCurrentIndex((prevIndex) => {
            const safeIdx = Math.min(prevIndex, sortedJobs.length - 1);
            if (safeIdx > 0) {
                return safeIdx - 1;
            }
            return 0;
        });
    };

    const handleNext = () => {
        setSlideDirection("right");
        setCurrentIndex((prevIndex) => {
            const safeIdx = Math.min(prevIndex, sortedJobs.length - 1);
            if (safeIdx < sortedJobs.length - 1) {
                return safeIdx + 1;
            }
            return safeIdx;
        });
    };

    if (sortedJobs.length === 0) {
        return null;
    }

    const currentJob = sortedJobs[safeCurrentIndex];
    const dateRange = `${currentJob.startDate} - ${currentJob.endDate}`;

    const hasPrevious = safeCurrentIndex > 0;
    const hasNext = safeCurrentIndex < sortedJobs.length - 1;
    const isDragging = dragOffset !== 0;

    return (
        <motion.div
            className="jobCarouselContainer"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.4, delay: 0.1 }}
        >
            <div className="jobCarouselWrapper">
                <div className="jobCarouselArrowSpacer jobCarouselArrowSpacerLeft">
                    <CarouselNavButton
                        direction="left"
                        onClick={handlePrevious}
                        hidden={!hasPrevious}
                        className="jobCarouselArrowLeft"
                    />
                </div>

                {/* Job Card */}
                <div className="jobCarouselCardContainer">
                    <div
                        ref={(el) => {
                            (
                                swipeRef as React.MutableRefObject<HTMLDivElement | null>
                            ).current = el;
                        }}
                        className={`jobCarouselCardDragWrapper${isDragging ? " jobCarouselCardDragWrapperDragging" : ""}`}
                        style={{ transform: `translateX(${dragOffset}px)` }}
                    >
                        <motion.div
                            ref={(el) => {
                                (
                                    cardRef as React.MutableRefObject<HTMLDivElement | null>
                                ).current = el;
                            }}
                            key={`${currentJob.companyName}-${currentJob.role}-${currentIndex}`}
                            initial={{
                                opacity: 0,
                                x: slideDirection === "right" ? 50 : -50,
                            }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="jobCard"
                        >
                            {/* Accent line */}
                            <div className="jobCardAccent" />

                            {/* Header */}
                            <header className="jobCardHeader">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="jobCardTitle">
                                            {currentJob.role}
                                        </h3>
                                        <p className="jobCardCompany">
                                            {currentJob.companyName}
                                        </p>
                                    </div>
                                </div>
                                <span className="jobCardDate">{dateRange}</span>
                            </header>

                            {/* Description */}
                            <section className="jobCardDescriptionSection">
                                <p className="jobCardDescription">
                                    {currentJob.description}
                                </p>
                            </section>

                            {/* Tech Stack */}
                            {currentJob.skills &&
                                currentJob.skills.length > 0 && (
                                    <footer className="jobCardFooter">
                                        <p className="jobCardTechTitle">
                                            Technologies Used
                                        </p>
                                        <div className="jobCardTechList">
                                            {currentJob.skills.map(
                                                (skill, skillIndex) => (
                                                    <SkillIcon
                                                        key={skillIndex}
                                                        skill={skill}
                                                    />
                                                ),
                                            )}
                                        </div>
                                    </footer>
                                )}
                        </motion.div>
                    </div>
                </div>

                <div className="jobCarouselArrowSpacer jobCarouselArrowSpacerRight">
                    <CarouselNavButton
                        direction="right"
                        onClick={handleNext}
                        hidden={!hasNext}
                        className="jobCarouselArrowRight"
                    />
                </div>
            </div>
        </motion.div>
    );
}

export default JobCarousel;
