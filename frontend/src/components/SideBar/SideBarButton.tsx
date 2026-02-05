import { IconProps } from "@mui/material";
import { ReactElement } from "react";
import { useState } from "react";
type ButtonProps = {
    icon: ReactElement<IconProps>;
    description: string;
    href?: string;
};

function SideBarButton({ icon, description, href }: ButtonProps) {
    const [showDescription, setShowDescription] = useState(false);
    
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (href?.startsWith('#')) {
            e.preventDefault();
            const targetId = href.slice(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                // Update URL without triggering navigation
                window.history.pushState(null, '', href);
            }
        }
    };
    
    const content = (
        <div
            className="flex flex-row items-center"
            onMouseEnter={() => setShowDescription(true)}
            onMouseLeave={() => setShowDescription(false)}
        >
            <div className="sidebarButton">{icon}</div>
            {showDescription ? (
                <span className="sidebarButtonDescription">{description}</span>
            ) : null}
        </div>
    );

    if (href) {
        return (
            <a href={href} onClick={handleClick} style={{ textDecoration: 'none', color: 'inherit' }}>
                {content}
            </a>
        );
    }

    return content;
}

export default SideBarButton;
