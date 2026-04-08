import { useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router";
import { MenuBar } from "@/components/ui/glow-menu";
import { GridBackground } from "@/components/ui/grid-background";
import { Home, BookOpen, FolderKanban, FlaskConical, User } from "lucide-react";

const menuItems = [
  {
    icon: Home,
    label: "首页",
    href: "/",
    gradient:
      "radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(79,70,229,0.06) 50%, rgba(67,56,202,0) 100%)",
    iconColor: "text-indigo-500",
  },
  {
    icon: BookOpen,
    label: "博客",
    href: "/blog",
    gradient:
      "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
    iconColor: "text-orange-500",
  },
  {
    icon: FolderKanban,
    label: "项目",
    href: "/projects",
    gradient:
      "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
    iconColor: "text-green-500",
  },
  {
    icon: FlaskConical,
    label: "实验室",
    href: "/lab",
    gradient:
      "radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(139,92,246,0.06) 50%, rgba(124,58,237,0) 100%)",
    iconColor: "text-purple-500",
  },
  {
    icon: User,
    label: "关于",
    href: "/about",
    gradient:
      "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "text-blue-500",
  },
];

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(
    menuItems.find((item) => {
      if (item.href === "/") {
        return location.pathname === "/";
      }
      return location.pathname.startsWith(item.href);
    })?.label ?? "首页",
  );

  const handleItemClick = (label: string) => {
    setActiveItem(label);
    const item = menuItems.find((i) => i.label === label);
    if (item) {
      navigate(item.href);
    }
  };

  return (
    <div className="relative min-h-svh">
      <GridBackground />
      <header className="relative z-10">
        <div className="mx-auto flex h-14 gap-10 items-center w-fit justify-between px-6">
          <NavLink className="text-xl font-semibold text-foreground no-underline" to="/">
            Blue
          </NavLink>
          <MenuBar items={menuItems} activeItem={activeItem} onItemClick={handleItemClick} />
        </div>
      </header>
      <main className="relative z-1 max-w-3/5 mx-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
