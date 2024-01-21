import { PortableTextBlock } from "sanity";
import { Project } from "./Project";
import { Skill } from "./Skill";
import { LanguageSkill } from "./LanguageSkill";
import { PersonName } from "./PersonName";
import { Education } from "./Education";
import { Picture } from "./Picture";
import { Experience } from "./Experience";
import { SocialLink } from "./SocialLink";

export type Profile = {
    _id: string,
    _createdAt: Date,
    _updatedAt: Date,
    _rev: string,
    name: PersonName,
    headline: string,
    summary: PortableTextBlock[],
    socialLinks: SocialLink[],
    keywords: string[],
    profileImage: Picture,
    language: string,
    skills: Skill[],
    languageSkills: LanguageSkill[],
    education: Education[],
    projects: Project[],
    experience: Experience[],
}