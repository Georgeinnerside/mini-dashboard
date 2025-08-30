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
      <ul className="mt-4">
        {menuList.map((menu) => (
          <li
            key={menu.id}
            className={`flex items-center gap-2 cursor-pointer p-2 justify-center
        ${
          isActive === menu.id
            ? `text-white ${
                isOpen ? "md:bg-blue-700 md:rounded-full" : ""
              } transition-colors duration-300`
            : "text-gray-800 dark:text-gray-200"
        }
        ${isOpen ? "gap-2" : "rounded-md"}
      `}
          >
            <span className="w-8 h-8 flex items-center justify-center">
              {menu.icon}
            </span>
            {isOpen && (
              <span className="hidden w-5 h-5 md:block">{menu.name}</span>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
