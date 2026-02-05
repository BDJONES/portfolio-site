import { useState, useEffect } from "react";
import { Backdrop } from "@mui/material";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ContactForm from "./ContactForm";

function ContactButton() {
    const [formOpen, setFormOpen] = useState(false);
    const [formKey, setFormKey] = useState(0);
    const [showTooltip, setShowTooltip] = useState(false);
    const [isShaking, setIsShaking] = useState(false);

    // Trigger shake animation after 60 seconds on page
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsShaking(true);
            // Reset after animation duration
            setTimeout(() => setIsShaking(false), 1000);
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
            <div
                className="flex flex-row items-center"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <button
                    onClick={handleOpen}
                    className={`text-violet-400 hover:text-slate-100 transition-all duration-200 ease-linear hover:cursor-pointer ${isShaking ? 'shake-animation' : ''}`}
                >
                    <ContactMailIcon fontSize="large" />
                </button>
                {(showTooltip || isShaking) && (
                    <span className="sidebarButtonDescription">Contact Me</span>
                )}
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

export default ContactButton;
