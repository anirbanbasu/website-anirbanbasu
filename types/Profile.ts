import { PortableTextBlock } from "sanity";
import { Photograph } from "./Photograph";
import { Project } from "./Project";
import { Skill } from "./Skill";
import { LanguageSkill } from "./LanguageSkill";
import { PersonName } from "./PersonName";
import { Education } from "./Education";

export type Profile = {
    _id: string,
    _createdAt: Date,
    _updatedAt: Date,
    _rev: string,
    name: PersonName,
    headline: string,
    summary: PortableTextBlock[],
    keywords: string[],
    profileImage: Photograph,
    language: string,
    skills: Skill[],
    languageSkills: LanguageSkill[],
    formalEducation: Education[],
    projects: Project[],
}