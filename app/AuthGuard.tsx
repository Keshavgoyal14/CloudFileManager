"use client";
import { useSession, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="mb-4 text-xl">You must be signed in to use the app.</h2>
        <Button onClick={() => signIn()}>Sign in</Button>
      </div>
    );
  }

  return <>{children}</>;
}