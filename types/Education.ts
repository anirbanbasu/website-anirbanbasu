import { PortableTextBlock } from "sanity";
import { Skill } from "./Skill";

export type Education = {
    _id: string,
    _createdAt: Date,
    _updatedAt: Date,
    _rev: string,
    institution: string,
    degree: string,
    fieldOfStudy: string,
    startDate: Date,
    endDate: Date,
    grade: string,
    summary: PortableTextBlock[],
    extracurricular: PortableTextBlock[],
    skills: Skill[]
}