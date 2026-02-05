import Home from "./components/Home/Home.tsx";
import SideBar from "./components/SideBar/SideBar.tsx";
import WorkExperience from "./components/WorkExperience/WorkExperience.tsx";
import ProjectSection from "./components/Projects/Projects.tsx";
import AboutMeSection from "./components/AboutMe/AboutMe.tsx";
import StickyButtons from "./components/StickyButtons/StickyButtons.tsx";

function App() {
    return (
        <>
            <StickyButtons />
            <SideBar />
            <Home />
            <AboutMeSection />
            <WorkExperience />
            <ProjectSection />
        </>
    );
}

export default App;
