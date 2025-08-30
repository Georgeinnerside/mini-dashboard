import ThemeToggle from "./ThemeToggle";
import { User } from "lucide-react";
const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-3 md:p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-900">
      <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
        Mini-Dashboard
      </h1>
      {/* dark and light mode toggle, user icon */}
      <div className="flex gap-4 items-center">
        <ThemeToggle />
        <div className="w-8 h-8 rounded-full text-gray-700 dark:text-gray-400">
          <User />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
