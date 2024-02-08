import { PortableTextBlock } from "sanity";
import { Skill } from "./Skill";
import { ContributingAuthor } from "./ContributingAuthor";
import { Picture } from "./Picture";

export type Project = {
    _id: string,
    _createdAt: Date,
    _updatedAt: Date,
    _rev: string,
    name: string,
    slug: string,
    webURL: string,
    startDate: string,
    endDate: string,
    description: PortableTextBlock[],
    skills: Skill[],
    contributors: ContributingAuthor[],
    representativePicture: Picture,
    otherPictures: Picture[],
    keywords: string[],
}