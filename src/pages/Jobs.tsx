import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPinIcon, ExternalLink, BriefcaseIcon } from "lucide-react";
import ux from "../assets/ux.png";
import developer from "../assets/developer.png";
import finance from "../assets/finance.png";
import growth from "../assets/growth.png";

const jobs = [
  {
    title: "Sr. UX Designer",
    logo: ux,
    posted: "2 days ago",
    location: "Bengaluru",
    experience: "3 years exp.",
    applicants: 45,
    recentApplications: "25",
    color: "#00BFFF",
  },
  {
    title: "Frontend Developer",
    logo: developer,
    posted: "5 days ago",
    location: "Remote",
    experience: "2 years exp.",
    applicants: 67,
    recentApplications: "18",
    color: "#800080",
  },
  {
    title: "Financial Analyst",
    logo: finance,
    posted: "1 day ago",
    location: "New York",
    experience: "4 years exp.",
    applicants: 32,
    recentApplications: "12",
    color: "#68A063",
  },
  {
    title: "Growth manager",
    logo: growth,
    posted: "3 days ago",
    location: "San Francisco",
    experience: "5 years exp.",
    applicants: 24,
    recentApplications: "9",
    color: "#FF9900",
  },
  {
    title: "Visual Designer",
    logo: ux,
    posted: "4 days ago",
    location: "London",
    experience: "2 years exp.",
    applicants: 28,
    recentApplications: "11",
    color: "#FF0000",
  },
  {
    title: "Product Manager",
    logo: developer,
    posted: "1 week ago",
    location: "Toronto",
    experience: "6 years exp.",
    applicants: 36,
    recentApplications: "14",
    color: "#20C997",
  },
];

export default function JobsPage() {
  const [showAll, setShowAll] = useState(false);
  const visibleJobs = showAll ? jobs : jobs.slice(0, 3);

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-semibold">Job Openings</h2>

      <motion.div
        layout
        className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {visibleJobs.map((job, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="relative bg-zinc-800 p-5 rounded-2xl shadow-lg text-white overflow-hidden border-l-4"
                style={{ borderColor: job.color }} // dynamic left strip
              >
                {/* Gradient circle in top-right */}
                <div
                  className="absolute right-[-40px] top-[-40px] w-80 h-80 rounded-full pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${job.color}60, transparent 60%)`,
                    transform: "translate(30%, -30%)",
                  }}
                />

                {/* Main content */}
                <div className="relative z-10 space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <img src={job.logo} alt="logo" className="w-8 h-8" />
                      <div>
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <p className="text-sm text-zinc-400">
                          Posted {job.posted}
                        </p>
                      </div>
                    </div>
                    <button className="text-zinc-400 hover:text-white bg-zinc-800 p-2 rounded-full hover:bg-zinc-700">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <span className="bg-zinc-800 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="bg-zinc-800 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <BriefcaseIcon className="w-4 h-4" />
                      {job.experience} exp.
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <div className="flex justify-center items-center">
                      <p className="text-2xl font-bold">{job.applicants}</p>
                      <span className="text-zinc-400 ml-1.5">applicants</span>
                    </div>
                    <p className="text-green-400 text-sm">
                      {job.recentApplications} in last week
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowAll(!showAll)}
        className="mt-4 text-indigo-400 hover:underline"
      >
        {showAll ? "See less" : "See more"}
      </motion.button>
    </div>
  );
}
