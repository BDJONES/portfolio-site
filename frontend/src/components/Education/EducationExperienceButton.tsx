import { Box } from "@mui/material";
import "./styling/Education.css";
import { useRef } from "react";

interface ButtonProps {
    educationTitle: string;
    isSelected: boolean;
    onShow: any;
}

function EducationExperienceButton({
    educationTitle,
    isSelected,
    onShow,
}: ButtonProps) {
    // const [selected, setSelected] = useState(false);
    const myRef = useRef(null);

    // const updateButtonStyle = () => {
    //     // document.querySelector('.EducationButtonSelected')?.classList.remove('EducationButtonSelected');
    //     let element = myRef.current;
    //     if (element && isSelected) {
    //         element.classList.add("EducationButtonSelected");
    //         console.log(element);
    //     }
    //     if (element && !isSelected) {
    //         element.classList.remove("EducationButtonSelected");
    //         console.log(element);
    //     }
    // };

    // useEffect(() => {
    //     console.log("In the use effect");
    //     updateButtonStyle();
    // }, [selected]);

    return (
        <button
            onClick={onShow}
            className={
                isSelected ? "EducationButtonSelected" : "EducationButton"
            }
        >
            <Box
                ref={myRef}
                // sx={{ backgroundColor: "rgba(254,240,229,255)" }}
            >
                {/* <img
                    src="images/Degree Photo.png"
                    style={{ height: "20px", width: "20px", color: "white" }}
                ></img> */}
                <p className="">{educationTitle}</p>
            </Box>
        </button>
    );
}

export default EducationExperienceButton;
