"use client"

import Table from "./ui/table";
import Logout from "./ui/logout";
import Header from "./ui/header";

export default function Home() {
  return (
    <>
      <Header />
      <Logout />
      <Table />
    </>
  );
}
