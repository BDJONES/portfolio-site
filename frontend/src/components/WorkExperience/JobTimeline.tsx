import { JobProps } from "./Job";
import {
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import CodeIcon from "@mui/icons-material/Code";
import "./styling/JobTimeline.css";

interface JobTimelineProps {
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

// Helper function to parse description into bullet points
function parseDescription(description: string): string[] {
    // Split by newlines and filter out empty lines
    return description
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
}

// Helper function to determine icon based on role
function getRoleIcon(role: string) {
    const roleLower = role.toLowerCase();
    if (
        roleLower.includes("analyst") ||
        roleLower.includes("data") ||
        roleLower.includes("analytics")
    ) {
        return <AnalyticsIcon className="jobTimelineIcon" />;
    }
    // Default to Code icon for software/developer roles
    return <CodeIcon className="jobTimelineIcon" />;
}

function JobTimeline({ jobs }: JobTimelineProps) {
    // Sort jobs by end date, putting the most recent one last
    const sortedJobs = [...jobs].sort((a, b) => {
        const dateA = parseEndDate(a.endDate);
        const dateB = parseEndDate(b.endDate);
        return dateB.getTime() - dateA.getTime(); // Sort descending, most recent will be last
    });

    return (
        <Paper className="jobTimelineContainer" elevation={3}>
            <List className="jobTimelineList" dense>
                {sortedJobs.map((job, index) => {
                    const dateRange = `${job.startDate} - ${job.endDate}`;
                    const descriptionLines = parseDescription(job.description);

                    return (
                        <ListItem
                            key={`${job.companyName}-${job.role}-${index}`}
                            className="jobTimelineListItem"
                            alignItems="flex-start"
                        >
                            <ListItemIcon className="jobTimelineIconContainer">
                                {getRoleIcon(job.role)}
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <div className="jobTimelineHeader">
                                        <Typography
                                            variant="h6"
                                            className="jobTimelineRoleName"
                                        >
                                            {job.role}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            className="jobTimelineDateRange"
                                        >
                                            {dateRange}
                                        </Typography>
                                    </div>
                                }
                                secondary={
                                    <div className="jobTimelineDescription">
                                        <List
                                            dense
                                            className="jobTimelineDescriptionList"
                                        >
                                            {descriptionLines.map(
                                                (line, lineIndex) => (
                                                    <ListItem
                                                        key={lineIndex}
                                                        className="jobTimelineDescriptionItem"
                                                        disableGutters
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                <Typography
                                                                    variant="body2"
                                                                    className="jobTimelineDescriptionText"
                                                                >
                                                                    {line}
                                                                </Typography>
                                                            }
                                                        />
                                                    </ListItem>
                                                )
                                            )}
                                        </List>
                                    </div>
                                }
                            />
                        </ListItem>
                    );
                })}
            </List>
        </Paper>
    );
}

export default JobTimeline;
