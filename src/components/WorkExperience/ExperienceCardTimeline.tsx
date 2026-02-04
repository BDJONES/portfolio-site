import { ExperienceCard, ExperienceCardProps } from "./ExperienceCard";
import "./styling/ExperienceCardTimeline.css";

interface ExperienceCardTimelineProps {
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

function ExperienceCardTimeline({
    experiences,
    onCardClick,
    selectedExperience,
}: ExperienceCardTimelineProps) {
    // Sort experiences by end date, putting the most recent one last
    const sortedExperiences = [...experiences].sort((a, b) => {
        const dateA = parseEndDate(a.endDate);
        const dateB = parseEndDate(b.endDate);
        return dateB.getTime() - dateA.getTime(); // Sort ascending, most recent will be last
    });

    return (
        <div className="experienceCardTimeline">
            {/* Single continuous vertical line that spans all items */}
            <div className="experienceCardTimelineLine"></div>

            {/* Timeline items container */}
            <div className="experienceCardTimelineItems">
                {sortedExperiences.map((experience, index) => (
                    <div
                        key={`${experience.companyName}-${experience.role}-${index}`}
                        className="experienceCardTimelineItem"
                    >
                        {/* Circular node positioned on the line */}
                        <div className="experienceCardTimelineNode"></div>

                        {/* JobCard positioned to the right of the line */}
                        <div className="experienceCardTimelineContent">
                            <ExperienceCard
                                companyName={experience.companyName}
                                role={experience.role}
                                startDate={experience.startDate}
                                endDate={experience.endDate}
                                logo={experience.logo}
                                onClick={() => onCardClick(experience)}
                                isSelected={
                                    selectedExperience !== null &&
                                    selectedExperience.companyName ===
                                        experience.companyName &&
                                    selectedExperience.role ===
                                        experience.role &&
                                    selectedExperience.startDate ===
                                        experience.startDate &&
                                    selectedExperience.endDate ===
                                        experience.endDate
                                }
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExperienceCardTimeline;
