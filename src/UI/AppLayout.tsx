import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Header";

export default function AppLayout() {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
    </>
  );
}
