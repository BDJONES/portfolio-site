import { ReactNode } from "react";

export type SkillItem = {
    name: string;
    icon: ReactNode;
    color: string; // Tailwind color class
};

export type JobProps = {
    companyName: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
    skills?: SkillItem[];
    logo?: string;
};
