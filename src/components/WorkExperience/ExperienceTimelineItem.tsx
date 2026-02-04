import type { JobProps } from "./Job";
import { Job } from "./Job";

interface ExperienceTimelineItemProps {
    companyName: string;
    logo: string;
    jobs: JobProps[];
    isLast: boolean;
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

function ExperienceTimelineItem({
    companyName,
    logo,
    jobs,
    isLast,
}: ExperienceTimelineItemProps) {
    // Sort jobs by end date, putting the most recent one last
    const sortedJobs = [...jobs].sort((a, b) => {
        const dateA = parseEndDate(a.endDate);
        const dateB = parseEndDate(b.endDate);
        return dateA.getTime() - dateB.getTime(); // Sort ascending, most recent will be last
    });

    return (
        <div className="flex flex-row relative items-start">
            {/* Left side - Timeline node and line */}
            <div className="flex flex-col items-center mr-4 relative">
                {/* Circular node */}
                <div className="w-4 h-4 rounded-full bg-violet-400 border-2 border-slate-100 z-10"></div>
                {/* Connecting line */}
                {!isLast && (
                    <div className="w-0.5 h-full bg-slate-400 min-h-[100px] absolute top-4"></div>
                )}
            </div>
            {/* Right side - Content - centered on node */}
            <div className="flex-1 pb-8 -mt-2">
                <div className="text-slate-100">
                    {/* Company Logo/Name */}
                    <div className="mb-4">
                        <img
                            src={logo}
                            alt={companyName}
                            className="h-12 w-auto mb-2"
                        />
                        <h2 className="text-2xl font-bold">{companyName}</h2>
                    </div>
                    {/* Jobs list */}
                    <div className="space-y-4">
                        {sortedJobs.map((job, index) => (
                            <Job
                                key={`${job.companyName}-${job.role}-${index}`}
                                companyName={job.companyName}
                                role={job.role}
                                startDate={job.startDate}
                                endDate={job.endDate}
                                description={job.description}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExperienceTimelineItem;
