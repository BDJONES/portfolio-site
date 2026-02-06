import Avatar from "./Avatar";
import HomeText from "./HomeText";
import "./styling/Home.css";
// import VerticalLinearStepper from "./VerticalStepper";
function Home() {
    return (
        <div className="Screen">
            {/* <VerticalLinearStepper /> */}
            <div className="Home min-h-screen pl-0 lg:pl-20" id="home">
                <div className="w-full md:w-[32%] flex justify-center">
                    <Avatar />
                </div>
                <div className="w-full md:w-[50%] flex justify-center">
                    <HomeText />
                </div>
            </div>
        </div>
    );
}

export default Home;
