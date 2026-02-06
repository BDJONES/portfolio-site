import { Box } from "@mui/material";

function HomeText() {
    return (
        <Box
            sx={{
                border: "1px solid black",
                // backgroundColor: "rgba(254,240,229,255)",
                // borderRadius: 4,
            }}
            className="TextContainer shadow-lg shadow-slate-950 p-2 border border-slate-700 bg-slate-800 "
        >
            <p className="text-slate-100 text-2xl min-[431px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center font-bold">
                Brandon Jones
            </p>
            <p className="text-violet-400 text-base min-[431px]:text-lg sm:text-xl md:text-2xl lg:text-3xl text-center font-lora">
                Software Engineer
            </p>
        </Box>
    );
}

export default HomeText;
