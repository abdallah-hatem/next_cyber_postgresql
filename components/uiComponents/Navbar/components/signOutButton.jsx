"use client";
import PopConfirm from "@/components/PopConfirm";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  async function handleSignOut() {
    await signOut({ callbackUrl: "/login" }).then(() => localStorage.clear());
  }
  return (
    <PopConfirm
      title="Are you sure you want to logout ?"
      onConfirm={handleSignOut}
      okButtonStyle={{ backgroundColor: "red" }}
    >
      <p style={{ color: "red", cursor: "pointer" }}>Logout</p>
    </PopConfirm>
  );
}
