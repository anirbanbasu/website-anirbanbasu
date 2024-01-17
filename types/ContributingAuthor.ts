import { PersonName } from "./PersonName"
import { Photograph } from "./Photograph"

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
    imageRef: Photograph,
}