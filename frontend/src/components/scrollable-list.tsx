"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ScrollableList(props: { children: React.ReactNode }) {
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight);
    };

    // Set initial viewport height
    updateViewportHeight();

    // Update viewport height on resize
    window.addEventListener("resize", updateViewportHeight);

    // Cleanup
    return () => window.removeEventListener("resize", updateViewportHeight);
  }, []);

  return (
    <ScrollArea className="flex-grow" style={{ height: `calc(${viewportHeight}px - 20rem)` }}>
      {props.children}
    </ScrollArea>
  );
}
