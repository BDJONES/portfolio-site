import { useState } from "react";
import { motion } from "framer-motion";
import "./styling/WorkExperience.css";
import { JobProps } from "./Job";
import { ExperienceCardProps } from "./ExperienceCard";
import ExperienceCarousel from "./ExperienceCarousel";
import JobCarousel from "./JobCarousel";
import {
    SiPython,
    SiFastapi,
    SiLangchain,
    SiCsharp,
    SiDotnet,
    SiPowerbi,
    SiPostgresql,
    SiSwift,
    SiReact,
    SiTypescript,
    SiFigma,
    SiAzuredevops,
    SiJira,
} from "react-icons/si";

// Helper function to parse date strings in "MMM YYYY" format (e.g., "Feb 2025") or "Present"
function parseDate(dateString: string): Date {
    if (dateString.toLowerCase() === "present") {
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

    const parts = dateString.trim().toLowerCase().split(" ");
    if (parts.length >= 2) {
        const month = monthAbbreviations.indexOf(parts[0]);
        const year = parseInt(parts[1]);
        if (month !== -1 && !isNaN(year)) {
            return new Date(year, month, 1);
        }
    }

    // Fallback: try to parse as a standard date
    const parsed = new Date(dateString);
    return isNaN(parsed.getTime()) ? new Date(0) : parsed;
}

// Helper function to check if two date ranges overlap
function dateRangesOverlap(
    start1: string,
    end1: string,
    start2: string,
    end2: string
): boolean {
    const start1Date = parseDate(start1);
    const end1Date = parseDate(end1);
    const start2Date = parseDate(start2);
    const end2Date = parseDate(end2);

    // Check if ranges overlap: start1 <= end2 && start2 <= end1
    return (
        start1Date.getTime() <= end2Date.getTime() &&
        start2Date.getTime() <= end1Date.getTime()
    );
}

function WorkExperience() {
    // Placeholder data - replace with real data later
    const experiences: ExperienceCardProps[] = [
        {
            companyName: "United Airlines",
            logo: "../../public/images/united-airlines-logo.png",
            role: "ECDLP Associate",
            startDate: "Aug 2024",
            endDate: "Present",
        },
        {
            companyName: "United Airlines",
            logo: "../../public/images/united-airlines-logo.png",
            role: "Digital Technology Intern",
            startDate: "May 2023",
            endDate: "Aug 2023",
        },
        {
            companyName: "Center for Advanced Public Safety",
            logo: "../../public/images/caps-logo.jpeg",
            role: "Student Developer",
            startDate: "May 2022",
            endDate: "May 2023",
        },
    ];
    const [selectedExperience, setSelectedExperience] =
        useState<ExperienceCardProps | null>(experiences[0]);
    const jobs: JobProps[] = [
        {
            companyName: "United Airlines",
            role: "Business Analyst",
            startDate: "February 2026",
            endDate: "Present",
            description:
                "Worked as a Business Analyst on the United Airline Digital Products team. Helped organize development of new features related to customer seating for United Digital Channels.",
            logo: "../../public/images/united-airlines-logo.png",
            skills: [
                { name: "Jira", icon: <SiJira />, color: "text-blue-400" },
                { name: "Azure DevOps", icon: <SiAzuredevops />, color: "text-violet-400" },
                { name: "Figma", icon: <SiFigma />, color: "text-white" },
            ],
        },
        {
            companyName: "United Airlines",
            role: "Generative AI Researcher",
            startDate: "August 2025",
            endDate: "January 2026",
            description:
                "Worked as a Generative AI Researcher to research and implement Generative AI solutions for United Airlines including RAG, MCP, and Agentic AI solutions.",
            logo: "../../public/images/united-airlines-logo.png",
            skills: [
                { name: "Python", icon: <SiPython />, color: "text-yellow-400" },
                { name: "FastAPI", icon: <SiFastapi />, color: "text-teal-400" },
                { name: "LangChain", icon: <SiLangchain />, color: "text-white" },
            ],
        },
        {
            companyName: "United Airlines",
            role: "Backend Developer",
            startDate: "February 2025",
            endDate: "August 2025",
            description:
                "Worked as a backend developer on the United Airlines Mobile App team. Used C#/.NET to deliver new features to the app for customers to experience while booking flights.",
            logo: "../../public/images/united-airlines-logo.png",
            skills: [
                { name: "C#", icon: <SiCsharp />, color: "text-purple-400" },
                { name: ".NET", icon: <SiDotnet />, color: "text-blue-500" },
            ],
        },
        {
            companyName: "United Airlines",
            role: "Data Analyst - Crew Data",
            startDate: "August 2024",
            endDate: "January 2025",
            description:
                "Worked as a data analyst on the United Airlines Air Ops team. Created data driven solutions including dashboards for business partners including crew schedulers.",
            logo: "../../public/images/united-airlines-logo.png",
            skills: [
                { name: "Power BI", icon: <SiPowerbi />, color: "text-yellow-500" },
                { name: "PostgreSQL", icon: <SiPostgresql />, color: "text-blue-400" },
            ],
        },
        {
            companyName: "United Airlines",
            role: "Digital Technology Intern",
            startDate: "May 2023",
            endDate: "August 2023",
            description:
                "Worked as an iOS developer on the United Airlines Mobile App team to develop new features for cutomers outside of the app, as well as a researcher into AI solutions for baggage tracking.",
            logo: "../../public/images/united-airlines-logo.png",
            skills: [
                { name: "SwiftUI", icon: <SiSwift />, color: "text-orange-500" },
            ],
        },
        {
            companyName: "Center for Advanced Public Safety",
            role: "Student Developer",
            startDate: "May 2022",
            endDate: "May 2023",
            description:
                "Worked as a Frontend Developer at the Center for Advanced Public Safety to prototype new applications such as geolocation mapping for public schools in Alabama.",
            skills: [
                { name: "React", icon: <SiReact />, color: "text-cyan-400" },
                { name: "TypeScript", icon: <SiTypescript />, color: "text-blue-500" },
                { name: "SwiftUI", icon: <SiSwift />, color: "text-orange-500" },
            ],
        },
    ];

    // Filter jobs by selected experience (company name AND date range overlap)
    const filteredJobs = selectedExperience
        ? jobs.filter(
              (job) =>
                  job.companyName === selectedExperience.companyName &&
                  dateRangesOverlap(
                      job.startDate,
                      job.endDate,
                      selectedExperience.startDate,
                      selectedExperience.endDate
                  )
          )
        : [];

    const handleExperienceCardClick = (experience: ExperienceCardProps) => {
        // If the same experience is already selected, do nothing (prevent deselection)
        const isSameExperience =
            selectedExperience &&
            selectedExperience.companyName === experience.companyName &&
            selectedExperience.role === experience.role &&
            selectedExperience.startDate === experience.startDate &&
            selectedExperience.endDate === experience.endDate;

        // Only update if it's a different experience
        if (!isSameExperience) {
            setSelectedExperience(experience);
        }
    };

    return (
        <div className="workExperienceScreen" id="workExperience">
            <div className="workExperience">
                <motion.h2
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.4 }}
                    className="text-4xl font-semibold mb-10 text-slate-100"
                >
                    Work Experience
                </motion.h2>
                <div className="workExperienceInnerContainer">
                    <div className="workExperienceContainer">
                        {selectedExperience && filteredJobs.length > 0 && (
                            <div className="workExperienceJobCarouselSection">
                                <JobCarousel jobs={filteredJobs} />
                            </div>
                        )}
                        <div className="workExperienceCarouselSection">
                            <ExperienceCarousel
                                experiences={experiences}
                                onCardClick={handleExperienceCardClick}
                                selectedExperience={selectedExperience}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorkExperience;
