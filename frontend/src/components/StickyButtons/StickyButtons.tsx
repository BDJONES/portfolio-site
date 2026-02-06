// import { useState, useEffect } from "react";  // Restore when adding Contact form back
import { useState } from "react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { Backdrop } from "@mui/material";
// import ContactForm from "../SideBar/ContactForm";
import "./styling/StickyButtons.css";

const EMAIL_ADDRESS = "brandondjonescareer@gmail.com"; // Replace with your email

function StickyButtons() {
    const githubUrl = "https://github.com/BDJONES";
    const linkedinUrl = "https://www.linkedin.com/in/brandon--jones/";
    const resumeUrl = "/Brandon_s_Resume.pdf";

    // const [formOpen, setFormOpen] = useState(false);
    // const [formKey, setFormKey] = useState(0);
    // const [isShaking, setIsShaking] = useState(false);

    const [emailPopupOpen, setEmailPopupOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL_ADDRESS);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // fallback for older browsers
            const input = document.createElement("input");
            input.value = EMAIL_ADDRESS;
            document.body.appendChild(input);
            input.select();
            document.execCommand("copy");
            document.body.removeChild(input);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // Trigger shake animation after 60 seconds on page
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setIsShaking(true);
    //         // Reset after animation duration
    //         setTimeout(() => setIsShaking(false), 1500);
    //     }, 60000); // 60 seconds

    //     return () => clearTimeout(timer);
    // }, []);

    // const handleOpen = () => {
    //     setFormKey((prev) => prev + 1); // Force remount with fresh state
    //     setFormOpen(true);
    // };

    // const handleClose = () => {
    //     setFormOpen(false);
    // };

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
                <button
                    type="button"
                    onClick={() => setEmailPopupOpen(true)}
                    className="stickyButton stickyButtonResume"
                    aria-label="Show email"
                >
                    Contact Me
                </button>
                <a
                    href={resumeUrl}
                    download="Brandon_Jones_Resume.pdf"
                    className="stickyButton stickyButtonResume"
                    aria-label="Download Resume"
                >
                    Get Resume
                </a>
                {/* <button
                    onClick={handleOpen}
                    className={`stickyButton stickyButtonContact ${isShaking ? 'shake-animation' : ''}`}
                    aria-label="Contact Me"
                >
                    Contact Me
                </button> */}
            </div>
            <Backdrop
                sx={(theme) => ({
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    zIndex: theme.zIndex.drawer + 1,
                })}
                open={emailPopupOpen}
                onClick={() => setEmailPopupOpen(false)}
            >
                <div
                    className="max-w-sm w-[90vw] rounded-2xl border border-slate-700 bg-slate-800 text-slate-100 p-8 shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="mb-4 text-slate-100 text-xl font-bold">
                        Contact Me
                    </h2>
                    <p className="mb-4 break-all text-slate-200 font-medium">
                        Email: {EMAIL_ADDRESS}
                    </p>
                    <div className="flex flex-row gap-3 justify-end">
                        <button
                            type="button"
                            onClick={() => setEmailPopupOpen(false)}
                            className="emailPopupButton"
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            onClick={handleCopyEmail}
                            className="emailPopupButton"
                        >
                            {copied ? "Copied!" : "Copy"}
                        </button>
                    </div>
                </div>
            </Backdrop>
            {/* <Backdrop
                sx={(theme) => ({
                    color: "#fff",
                    zIndex: theme.zIndex.drawer + 1,
                })}
                open={formOpen}
            >
                {formOpen && (
                    <ContactForm backdropClose={handleClose} key={formKey} />
                )}
            </Backdrop> */}
        </>
    );
}

export default StickyButtons;
