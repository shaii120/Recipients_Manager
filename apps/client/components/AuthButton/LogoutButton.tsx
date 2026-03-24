"use client";

import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import styles from "./AuthButton.module.css";

export default function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  async function handleClick() {
    await logout();
    router.push("/login");
  }

  return (
    <button className={styles.button} onClick={handleClick}>
      Logout
    </button>
  );
}
