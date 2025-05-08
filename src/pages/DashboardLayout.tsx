import { NavLink } from "react-router-dom";
import { ReactNode, useState } from "react";
import {
  LayoutDashboard,
  Users,
  BarChart,
  MessageCircle,
  Bell,
  Settings,
  Search,
  Menu,
  X,
} from "lucide-react";
import dummyUser from "../assets/user.png";

const links = [
  { name: "Jobs", path: "/dashboard/jobs", icon: LayoutDashboard },
  { name: "Candidates", path: "/dashboard/candidates", icon: Users },
  { name: "Insights", path: "/dashboard/insights", icon: BarChart },
  { name: "Chatbot", path: "/dashboard/chatbot", icon: MessageCircle },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-zinc-900 text-white">
      {/* Sidebar - responsive */}
      <div
        className={`fixed z-30 top-0 left-0 h-full w-64 bg-zinc-950 p-6 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:flex-shrink-0`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <img src="/Star 1.png" alt="Dokkaabi logo" className="w-6 h-6" />
            <span className="text-2xl font-bold">Dokkaabi</span>
          </div>
          {/* Close button on mobile */}
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="space-y-2">
          {links.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white"
                    : "text-gray-400 hover:bg-zinc-800 hover:text-white"
                }`
              }
              onClick={() => setSidebarOpen(false)} // auto-close on mobile
            >
              <Icon className="w-5 h-5" />
              {name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-zinc-900 px-6 py-4 border-b border-zinc-800 flex justify-between items-center">
          {/* Left: Menu & Search */}
          <div className="flex items-center gap-4 w-full max-w-md">
            <button
              className="md:hidden text-gray-400 hover:text-white"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search for jobs, candidates and more..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-6 ml-4">
            <button className="text-gray-400 hover:text-white">
              <Settings className="w-5 h-5" />
            </button>
            <button className="relative text-gray-400 hover:text-white">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <img
              src={dummyUser}
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
      </main>
    </div>
  );
}

