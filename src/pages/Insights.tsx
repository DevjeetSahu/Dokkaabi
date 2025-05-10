import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

const applicantsOverTime = [
  { date: "Week 1", applicants: 20 },
  { date: "Week 2", applicants: 40 },
  { date: "Week 3", applicants: 25 },
  { date: "Week 4", applicants: 50 },
];

const stageConversions = [
  { stage: "Applied", count: 100 },
  { stage: "Screening", count: 60 },
  { stage: "Interview", count: 35 },
  { stage: "Offer", count: 15 },
  { stage: "Hired", count: 5 },
];

const popularRoles = [
  { role: "Frontend Dev", count: 30 },
  { role: "Backend Dev", count: 45 },
  { role: "Product Manager", count: 20 },
  { role: "Data Scientist", count: 35 },
];

const colors = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function Insights() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 p-4 sm:p-6"
    >
      <h2 className="text-2xl font-semibold text-white">
        Insights & Analytics
      </h2>

      <div className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-2">
        {/* Line Chart Card */}
        <div className="relative bg-zinc-900 p-4 sm:p-5 rounded-2xl shadow-lg text-white overflow-hidden border-l-4 border-indigo-500">
          <div
            className="absolute right-[-40px] top-[-40px] w-72 h-72 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, #6366f144, transparent 60%)`,
              transform: "translate(30%, -30%)",
            }}
          />
          <div className="relative z-10 space-y-2">
            <h3 className="text-lg font-semibold">Applicants Over Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={applicantsOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="date" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    borderColor: "#374151",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="applicants"
                  stroke="#6366f1"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart Card */}
        <div className="relative bg-zinc-900 p-4 sm:p-5 rounded-2xl shadow-lg text-white overflow-hidden border-l-4 border-emerald-500">
          <div
            className="absolute right-[-40px] top-[-40px] w-72 h-72 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, #10b98144, transparent 60%)`,
              transform: "translate(30%, -30%)",
            }}
          />
          <div className="relative z-10 space-y-2">
            <h3 className="text-lg font-semibold">Conversion by Stage</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stageConversions}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="stage" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    borderColor: "#374151",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="count" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart Card */}
        <div className="relative bg-zinc-900 p-4 sm:p-5 rounded-2xl shadow-lg text-white overflow-hidden border-l-4 border-purple-500 col-span-1 lg:col-span-2">
          <div
            className="absolute right-[-40px] top-[-40px] w-100 h-100 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, #8b5cf644, transparent 60%)`,
              transform: "translate(30%, -30%)",
            }}
          />
          <div className="relative z-10 space-y-2">
            <h3 className="text-lg font-semibold">Most Popular Roles</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={popularRoles}
                  dataKey="count"
                  nameKey="role"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                >
                  {popularRoles.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#374151",
                    color: "#fff",
                  }}
                />
                <Legend wrapperStyle={{ color: "#ccc" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
