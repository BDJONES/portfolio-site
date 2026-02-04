import "./styling/Home.css";

function Avatar() {
    return (
        <div className="AvatarContainer relative">
            {/* Cyan background - offset to bottom-right */}
            <div className="absolute top-5 left-5 w-full h-full bg-cyan-400 rounded-lg" />
            {/* Main photo - positioned above */}
        <img
                className="AvatarPhoto relative z-10 shadow-lg shadow-slate-950 border border-slate-700"
            src="images/Professional Photo.JPG"
            alt="Professional Photo"
        />
        </div>
    );
}

export default Avatar;
