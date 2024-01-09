import { PortableTextBlock } from "sanity";
import { Photograph } from "./Photograph";

export type ProfileSummary = {
    _id: string,
    _createdAt: Date,
    _updatedAt: Date,
    _rev: string,
    name: string,
    tagLine: string,
    summary: PortableTextBlock[],
    keywords: string[],
    profileImage: Photograph,
}