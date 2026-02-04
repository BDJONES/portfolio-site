import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, Chip, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ProjectProps } from "./types/ProjectProps";
import { MediaCarousel } from "./MediaCarousel";
import "./styling/Projects.css";

const projects: ProjectProps[] = [
  {
    id: 1,
    name: "Pokemon Battle Evolution",
    thumbnail: "../../public/images/project_assets/Pokemon_Battle_Evolution/PokemonThumbnail.png",
    description:
      "A Pokemon Battle Evolution battle simulator built with Unity. This game allows you to battle your friends online, competeting in highstakes battles with your favorite Pokemon.",
    story:
      "This project was a passion project that I built in my free time. I wanted to create a game that would be fun to play and would challenge my skills as a developer. I used Unity to build the game and I used the Unity Editor to build the game. I used the Unity Engine to build the game. I used the Unity API to build the game. I used the Unity SDK to build the game. I used the Unity API to build the game. I used the Unity SDK to build the game. I used the Unity API to build the game. I used the Unity SDK to build the game.",
    tech: ["Unity", "C#", "Blender", "GitHub", "Unity Cloud Services"],
    media: [
      { type: "image", src: "../../public/images/project_assets/Pokemon_Battle_Evolution/PokemonThumbnail.png" },
      { type: "image", src: "../../public/images/project_assets/Pokemon_Battle_Evolution/Pokemon1.png" },
      { type: "image", src: "../../public/images/project_assets/Pokemon_Battle_Evolution/Pokemon2.png" },
    ],
    githubLink: "https://github.com/BDJONES/Pokemon-Battle-Evolution"
  },
  {
    id: 2,
    name: "Chess 1999",
    thumbnail: "../../public/images/project_assets/Chess_Game_1999/ChessThumbnail.png",
    description:
      "A Chess Game built with Unity. This game allows you to play chess with your friends locally.",
    story:
      "This project was a project I built with one of my friends to keep my skills for software deve/game dev up. We used Unity to build this game, but took it upon ourselves to host meeting and truly collaborate with industry tools such as GitHub",
    tech: ["Unity", "C#", "GitHub", "Audacity", "Adobe Illustrator"],
    media: [
      { type: "image", src: "../../public/images/project_assets/Chess_Game_1999/ChessThumbnail.png" },
      { type: "image", src: "../../public/images/project_assets/Chess_Game_1999/Chess1.png" },
    ],
    githubLink: "https://github.com/WirelessInsect/Chess-Game-2025"
  }
];

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<ProjectProps | null>(null);

  return (
    <section className="projects-section bg-slate-900" id="projects">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.4 }}
        className="projects-title"
      >
        Projects
      </motion.h2>
      {/* Project Grid */}
      <div className="projects-grid">
        {projects.map((project: ProjectProps, index: number) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.03 }}
            className="project-card"
            onClick={() => setActiveProject(project)}
          >
            <img
              src={project.thumbnail}
              alt={project.name}
              className="project-card-image"
            />
            <div className="project-card-content">
              <h3 className="project-card-title">{project.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MUI Dialog Overlay */}
      <Dialog
        open={Boolean(activeProject)}
        onClose={() => setActiveProject(null)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          className: "project-dialog-paper"
        }}
      >
        {activeProject && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="project-dialog-content"
            >
              <IconButton
                onClick={() => setActiveProject(null)}
                className="project-dialog-close-btn"
              >
                <CloseIcon />
              </IconButton>

              <div className="project-dialog-grid">
                {/* Media */}
                <MediaCarousel media={activeProject.media} />

                {/* Details */}
                <div className="project-details">
                  <div className="project-details-header">
                    <h3 className="project-details-title">
                      {activeProject.name}
                    </h3>
                    <a
                      href={activeProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="project-github-link"
                    >
                      <span className="project-github-tooltip">GitHub Repo</span>
                      <img
                        src="../../public/images/github-logo.svg"
                        alt="GitHub"
                        className="project-github-logo"
                      />
                    </a>
                  </div>
                  <p className="project-details-description">
                    {activeProject.description}
                  </p>
                  <p className="project-details-story">
                    {activeProject.story}
                  </p>

                  <div className="project-tech-section">
                    <h4 className="project-tech-title">
                      Tech Stack
                    </h4>
                    <div className="project-tech-chips">
                      {activeProject.tech.map(t => (
                        <Chip
                          key={t}
                          label={t}
                          size="small"
                          className="project-tech-chip"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </Dialog>
    </section>
  );
}