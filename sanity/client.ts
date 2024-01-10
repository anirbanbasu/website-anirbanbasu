import { createClient } from "next-sanity";

import imageUrlBuilder from '@sanity/image-url'
import { Image } from "sanity";
import { ProfileSummary } from "@/types/ProfileSummary";
import { groq } from "next-sanity";

const sanityClientConfig = {
    projectId: 'l7tokq15',
    dataset: 'production',
    apiVersion: '2023-08-31',
    useCdn: true,
}

const sanityClient = createClient(sanityClientConfig);

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: Image) {
  return builder.image(source)
}

export async function getProfileSummary(profileId: string): Promise<ProfileSummary> {
    return sanityClient.fetch( 
        groq`*[_type=='profileSummary' && _id == "${profileId}"]{
            _id,
            _createdAt,
            _updatedAt,
            _rev,
            name,
            tagLine,
            summary,
            keywords[],
            profileImage -> {
                ...,
                "imageData": imageData.asset -> {...}
            }
        }[0]`, {cache: 'no-store'}
    );
}