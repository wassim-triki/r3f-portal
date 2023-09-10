import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Link, useParams } from "react-router-dom";

function App() {
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
      >
        {id ? "< back" : "double click to enter portal"}
      </Link>
    </>
  );
}

export default App;
