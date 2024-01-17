import { PortableTextBlock } from "sanity";
import { Skill } from "./Skill";
import { ContributingAuthor } from "./ContributingAuthor";

export type Project = {
    _id: string,
    _createdAt: Date,
    _updatedAt: Date,
    _rev: string,
    name: string,
    webURL: string,
    startDate: Date,
    endDate: Date,
    description: PortableTextBlock[],
    skills: Skill[],
    contributors: ContributingAuthor[],
    keywords: string[],
}