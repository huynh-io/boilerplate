import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-background p-4">
      <div className="w-full max-w-3xl space-y-12 text-center mt-20 sm:mt-32">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Boilerplate
        </h1>
      </div>
    </div>
  );
}
