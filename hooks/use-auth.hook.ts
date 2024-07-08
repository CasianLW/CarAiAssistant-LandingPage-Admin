import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { User } from "@/interfaces/user.interface";

interface DecodedToken extends JwtPayload, User {}

function useAdminAuth() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true); // Add state to track checking status
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth");
      setIsChecking(false);
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);
      console.log("Decoded token:", decoded);
      if (decoded.roles && decoded.roles.includes("Admin")) {
        setIsAuthorized(true);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Failed to decode JWT:", error);
      localStorage.removeItem("token");
      router.push("/auth");
    } finally {
      setIsChecking(false); // Indicate that checking is complete
    }
  }, [router]);

  return { isAuthorized, isChecking };
}
export default useAdminAuth;
