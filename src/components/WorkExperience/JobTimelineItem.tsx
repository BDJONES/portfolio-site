import { ExperienceCard } from "./ExperienceCard";

interface JobCardProps {
    companyName: string;
    role: string;
    startDate: string;
    endDate: string;
    logo?: string;
}

interface JobTimelineItemProps {
    jobCard: JobCardProps;
    isLast: boolean;
}

function JobTimelineItem({ jobCard, isLast }: JobTimelineItemProps) {
    return (
        <div className="flex flex-row relative items-center pb-8">
            {/* Left side - Timeline node and line */}
            <div
                className="flex items-center mr-4 relative"
                style={{ alignSelf: "stretch", justifyContent: "center" }}
            >
                {/* Circular node - centered vertically */}
                <div className="w-4 h-4 rounded-full bg-violet-400 border-2 border-slate-100 z-10 relative"></div>
                {/* Connecting line - extends from bottom of node through padding to next node */}
                {!isLast && (
                    <div
                        className="w-0.5 bg-slate-400 absolute left-1/2 transform -translate-x-1/2"
                        style={{
                            top: "calc(50% + 0.5rem)",
                            bottom: "0",
                        }}
                    ></div>
                )}
            </div>
            {/* Right side - Content - centered on node */}
            <div className="flex-1">
                {
                    // Placeholder for Job Info
                }
            </div>
        </div>
    );
}

export default JobTimelineItem;
