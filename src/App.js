import "./styles.css";
import Lottie from "react-lottie";
import animationData from "./lotties/test";

export default function App() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
}
