"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default function AdminAuth() {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("");
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (loginSuccessful) {
      router.push("/dashboard");
    }
  }, [loginSuccessful, router]);

  async function handleLogin() {
    const loginUrl = `${API_URL}/auth/login`;
    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok && data.access_token) {
        localStorage.setItem("token", data.access_token);
        setLoginSuccessful(true);
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
    }
  }

  return (
    <main>
      <h1>Admin Login</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-blue-900"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="bg-blue-900"
      />
      <button onClick={handleLogin}>Login</button>
    </main>
  );
}
