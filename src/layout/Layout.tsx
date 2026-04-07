import { NavLink, Outlet } from "react-router";
import clsx from "clsx";

const navItems = [
  { to: "/", label: "首页" },
  { to: "/blog", label: "博客" },
  { to: "/projects", label: "项目" },
  { to: "/lab", label: "实验室" },
  { to: "/about", label: "关于" },
];

function Layout() {
  return (
    <div className="flex min-h-svh flex-col">
      <nav className="sticky top-0 z-10 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto flex h-14 max-w-[900px] items-center justify-between px-6">
          <NavLink className="text-xl font-semibold text-gray-900 no-underline dark:text-gray-100" to="/">
            Blue
          </NavLink>
          <ul className="m-0 flex list-none gap-2 p-0">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  className={({ isActive }) =>
                    clsx(
                      "rounded-md px-3 py-1.5 text-[15px] no-underline transition-colors duration-150",
                      isActive
                        ? "font-medium text-purple-600 dark:text-purple-400"
                        : "text-gray-500 hover:bg-purple-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100",
                    )
                  }
                  to={item.to}
                  end={item.to === "/"}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <main className="mx-auto w-full max-w-[900px] flex-1 px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
