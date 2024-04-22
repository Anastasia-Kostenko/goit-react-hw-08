import { Suspense } from "react";
import { AppBar } from "./components/Appbar/AppBar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div>
      <AppBar />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
};
