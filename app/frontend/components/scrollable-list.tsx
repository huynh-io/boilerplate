import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ScrollableList({
  children,
  bottomOffset,
}: {
  children: React.ReactNode;
  bottomOffset?: string;
}) {
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight);
    };

    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);
    return () => window.removeEventListener("resize", updateViewportHeight);
  }, []);

  const offset = bottomOffset ? bottomOffset : "20rem";

  return (
    <ScrollArea
      className="flex-grow"
      style={{ height: `calc(${viewportHeight}px - ${offset})` }}
    >
      {children}
    </ScrollArea>
  );
}
