import { Typography } from "@mui/material";

interface EducationFieldInfo {
    fieldName: string;
    fieldValue: string;
}

function EducationDetailField({ fieldName, fieldValue }: EducationFieldInfo) {
    return (
        <div className="flex flex-row items-center justify-between">
            <Typography variant="h5">{fieldName}:</Typography>
            <p className="text-lg">{fieldValue}</p>
        </div>
    );
}

export default EducationDetailField;
