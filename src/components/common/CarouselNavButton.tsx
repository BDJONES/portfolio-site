import { IconButton } from "@mui/material";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import "./styling/CarouselNavButton.css";

interface CarouselNavButtonProps {
    direction: "left" | "right";
    onClick: () => void;
    disabled?: boolean;
    hidden?: boolean;
    className?: string;
}

export function CarouselNavButton({
    direction,
    onClick,
    disabled = false,
    hidden = false,
    className = "",
}: CarouselNavButtonProps) {
    const Icon = direction === "left" ? ChevronLeftRounded : ChevronRightRounded;
    const ariaLabel = direction === "left" ? "Previous" : "Next";

    return (
        <IconButton
            className={`carouselNavButton ${hidden ? "carouselNavButtonHidden" : ""} ${className}`}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            disableRipple
        >
            <Icon />
        </IconButton>
    );
}

export default CarouselNavButton;
