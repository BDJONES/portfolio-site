import HomeIcon from "@mui/icons-material/Home";
import DeskIcon from "@mui/icons-material/Desk";
import CodeIcon from "@mui/icons-material/Code";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../../index.css";
import SideBarButton from "./SideBarButton";

function SideBar() {
    // const homeButton = <HomeIcon fontSize="large" />;
    return (
        <div className="fixed h-screen w-16 md:w-20 left-0 top-0 bg-slate-700 flex flex-col p-2 md:p-4 items-center z-50">
            <div className="flex flex-col items-center justify-center flex-1">
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
