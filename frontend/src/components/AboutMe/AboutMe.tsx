import { motion } from "framer-motion";
import { Chip } from "@mui/material";

export default function AboutMeSection() {
    return (
        <section
            id="aboutMe"
            className="min-h-0 pt-12 pb-8 bg-slate-900 flex items-center w-full lg:min-h-screen lg:pt-0 lg:pb-0"
        >
            <div className="w-full pl-4 lg:pl-24 pr-4 lg:pr-8">
                <div className="max-w-5xl mx-auto px-6 w-full">
                    {/* Section Header */}
                    <motion.h2
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.4 }}
                        className="text-4xl font-semibold mb-10 text-slate-100 text-center"
                    >
                        About Me
                    </motion.h2>

                    {/* Content Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="rounded-2xl border border-slate-700 bg-slate-800 p-8 shadow-lg"
                    >
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Narrative */}
                            <div className="md:col-span-2 space-y-4 text-slate-300">
                                <p>
                                    I'm a software engineer currently working at
                                    United Airlines where I have had the
                                    pleasure of being able to try a variety of
                                    different roles through our early career
                                    program known as ECDLP (Early Career Digital
                                    Leadership Program).
                                </p>
                                <p>
                                    I would say I most enjoy working at the
                                    intersection of user experience, technical
                                    systems, and real-world impact, and am
                                    always looking for new ways to learn and
                                    grow to better the experience for our
                                    customers. I think that this love of
                                    creating great experiences can also be seen
                                    in some of the projects I work on in my free
                                    time.
                                </p>
                                <p>
                                    On a team, I bring curiosity, structure, and
                                    a strong sense of ownership. I like
                                    understanding the <em>why</em> behind a
                                    problem as much as the solution itself.
                                </p>
                            </div>

                            {/* Strengths */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">
                                    What I bring
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        "Product-minded",
                                        "Collaborative",
                                        "Adaptable",
                                    ].map((trait) => (
                                        <Chip
                                            key={trait}
                                            label={trait}
                                            size="small"
                                            className="bg-slate-700 text-slate-100"
                                        />
                                    ))}
                                </div>

                                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide pt-4">
                                    Enjoys
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        "Team problem-solving",
                                        "Iterative design",
                                        "Learning new systems",
                                        "Innovation-Centered Conversation",
                                    ].map((item) => (
                                        <Chip
                                            key={item}
                                            label={item}
                                            size="small"
                                            className="bg-slate-700 text-slate-100"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
