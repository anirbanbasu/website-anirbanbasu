import 'server-only'
import { createClient, type ClientConfig } from "next-sanity";

import imageUrlBuilder from '@sanity/image-url'
import { Image } from "sanity";
import { ProfileSummary } from "@/types/ProfileSummary";
import { groq } from "next-sanity";

const sanityClientConfig: ClientConfig = {
    projectId: 'l7tokq15',
    dataset: 'production',
    apiVersion: '2023-08-31',
    useCdn: true, // set to 'false' to bypass the edge cache
}

export const revalidateTime = 1800; // revalidate at most every half hour

const sanityClient = createClient(sanityClientConfig);

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: Image) {
  return builder.image(source)
}

// The fetch has to be language aware once internationalisation is added
export async function getProfileSummary(): Promise<ProfileSummary> {
    return sanityClient.fetch( 
        groq`*[_type=='profileSummary' && language=='en']{
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
        }[0]`, {next: {revalidate: revalidateTime}}
    );
}