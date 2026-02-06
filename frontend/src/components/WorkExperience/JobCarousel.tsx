import { useState, useEffect } from "react";
import { JobProps, SkillItem } from "./Job";
import "./styling/JobCarousel.css";
import { motion } from "framer-motion";
import { CarouselNavButton } from "../common/CarouselNavButton";

// Only show tooltip when device supports hover (not on touch/mobile)
const supportsHover = () =>
    typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

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
    const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");

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
    }, [currentIndex, safeCurrentIndex]);

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
                    <motion.div
                        key={`${currentJob.companyName}-${currentJob.role}-${currentIndex}`}
                        initial={{ opacity: 0, x: slideDirection === "right" ? 50 : -50 }}
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
                            <span className="jobCardDate">
                                {dateRange}
                            </span>
                        </header>

                        {/* Description */}
                        <section className="jobCardDescriptionSection">
                            <p className="jobCardDescription">
                                {currentJob.description}
                            </p>
                        </section>

                        {/* Tech Stack */}
                        {currentJob.skills && currentJob.skills.length > 0 && (
                            <footer className="jobCardFooter">
                                <p className="jobCardTechTitle">
                                    Technologies Used
                                </p>
                                <div className="jobCardTechList">
                                    {currentJob.skills.map((skill, skillIndex) => (
                                        <SkillIcon key={skillIndex} skill={skill} />
                                    ))}
                                </div>
                            </footer>
                        )}
                    </motion.div>
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
