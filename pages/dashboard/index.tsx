"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useAdminAuth from "@/hooks/use-auth.hook";

export default function AdminDashboard() {
  const { isAuthorized, isChecking } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthorized && !isChecking) {
      router.push("/auth");
    }
  }, [isAuthorized, isChecking, router]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    router.push("/auth"); // Redirect to the login page
  };

  return isAuthorized ? (
    <main>
      <h1>Admin Dashboard</h1>
      <div>Welcome, Admin!</div>
      <button onClick={handleLogout}>Logout</button> {/* Logout Button */}
    </main>
  ) : (
    <p>Loading...</p>
  );
}
