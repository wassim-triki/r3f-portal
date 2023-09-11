import { Canvas } from "@react-three/fiber";
import { Link, useParams } from "react-router-dom";
import { Suspense, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useSnapshot } from "valtio";
import state from "./store";
import { Experience } from "./components/Experience";

function App() {
  const { id } = useParams();
  const snap = useSnapshot(state);

  useEffect(() => {
    state.inPortal = Boolean(id);
  }, [id]);

  return (
    <>
      <Suspense
        fallback={
          <span className="text-black absolute left-1/2 top-1/2 -translate-x-1/2 text-3xl">
            Loading...
          </span>
        }
      >
        <Canvas
          frameloop="demand"
          shadows
          camera={{ fov: 75, position: [0, 0, 20] }}
        >
          <color attach="background" args={["#ececec"]} />
          <Experience />
        </Canvas>
      </Suspense>

      <TextAnimationComponent isInsidePortal={snap.inPortal} />
    </>
  );
}

function TextAnimationComponent({ isInsidePortal }) {
  const commonStyles =
    "text-3xl absolute font-poppins font-black left-1/2 -translate-x-1/2";

  const inPortalText = useRef(null);
  const outOfPortalText = useRef(null);

  useLayoutEffect(() => {
    if (isInsidePortal) {
      gsap.to(outOfPortalText.current, {
        top: "-100px",
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
            top: "50px",
            color: "#4e4e4e",
            duration: 0.75,
            ease: "elastic.out(1,0.75)",
          });
        },
      });
    }
  }, [isInsidePortal]);

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
        className={`${commonStyles} text-customBlack top-[-100px] text-xl md:text-3xl lg:3xl  text-center w-full`}
        ref={outOfPortalText}
      >
        Double click a portal !
      </p>
    </>
  );
}

export default App;
