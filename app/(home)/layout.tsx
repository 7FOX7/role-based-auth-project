import Header from "../ui/header";
import Logout from "../ui/logout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Header />      
      <Logout />
      {children}
    </div>
  );
}
