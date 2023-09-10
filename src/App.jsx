import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      <Canvas shadows camera={{ fov: 75, position: [0, 0, 20] }}>
        <color attach="background" args={["#ececec"]} />
        <Experience />
      </Canvas>

      <a
        style={{ position: "absolute", top: 40, left: 40, fontSize: "13px" }}
        href="#"
        onClick={() => navigate("/")}
      >
        {pathname.length > 1 ? "< back" : "double click to enter portal"}
      </a>
    </>
  );
}

export default App;
