import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import EducationDetailField from "./EducationDetail";
import EducationCardCloseButton from "./EducationCardCloseButton";

interface EducationCardProps {
    backdropClose: any;
}

function EducationCard({ backdropClose }: EducationCardProps) {
    return (
        <Card sx={{ maxWidth: 1000 }}>
            {/* <CardMedia
                sx={{ height: 300, width: 1000 }}
                image="https://avs.org/AVS/media/Chapters/Alabama/Alabama_banner.jpg?ext=.jpg"
            /> */}
            <div className="relative">
                <CardMedia
                    component="image"
                    image="https://avs.org/AVS/media/Chapters/Alabama/Alabama_banner.jpg?ext=.jpg"
                    sx={{
                        height: 300,
                        width: 1000,
                        // paddingTop: "56.25%", // Alternate between 16:9
                    }}
                    className="shadow-2xl shadow-black"
                    id="School Banner Image"
                />
                <div className="absolute inset-0 bg-cyan-400 opacity-50 mix-blend-multiply"></div>
            </div>
            <CardContent className="relative flex flex-col bg-slate-800 text-slate-100">
                <img
                    src="./images/Capstone A.png"
                    className="absolute scale-50 -left-16 -top-68"
                />
                <Typography
                    gutterBottom
                    variant="h1"
                    component="div"
                    className="absolute scale-50 -left-8 -top-28 text-slate-100 bg-slate-800 text-nowrap bg-opacity-85 p-2"
                >
                    The Universiy of Alabama
                </Typography>
                <EducationDetailField
                    fieldName="Degree"
                    fieldValue="Bachelor's of Science Computer Science"
                />
                <EducationDetailField fieldName="GPA" fieldValue="3.51 / 4" />
                <EducationDetailField
                    fieldName="Honors"
                    fieldValue="Cum Laude"
                />
                <EducationCardCloseButton closeCard={backdropClose} />
            </CardContent>
        </Card>
    );
}

export default EducationCard;
