import { JobProps } from "./Job";
import "./styling/ExperienceCard.css";

export interface ExperienceCardProps {
    companyName: string;
    role: string;
    startDate: string;
    endDate: string;
    logo: string;
    roles?: JobProps[];
    onClick?: () => void;
    isSelected?: boolean;
}

export function ExperienceCard({
    companyName,
    role,
    startDate,
    endDate,
    logo,
    roles: _roles,
    onClick,
    isSelected = false,
}: ExperienceCardProps) {
    // Format date range
    const dateRange = `${startDate} - ${endDate}`;

    return (
        <div
            className={`experienceCard ${
                isSelected ? "experienceCardSelected" : ""
            }`}
            onClick={onClick}
            style={{ cursor: onClick ? "pointer" : "default" }}
        >
            {/* Top section: Logo and Company Name */}
            <div className="experienceCardTopSection">
                {/* Logo */}
                {logo && (
                    <div className="experienceCardLogoContainer">
                        <img
                            src={logo}
                            alt={companyName}
                            className="experienceCardLogo"
                        />
                    </div>
                )}
                {/* Company Name and Dates */}
                <div className="experienceCardInfo">
                    <h2 className="experienceCardCompanyName">{companyName}</h2>
                    <p className="experienceCardDateRange">{dateRange}</p>
                </div>
            </div>

            {/* Bottom section: Role Name (centered) */}
            <div className="experienceCardRoleSection">
                <h3 className="experienceCardRole">{role}</h3>
            </div>
        </div>
    );
}
