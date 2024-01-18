import { ImageAsset, PortableTextBlock } from "sanity";

export type Picture = {
    _id: string,
    _createdAt: Date,
    _updatedAt: Date,
    _rev: string,
    caption: string,
    description: PortableTextBlock[],
    imageData: ImageAsset,
    tags: string[],
}