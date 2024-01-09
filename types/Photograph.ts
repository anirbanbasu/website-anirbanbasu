import { ImageAsset, PortableTextBlock } from "sanity";
import { FocalLengthExposureTriangle } from "./FocalLengthExposureTriangle";

export type Photograph = {
    _id: string,
    _createdAt: Date,
    _updatedAt: Date,
    _rev: string,
    caption: string,
    altText: string,
    slug: string,
    description: PortableTextBlock[],
    imageData: ImageAsset,
    focalLengthExposureTriangle: FocalLengthExposureTriangle,
    tags: string[],
}