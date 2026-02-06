import HomeIcon from "@mui/icons-material/Home";
import DeskIcon from "@mui/icons-material/Desk";
import CodeIcon from "@mui/icons-material/Code";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../../index.css";
import "./styling/SideBar.css";
import SideBarButton from "./SideBarButton";

function SideBar() {
    // const homeButton = <HomeIcon fontSize="large" />;
    return (
        <div
            className="sidebarRoot fixed bottom-0 left-0 right-0 w-full flex flex-row justify-center items-center p-2 bg-slate-700 z-40
            lg:bottom-auto lg:right-auto lg:top-0 lg:left-0 lg:h-screen lg:w-20 lg:flex-col lg:p-4 lg:items-center lg:min-h-0"
        >
            <div className="flex flex-row justify-evenly items-center w-full lg:flex-col lg:flex-1 lg:justify-center lg:items-center lg:w-auto lg:gap-2">
                {/* <SideBarButton
                    icon={<HomeIcon fontSize="large" />}
                    description="Home"
                /> */}
                <SideBarButton
                    icon={<HomeIcon fontSize="large" />}
                    description="Home"
                    href="#home"
                />
                <SideBarButton
                    icon={<AccountCircleIcon fontSize="large" />}
                    description="About Me"
                    href="#aboutMe"
                />
                <SideBarButton
                    icon={<DeskIcon fontSize="large" />}
                    description="Work"
                    href="#workExperience"
                />
                <SideBarButton
                    icon={<CodeIcon fontSize="large" />}
                    description="Projects"
                    href="#projects"
                />
                {/* <HomeIcon fontSize="large" className="sidebarButton" />
                <SchoolIcon fontSize="large" className="sidebarButton" />
                <DeskIcon fontSize="large" className="sidebarButton" /> */}
                {/* <i>Home</i>
                <i>Education</i>
                <i>Experience</i> */}
            </div>
        </div>
    );
}

export default SideBar;
