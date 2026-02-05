import { Typography } from "@mui/material";

interface EducationCardCloseButtonProps {
    closeCard: any;
}

function EducationCardCloseButton({
    closeCard,
}: EducationCardCloseButtonProps) {
    return (
        <button onClick={closeCard} className="MoreDetailsButton">
            <Typography variant="button">Close</Typography>
        </button>
    );
}

export default EducationCardCloseButton;
