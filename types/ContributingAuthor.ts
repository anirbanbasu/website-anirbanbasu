import { PersonName } from "./PersonName"
import { Picture } from "./Picture"

export type ContributingAuthor = {
    _id: string,
    _createdAt: Date,
    _updatedAt: Date,
    _rev: string,
    authorType: string,
    personName: PersonName,
    organisationalName: string,
    orcid: string,
    webURL: string,
    imageRef: Picture,
}