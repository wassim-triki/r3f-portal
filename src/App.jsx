import { Canvas } from "@react-three/fiber";
import { Link, useParams } from "react-router-dom";
import { Suspense, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useSnapshot } from "valtio";
import state from "./store";
import { Experience } from "./components/Experience";

import { ReactComponent as Mouse2Icon } from "./assets/mouse2.svg";
import { Html, Loader, useProgress } from "@react-three/drei";
import { LinkIcon } from "@heroicons/react/24/solid";

function App() {
  const { id } = useParams();
  const snap = useSnapshot(state);

  const progress = useProgress();

  useEffect(() => {
    state.inPortal = Boolean(id);
  }, [id]);
  useEffect(() => {
    console.log(snap.inPortal);
  }, [snap.inPortal]);

  return (
    <>
      <Suspense>
        <Canvas
          frameloop="demand"
          shadows
          camera={{ fov: 75, position: [0, 0, 20] }}
        >
          <color attach="background" args={["#ececec"]} />

          <Experience />
        </Canvas>
      </Suspense>
      <Loader />
      <TextAnimationComponent isInsidePortal={snap.inPortal} />
      <Footer />
    </>
  );
}

function TextAnimationComponent({ isInsidePortal }) {
  const commonStyles = " absolute font-poppins  left-1/2 -translate-x-1/2";
  const snap = useSnapshot(state);
  const inPortalText = useRef(null);
  const outOfPortalText = useRef(null);
  const mouseIconRef = useRef(null);

  useLayoutEffect(() => {
    if (snap.inPortal) {
      gsap.to(outOfPortalText.current, {
        top: "-120px",
        color: "#ececec",
        duration: 0.35,
        ease: "elastic.in(1, 0.75)",
        onComplete: () => {
          gsap.to(inPortalText.current, {
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
            top: "40px",
            color: "#4e4e4e",
            duration: 0.75,
            ease: "elastic.out(1,0.75)",
          });
        },
      });
    }
  }, [
    isInsidePortal,
    inPortalText,
    outOfPortalText,
    mouseIconRef,
    snap.inPortal,
  ]);

  return (
    <>
      <Link
        className={`${commonStyles} text-customWhite block left-[-100px] top-[50px]`}
        ref={inPortalText}
        to={"/"}
      >
        <span className="arrow !absolute top-0 left-0"></span>
      </Link>
      <p
        className={`${commonStyles} text-[customBlack] font-light md:text-xl   text-center w-full flex justify-center items-center gap-1 flex-col text-sm`}
        ref={outOfPortalText}
      >
        <span ref={mouseIconRef}>
          <Mouse2Icon className="w-10 h-10 lg:w-20 lg:h-20 animate-bounce" />{" "}
        </span>
        <span>
          double click on a <span className="font-medium">portal </span>
        </span>
      </p>
    </>
  );
}

const Footer = () => {
  return (
    <footer className="absolute w-full bottom-0 left-0   font-poppins font-light text-customBlack">
      <div className="absolute md:left-16 left-10 md:bottom-10 bottom-5 text-sm flex gap-1 items-center">
        {/* <LinkIcon className="w-4 h-4" /> */}
        <span className=""> 2023 &copy; Wassim Triki</span>
      </div>
      <div className="absolute md:right-16 right-10 md:bottom-10 bottom-5 text-sm">
        09/12/2023
      </div>
    </footer>
  );
};

export default App;
