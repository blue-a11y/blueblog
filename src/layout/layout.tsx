import { NavLink, Outlet, useNavigate, useLocation } from "react-router";
import { MenuBar, type MenuItem } from "@/components/ui/glow-menu";
import { GridBackground } from "@/components/ui/grid-background";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { BiHome } from "react-icons/bi";
import { FcAbout } from "react-icons/fc";
import { RiBloggerFill } from "react-icons/ri";
import { LuProjector } from "react-icons/lu";
import { IoIosFlask } from "react-icons/io";
import BLUE_AVATAR from "@/assets/blue-avatar.jpg";

const menuItems = [
  {
    icon: BiHome,
    label: "首页",
    href: "/",
    gradient:
      "radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(79,70,229,0.06) 50%, rgba(67,56,202,0) 100%)",
    iconColor: "text-indigo-500",
  },
  {
    icon: RiBloggerFill,
    label: "博客",
    href: "/blog",
    gradient:
      "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
    iconColor: "text-orange-500",
  },
  {
    icon: LuProjector,
    label: "项目",
    href: "/projects",
    gradient:
      "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
    iconColor: "text-green-500",
  },
  {
    icon: IoIosFlask,
    label: "实验室",
    href: "/lab",
    gradient:
      "radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(139,92,246,0.06) 50%, rgba(124,58,237,0) 100%)",
    iconColor: "text-purple-500",
  },
  {
    icon: FcAbout,
    label: "关于",
    href: "/about",
    gradient:
      "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "text-blue-500",
  },
];

function Layout() {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const handleItemClick = ({ href }: MenuItem) => {
    navigate(href);
  };

  return (
    <div className="relative min-h-svh">
      <GridBackground />
      <header className="relative z-10 mt-2">
        <div className="mx-auto flex h-14 w-fit items-center justify-between gap-10 px-6">
          <NavLink to="/">
            <Avatar size="lg" className="shadow-lg">
              <AvatarImage src={BLUE_AVATAR} alt="@blue" />
            </Avatar>
          </NavLink>
          <MenuBar items={menuItems} active={pathname} onItemClick={handleItemClick} />
        </div>
      </header>
      <main className="relative z-1 mx-auto max-w-3/5">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
