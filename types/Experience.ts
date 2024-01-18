import { PortableTextBlock } from "sanity";
import { Skill } from "./Skill";
import { Project } from "./Project";

export type Experience = {
    _id: string,
    _createdAt: Date,
    _updatedAt: Date,
    _rev: string,
    title: string,
    name: string,
    location: string,
    webURL: string,
    experienceType: number,
    workStyle: number,
    startDate: Date,
    endDate: Date,
    description: PortableTextBlock[],
    skills: Skill[],
    relatedProjects: Project[],
    keywords: string[],
}