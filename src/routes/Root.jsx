import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function Root() {
  // creates an spa
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Root;
