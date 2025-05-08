import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Paperclip } from "lucide-react";
import charlie from "../assets/charlie.png"
import simon from "../assets/simon.png"
import nishant from "../assets/nishant.png"
import mark from "../assets/mark.png"
import ashley from "../assets/ashley.png"
import malaika from "../assets/malaika.png"

type Candidate = {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  stage: string;
  role: string;
  date: string;
  attachments: number;
  status: "accepted" | "rejected" | "all";
};

const candidatesData: Candidate[] = [
  {
    id: 1,
    name: "Charlie Kristen",
    avatar: charlie,
    rating: 4.0,
    stage: "Design Challenge",
    role: "Sr. UX Designer",
    date: "12/02/23",
    attachments: 3,
    status: "all",
  },
  {
    id: 2,
    name: "Malaika Brown",
    avatar: malaika,
    rating: 3.5,
    stage: "Screening",
    role: "Growth Manager",
    date: "18/02/23",
    attachments: 1,
    status: "all",
  },
  {
    id: 3,
    name: "Simon Minter",
    avatar: simon,
    rating: 2.8,
    stage: "Design Challenge",
    role: "Financial Analyst",
    date: "04/01/23",
    attachments: 2,
    status: "all",
  },
  {
    id: 4,
    name: "Ashley Brooke",
    avatar: ashley,
    rating: 4.5,
    stage: "HR Round",
    role: "Financial Analyst",
    date: "05/03/23",
    attachments: 3,
    status: "accepted",
  },
  {
    id: 5,
    name: "Nishant Talwar",
    avatar: nishant,
    rating: 5.0,
    stage: "Round 2 Interview",
    role: "Sr. UX Designer",
    date: "24/12/22",
    attachments: 2,
    status: "accepted",
  },
  {
    id: 6,
    name: "Mark Jacobs",
    avatar: mark,
    rating: 2.0,
    stage: "Rejected",
    role: "Growth Manager",
    date: "13/02/23",
    attachments: 1,
    status: "rejected",
  },
];

const tabs = ["All", "Accepted", "Rejected"];

export default function CandidatesPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredCandidates = candidatesData.filter((c) =>
    activeTab === "All" ? true : c.status === activeTab.toLowerCase()
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 sm:p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h2 className="text-2xl font-bold text-white">Candidates</h2>
        <div className="text-sm text-white bg-zinc-800 px-3 py-1 rounded-md">
          March 2023 ▼
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 sm:space-x-6 border-b border-zinc-700">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={
              "pb-2 text-sm font-medium " +
              (activeTab === tab
                ? "border-b-2 border-purple-500 text-white"
                : "text-zinc-400 hover:text-white")
            }
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table Wrapper for horizontal scroll */}
      <div className="w-full overflow-x-auto rounded-lg border border-zinc-800">
        <table className="min-w-[700px] w-full text-left text-sm text-white">
          <thead className="uppercase text-zinc-400 text-xs border-b border-zinc-700">
            <tr>
              <th className="py-3 px-4 whitespace-nowrap">Candidate Name</th>
              <th className="py-3 px-4 whitespace-nowrap">Rating</th>
              <th className="py-3 px-4 whitespace-nowrap">Stages</th>
              <th className="py-3 px-4 whitespace-nowrap">Applied Role</th>
              <th className="py-3 px-4 whitespace-nowrap">Application Date</th>
              <th className="py-3 px-4 whitespace-nowrap">Attachments</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {filteredCandidates.map((c) => (
              <tr key={c.id} className="hover:bg-zinc-800 transition">
                <td className="flex items-center gap-3 py-3 px-4 whitespace-nowrap">
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{c.name}</span>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span>{c.rating}</span>
                  </div>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">{c.stage}</td>
                <td className="py-3 px-4 whitespace-nowrap">{c.role}</td>
                <td className="py-3 px-4 whitespace-nowrap">{c.date}</td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <Paperclip className="w-4 h-4" />
                    {c.attachments} {c.attachments > 1 ? "files" : "file"}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
