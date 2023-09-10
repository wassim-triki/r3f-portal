import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import {
  Link,
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
        <color attach="background" args={["#ececec"]} />
        {/* ececec */}
        <Experience />
      </Canvas>

      <Link
        style={{ position: "absolute", top: 40, left: 40, fontSize: "13px" }}
        href="#"
        to={"/"}
        // onClick={() => navigate("/")}
      >
        {id ? "< back" : "double click to enter portal"}
      </Link>
    </>
  );
}

export default App;
