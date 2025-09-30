"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`,
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`,
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`

type ParticlesComponentProps = {
  id?: string
  className?: string
  enableInLight?: boolean
  density?: number
}

export const ParticlesComponent = ({
  id = "tsparticles",
  className = "",
  enableInLight = false,
  density = 55
}: ParticlesComponentProps) => {
  const [init, setInit] = useState(false);
  const { theme } = useTheme();
  const resolvedTheme = theme ?? "dark";

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (_container?: Container): Promise<void> => {
    // noop – kept for potential future hooks
  };

  const options: ISourceOptions = useMemo(
    () => ({
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: ["repulse", "bubble"],
          },
          resize: {
            enable: true,
          },
        },
        modes: {
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          bubble: {
            distance: 180,
            size: 4,
            duration: 2,
            opacity: 0.2,
          },
        },
      },
      particles: {
        color: {
          value: resolvedTheme === "light" ? "#0f172a" : "#e2e8f0",
        },
        links: {
          color: resolvedTheme === "light" ? "#1e293b" : "#94a3b8",
          distance: 140,
          enable: true,
          opacity: resolvedTheme === "light" ? 0.18 : 0.45,
          width: resolvedTheme === "light" ? 0.5 : 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out",
          },
          random: false,
          speed: 0.9,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: density,
        },
        opacity: {
          value: resolvedTheme === "light" ? 0.18 : 0.35,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 0.8, max: 3.2 },
        },
      },
      detectRetina: true,
    }),
    [resolvedTheme, density],
  );

  const shouldShow = enableInLight || resolvedTheme !== "light"

  if (init && shouldShow) {
    return (
      <Particles
        id={id}
        particlesLoaded={particlesLoaded}
        options={options}
        className={`pointer-events-none ${className}`}
      />
    );
  }

  return <></>;
};