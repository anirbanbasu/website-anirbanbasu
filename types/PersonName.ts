import { PortableTextBlock } from "sanity";

export type PersonName = {
    familyName: string,
    givenNames: string[],
    pronunciation: string,
    pronouns: string,
}