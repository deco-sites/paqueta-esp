import type { ComponentChildren } from "preact";
import { useEffect, useState } from "preact/hooks";

interface MenuProps {
  activeAlert: boolean;
}

export interface Props {
  type: string;
}

export default function ScrollableContainer(
  { children, type }: { children: ComponentChildren; type: string },
) {
  const [activeAlert, setActiveAlert] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (globalThis.scrollY > 50) {
        setActiveAlert(false);
      } else {
        setActiveAlert(true);
      }
    };

    globalThis.addEventListener("scroll", handleScroll);

    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {type === "Alert" && (
        <AlertContainer active={activeAlert}>{children}</AlertContainer>
      )}
      {type === "Menu" && (
        <MenuContainer activeAlert={activeAlert}>{children}</MenuContainer>
      )}
    </>
  );
}

function AlertContainer(
  { children, active }: { children: ComponentChildren; active: boolean },
) {
  return (
    <div
      class={`${
        active ? "translate-y-0 h-auto" : "-translate-y-16 h-0 duration-0"
      } transition-all duration-100`}
    >
      {children}
    </div>
  );
}

function MenuContainer(
  { children, activeAlert }: {
    children: ComponentChildren;
    activeAlert: boolean;
  },
) {
  const [active, setActive] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const delta = 5;

  useEffect(() => {
    const handleScroll = () => {
      const nowScrollTop = globalThis.scrollY ||
        document.documentElement.scrollTop;

      if (Math.abs(lastScrollTop - nowScrollTop) >= delta) {
        if (nowScrollTop > lastScrollTop) {
          setActive(false);
        } else {
          setActive(true);
        }
        setLastScrollTop(nowScrollTop);
      }
    };

    globalThis.addEventListener("scroll", handleScroll);

    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <div
      class={`absolute w-full z-10 ${
        active
          ? activeAlert ? "top-[124px]" : "top-[84px] duration-100"
          : "-top-[50px] duration-0"
      } `}
    >
      {children}
    </div>
  );
}
