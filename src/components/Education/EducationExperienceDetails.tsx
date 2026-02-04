import { Box } from "@mui/material";

interface EducationDetailsProps {
    schoolName: string;
    degreeTitle: string;
    degreeImage: any;
    honors: string;
}

interface BackdropProps {
    onBackdropButtonPressed: any;
}

type CombinedProps = EducationDetailsProps & BackdropProps;

function EducationExperienceDetails({
    schoolName,
    degreeTitle,
    degreeImage,
    honors,
    onBackdropButtonPressed,
}: CombinedProps) {
    return (
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl px-2 sm:px-4">
            <Box className="flex flex-col drop-shadow-lg justify-around p-3 sm:p-4 md:p-6 lg:p-8 xl:p-14 border-2 border-slate-600 text-slate-100 m-1 sm:m-2 md:m-4 lg:m-6 xl:m-10">
                <img
                    className="h-32 sm:h-40 md:h-48 lg:h-64 xl:h-80 w-auto max-w-full m-1 sm:m-2 md:m-3 lg:m-4 self-center object-contain"
                    src="./images/Capstone A.png"
                    alt="Education capstone"
                />
                <p className="self-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-center px-1 sm:px-2 md:px-3 break-words">
                    {degreeTitle}
                </p>
                <button
                    onClick={onBackdropButtonPressed}
                    className="MoreDetailsButton self-center mt-2 sm:mt-3 md:mt-4"
                >
                    More Details
                </button>
                {/* <p className="self-center">{honors}</p> */}
            </Box>
        </div>
    );
}

export default EducationExperienceDetails;
