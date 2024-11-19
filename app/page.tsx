"use client";
import Figure from "@/components/Figure";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Loading from "@/components/Loading";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push(DEFAULT_LOGIN_REDIRECT);
    }
  }, [session, router]);

  // Si hay sesión, no renderizamos nada mientras se realiza la redirección
  if (session) return <Loading />;

  // Si no hay sesión, mostramos la página normal
  return (
    <div>
      <Header />
      <Hero />
      <Figure />
    </div>
  );
}
