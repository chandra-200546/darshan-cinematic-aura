import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Intro } from "@/components/Intro";
import { Portfolio } from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [introDone, setIntroDone] = useState(false);
  return (
    <>
      {!introDone && <Intro onDone={() => setIntroDone(true)} />}
      {introDone && <Portfolio />}
    </>
  );
}
