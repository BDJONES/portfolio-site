import { useState, useEffect } from "react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { Backdrop } from "@mui/material";
import ContactForm from "../SideBar/ContactForm";
import "./styling/StickyButtons.css";

function StickyButtons() {
    const githubUrl = "https://github.com/BDJONES";
    const linkedinUrl = "https://www.linkedin.com/in/brandon--jones/";
    const resumeUrl = "/Brandon_s_Resume.pdf";

    const [formOpen, setFormOpen] = useState(false);
    const [formKey, setFormKey] = useState(0);
    const [isShaking, setIsShaking] = useState(false);

    // Trigger shake animation after 60 seconds on page
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsShaking(true);
            // Reset after animation duration
            setTimeout(() => setIsShaking(false), 1500);
        }, 60000); // 60 seconds

        return () => clearTimeout(timer);
    }, []);

    const handleOpen = () => {
        setFormKey((prev) => prev + 1); // Force remount with fresh state
        setFormOpen(true);
    };

    const handleClose = () => {
        setFormOpen(false);
    };

    return (
        <>
            <div className="stickyButtonsContainer">
                <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="stickyButton stickyButtonGithub"
                    aria-label="GitHub Profile"
                >
                    <SiGithub />
                </a>
                <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="stickyButton stickyButtonLinkedin"
                    aria-label="LinkedIn Profile"
                >
                    <SiLinkedin />
                </a>
                <a
                    href={resumeUrl}
                    download="Brandon_Jones_Resume.pdf"
                    className="stickyButton stickyButtonResume"
                    aria-label="Download Resume"
                >
                    Get Resume
                </a>
                <button
                    onClick={handleOpen}
                    className={`stickyButton stickyButtonContact ${isShaking ? 'shake-animation' : ''}`}
                    aria-label="Contact Me"
                >
                    Contact Me
                </button>
            </div>
            <Backdrop
                sx={(theme) => ({
                    color: "#fff",
                    zIndex: theme.zIndex.drawer + 1,
                })}
                open={formOpen}
            >
                {formOpen && (
                    <ContactForm backdropClose={handleClose} key={formKey} />
                )}
            </Backdrop>
        </>
    );
}

export default StickyButtons;
