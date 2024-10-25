"use client"

import { redirect } from "next/navigation";
import { deleteSession } from "./lib/session";

export default function Home() {
  async function handleLogout() {
    deleteSession()
    redirect('/login')
  }
  return (
    <>
      <p>Hello</p>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
