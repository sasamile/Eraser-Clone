"use client";
import { SocialButton } from "@/components/SocialButton";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import Loading from "@/components/Loading";
import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";

function RootLayoutAuth({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (error) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setError(null);
        }, 300);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    const urlErrorParam = searchParams.get("error");
    if (urlErrorParam === "OAuthAccountNotLinked") {
      setError("El correo ya está en uso con otra cuenta!");
    }
  }, [searchParams]);

  const handleLogin = async (provider: "google" | "microsoft-entra-id") => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await signIn(provider, {
        callbackUrl: "/dashboard",
        redirect: false,
      });

      if (result?.error) {
        if (result.error === "EmailExists") {
          setError("Este correo ya está registrado con otro proveedor");
        } else {
          setError("Ocurrió un error durante el inicio de sesión");
        }
      } else if (result?.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      setError("Ocurrió un error durante el inicio de sesión");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex flex-col min-h-screen">
        <div className="p-14">
          <Image src="/logo.svg" alt="logo" width={150} height={200} />
        </div>
        {error && (
          <div
            className={`mx-auto max-w-md w-full px-4 mb-4 transition-all duration-300 ease-in-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            }`}
          >
            <div className="flex items-center p-4 bg-red-50 border-l-4 border-red-500 rounded-r-md">
              <div className="flex-shrink-0 rounded-full bg-red-400">
                <X className="w-4 h-4 p-1" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-center items-center">{children}</div>
        <div className="flex xs:flex-row flex-col items-center justify-center gap-3 p-4">
          <SocialButton
            label="Log in with Google"
            label2="Google"
            onClick={() => handleLogin("google")}
          />
          <SocialButton
            label="Log in with Microsoft"
            label2="Microsoft"
            onClick={() => handleLogin("microsoft-entra-id")}
          />
        </div>
      </div>
    </>
  );
}

export default RootLayoutAuth;