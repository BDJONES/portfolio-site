import { motion } from "framer-motion";

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
                                    I'm am currently working at United Airlines
                                    where I have had the pleasure of being able
                                    to try a variety of different roles through
                                    our early career program known as ECDLP
                                    (Early Career Digital Leadership Program)
                                    ranging from Data Analytics, to Software
                                    Development, and even Business Analytics.
                                </p>
                                <p>
                                    Through my many professional experiences, I
                                    would say I most enjoy working at the
                                    intersection of user experience and
                                    technical systems, to create real-world
                                    impact. I think that this love of creating
                                    great experiences can also be seen in some
                                    of the projects I work on in my free time. I
                                    amalways looking for new ways to learn and
                                    grow, in order to better the experience for
                                    our customers.
                                </p>
                                <p>
                                    On a team, I bring curiosity, structure, and
                                    a strong sense of ownership. I like
                                    understanding the <em>why</em> behind a
                                    problem as much as the solution itself.
                                </p>
                            </div>

                            {/* Highlights */}
                            <div className="space-y-4 border-l border-slate-300/40 pl-8">
                                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">
                                    Highlights
                                </h3>
                                <ul className="list-disc list-inside space-y-2 text-slate-300">
                                    {[
                                        "B.S. Computer Science, Cum Laude from The University of Alabama",
                                        "GitHub Foundations Certified",
                                        "Unity Junior Programmer",
                                    ].map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
