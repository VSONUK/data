import { useEffect } from "react";

import Video from "./components/Video/Video";
import VideoState from "./context/VideoState";

import Options from "./components/options/Options";


const Home = () => {
  useEffect(() => {
    if (!navigator.onLine) alert("Connect to internet!");
  }, [navigator]);
  return (
    // Video component
    <VideoState>
      <div className="App" style={{  width: "100%" }}>
        <Video />
        <Options />
      </div>
      </VideoState>
  );
};

export default Home;
