import { Computer } from "@mui/icons-material";
import EducationExperienceButton from "./EducationExperienceButton";
import EducationExperienceDetails from "./EducationExperienceDetails";
import "./styling/Education.css";
import { useState } from "react";
import { Backdrop } from "@mui/material";
import EducationCard from "./EducationCard";

function Education() {
    const [activeEducationButton, setActiveEducationButton] = useState(1);
    const [detailsOpen, setDetailsOpen] = useState(false);

    const handleClose = () => {
        setDetailsOpen(false);
    };
    return (
        <div className="EducationScreen" id="education">
            <div className="Education min-h-screen w-full py-8 md:py-0">
                <div className="flex flex-col md:mr-8">
                    <EducationExperienceButton
                        educationTitle="Bachelor's Degree"
                        isSelected={activeEducationButton === 1}
                        onShow={() => setActiveEducationButton(1)}
                    />
                    <EducationExperienceButton
                        educationTitle="High School Diploma"
                        isSelected={activeEducationButton === 0}
                        onShow={() => setActiveEducationButton(0)}
                    />
                </div>
                {activeEducationButton === 1 && (
                    <EducationExperienceDetails
                        schoolName="The University of Alabama"
                        degreeTitle="Bachelor's of Science Computer Science"
                        degreeImage={<Computer />}
                        honors="Honors: Honor's College, Cum Laude"
                        onBackdropButtonPressed={() => setDetailsOpen(true)}
                    />
                )}
                {activeEducationButton === 0 && (
                    <EducationExperienceDetails
                        schoolName="Sequoyah High School"
                        degreeTitle="High School Diploma"
                        degreeImage={<Computer />}
                        honors="Honors: Top 15% in Class, District All-State Trombone Player"
                        onBackdropButtonPressed={() => setDetailsOpen(true)}
                    />
                )}
                <Backdrop
                    sx={(theme) => ({
                        color: "#fff",
                        zIndex: theme.zIndex.drawer + 1,
                    })}
                    open={detailsOpen}
                >
                    <EducationCard backdropClose={handleClose} />
                </Backdrop>
            </div>
        </div>
    );
}

export default Education;
