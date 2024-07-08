"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useAdminAuth from "@/hooks/use-auth.hook";
import { useApiHelper } from "@/helpers/api-helper.hook";
import { Users } from "@/components/Users.component";
import { Settings } from "@/components/Settings.component";

export default function AdminDashboard() {
  const { isAuthorized, isChecking } = useAdminAuth();
  //   const { sendRequest } = useApiHelper();
  const [activeTab, setActiveTab] = useState("users"); // 'users' or 'settings'
  const router = useRouter();

  useEffect(() => {
    if (!isAuthorized && !isChecking) {
      router.push("/auth");
    }
  }, [isAuthorized, isChecking, router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <Users />;
      case "settings":
        return <Settings />;
      default:
        return <p>No content available.</p>;
    }
  };

  return isAuthorized ? (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex gap-4 mb-5 justify-around">
            <button
              onClick={() => setActiveTab("users")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              disabled={activeTab === "users"}
            >
              Manage Users
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              disabled={activeTab === "settings"}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              Manage Settings
            </button>
          </div>
          <div className="mx-2">{renderContent()}</div>
        </div>
      </main>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
