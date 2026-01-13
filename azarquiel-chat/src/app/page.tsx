"use client";
import { RealtimeChat } from "@/components/realtime-chat";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();
  return (
    <>
      <SignedOut>
        <section className="h-screen p-8 pt-24 w-full flex flex-col items-center justify-center gap-8 bg-linear-to-r from-lime-500/30 via-orange-300/30 to-purple-400/30">
          <p className="text-center text-4xl max-w-xl">
            Chatea con tus{" "}
            <span className="uppercase font-semibold text-accent-foreground">
              compañeros
            </span>{" "}
            y{" "}
            <span className="uppercase font-semibold text-accent-foreground">
              profesores
            </span>{" "}
            en{" "}
            <span className="uppercase font-bold bg-linear-to-r from-lime-500 via-orange-300 to-purple-400 bg-clip-text text-transparent animate-pulse">
              tiempo real
            </span>
            .
          </p>
          <small>Demostración de despliegue de App Web en Netlify</small>
          <SignInButton mode="modal">
            <Button variant={"default"} size={"lg"} className="cursor-pointer">
              Iniciar sesión
            </Button>
          </SignInButton>
        </section>
      </SignedOut>
      <SignedIn>
        <section className="h-screen p-8 pt-24 w-full bg-linear-to-r from-lime-500/30 via-orange-300/30 to-purple-400/30">
          {user?.username && (
            <RealtimeChat roomName="azarquielRoom" username={user?.username} />
          )}
        </section>
      </SignedIn>
    </>
  );
}
