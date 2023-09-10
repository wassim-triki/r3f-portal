import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      <Canvas shadows camera={{ fov: 75, position: [0, 0, 20] }}>
        <color attach="background" args={["#C3DFE0"]} />
        {/* ececec */}
        <Experience />
      </Canvas>

      <a
        style={{ position: "absolute", top: 40, left: 40, fontSize: "13px" }}
        href="#"
        onClick={() => navigate("/")}
      >
        {id ? "< back" : "double click to enter portal"}
      </a>
    </>
  );
}

export default App;
