import { FC } from "react";
import { motion } from "framer-motion";
import { Tooltip } from "@mui/material";
import type { ReactNode } from "react";

// -----------------------------
// Types
// -----------------------------

interface TechItem {
  name: string;
  icon: ReactNode;
  color: string; // Tailwind color class
}

export interface JobCardProps {
  title: string;
  company: string;
  date: string;
  description: string[];
  techStack: TechItem[];
}

// -----------------------------
// Components
// -----------------------------

export const JobCard: FC<JobCardProps> = ({
  title,
  company,
  date,
  description,
  techStack,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.4 }}
      className="relative w-full max-w-md p-6 overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/80 backdrop-blur-md shadow-xl"
    >
      {/* Accent line */}
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-violet-400 to-cyan-400" />

      {/* Header */}
      <header className="mb-4 flex flex-col">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-slate-100">
              {title}
            </h3>
            <p className="mt-1 text-sm font-medium text-violet-400">
              {company}
            </p>
          </div>
        </div>
        <span className="mt-2 font-mono text-xs uppercase tracking-wider text-slate-400">
          {date}
        </span>
      </header>

      {/* Description */}
      <section className="mb-6">
        <ul className="ml-4 list-disc space-y-2">
          {description.map((point, index) => (
            <li
              key={index}
              className="text-sm leading-relaxed text-slate-300"
            >
              {point}
            </li>
          ))}
        </ul>
      </section>

      {/* Tech Stack */}
      <footer className="border-t border-slate-700/50 pt-4">
        <p className="mb-3 text-xs font-semibold uppercase text-slate-500">
          Technologies Used
        </p>
        <div className="flex flex-wrap gap-3">
          {techStack.map((tech) => (
            <Tooltip key={tech.name} title={tech.name} arrow placement="top">
              <div className="cursor-default rounded-lg bg-slate-700/50 p-2 ring-1 ring-white/10 transition-colors hover:bg-slate-700">
                <span className={`text-xl ${tech.color}`}>
                  {tech.icon}
                </span>
              </div>
            </Tooltip>
          ))}
        </div>
      </footer>
    </motion.div>
  );
};

export default JobCard;
