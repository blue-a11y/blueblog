import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="min-h-svh bg-[#07090f] text-slate-100">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
