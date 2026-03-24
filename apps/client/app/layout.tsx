"use client";

import { AuthProvider } from "@/context/AuthContext";
import UserHeader from "@/components/AuthButton/UserHeader";
import styles from "./Layout.module.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <header className={styles.header}>
            <UserHeader />
          </header>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
