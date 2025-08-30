import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

// menu lists for sidebar
const menuList = [
  { name: "dashboard", icon: <LayoutDashboard />, id: 1 },
  { name: "user", icon: <Users />, id: 2 },
  { name: "posts", icon: <FileText />, id: 3 },
];

const Sidebar = () => {
  const [isActive, setIsActive] = useState(3);
  const [isOpen, setIsOpen] = useState(true);
  return (
    <aside
      className={`border-r-gray-700 dark:border-r-gray-100 p-6 dark:bg-gray-800 transition-all ${
        isOpen ? "w-1/6" : "w-[5%]"
      }`}
    >
      {/* shows dashboard when sidebar is open, hides it when iis closed */}
      {isOpen ? (
        <h1 className="hidden text-2xl text-gray-800 font-bold border-b-gray-300 md:block dark:text-gray-100">
          Dashboard
        </h1>
      ) : (
        " "
      )}

      <nav className="flex text-gray-800 justify-end p-2 dark:text-gray-100">
        <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </nav>

      {/* active button on blue background, menuList hidden on small screen but visible on big screen */}
      <ul className="mt-4 flex flex-col">
        {menuList.map((menu) => {
          const isActiveItem = isActive === menu.id;

          return (
            <li
              key={menu.id}
              className={`
          flex items-center p-2 cursor-pointer
          rounded-md
          transition-colors duration-300
          ${
            isActiveItem
              ? "text-gray-800 dark:text-gray-200 md:bg-blue-700 md:text-white"
              : "text-gray-800 dark:text-gray-200"
          }
          ${
            isOpen
              ? "gap-2 justify-start w-full bg-transparent"
              : "justify-center"
          }
        `}
            >
              {/* Icon */}
              <span
                className={`
            w-8 h-8 flex items-center justify-center fill-current
          `}
              >
                {menu.icon}
              </span>

              {/* Text (only visible when sidebar is open) */}
              {isOpen && <span className="hidden md:block">{menu.name}</span>}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
