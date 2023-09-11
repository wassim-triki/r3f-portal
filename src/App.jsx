import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Link, useParams } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useSnapshot } from "valtio";
import state from "./store";
import Arrow from "./components/Arrow";

function App() {
  const { id } = useParams();
  const snap = useSnapshot(state);

  useEffect(() => {
    state.inPortal = Boolean(id);
  }, [id]);

  return (
    <>
      <Canvas shadows camera={{ fov: 75, position: [0, 0, 20] }}>
        <color attach="background" args={["#ececec"]} />
        <Experience />
      </Canvas>
      {/* 
      <Link
        style={{ position: "absolute", top: 40, left: 40, fontSize: "13px" }}
        to={"/"}
      >
        {id ? "< back" : "double click to enter portal"}
      </Link> */}

      {/* <div className="absolute top-[50px] left-[60px]">
        <span className="arrow"></span>
      </div> */}

      <TextAnimationComponent trigger={snap.inPortal} />
    </>
  );
}

function TextAnimationComponent({ trigger }) {
  const [text, setText] = useState("Double click a portal");
  const [textColor, setTextColor] = useState("#575757");
  const textRef = useRef(null);
  const inPortalText = useRef(null);
  const outOfPortalText = useRef(null);

  // useLayoutEffect(() => {
  //   gsap.to(outOfPortalText.current, {
  //     top: "100px",
  //     duration: 0.75,
  //     ease: "elastic.out(1, 0.75)",
  //     delay: 1,
  //   });
  // }, []);

  useLayoutEffect(() => {
    if (trigger) {
      // Entering the portal
      gsap.to(outOfPortalText.current, {
        top: "-100px",
        color: "#ececec",
        duration: 0.35,
        ease: "elastic.in(1, 0.75)",
        onComplete: () => {
          gsap.to(inPortalText.current, {
            // top: "50px",
            left: "65px",
            color: "#ececec",
            duration: 0.75,
            ease: "elastic.out(1, 0.75)",
          });
        },
      });
    } else {
      gsap.to(inPortalText.current, {
        left: "-100px",
        color: "#4e4e4e",
        duration: 0.35,
        ease: "elastic.in(1, 0.75)",
        onComplete: () => {
          gsap.to(outOfPortalText.current, {
            top: "50px",
            color: "#4e4e4e",
            duration: 0.75,
            ease: "elastic.out(1,0.75)",
          });
        },
      });
      // Exiting the portal
      // gsap.to(textRef.current, {
      //   opacity: 0,
      //   duration: 0.0,
      //   onComplete: () => {
      //     setText("Double click a portal");
      //     setTextColor("#575757");
      //     gsap.to(textRef.current, {
      //       opacity: 1,
      //       duration: 0.1,
      //     });
      //   },
      // });
    }
  }, [trigger]);

  const styles =
    "text-3xl absolute font-poppins font-black  left-1/2 -translate-x-1/2 text-black";

  return (
    <>
      <Link
        className={`text-[#ececec] block  left-[-100px] top-[50px] ${styles}`}
        ref={inPortalText}
        to={"/"}
      >
        {/* <span className="arrow"></span> */}
        <span className="arrow !absolute top-0 left-0"></span>
      </Link>
      <p
        className={`text-[#4e4e4e] top-[-100px] ${styles}`}
        ref={outOfPortalText}
      >
        Double click a portal
      </p>
    </>
  );
}

export default App;
