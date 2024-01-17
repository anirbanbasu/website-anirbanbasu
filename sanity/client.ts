import 'server-only'
import { createClient, type ClientConfig } from "next-sanity";

import imageUrlBuilder from '@sanity/image-url'
import { Image } from "sanity";
import { groq } from "next-sanity";
import { Profile } from '@/types/Profile';

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
export async function fetchProfile(): Promise<Profile> {
    return sanityClient.fetch(
        groq`*[_type == 'profile'] {
        _id,
        _createdAt,
        _updatedAt,
        _rev,
        name,
        headline,
        summary,
        formalEducation[] 
            | order(endDate desc) -> {
          ...,
          skills[] -> {...},
        },
        projects[] -> {
          ...,
          skills[] -> {...},
          contributors[] -> {...},
        },
        skills[] | order(level desc) -> {
          ...
        },
        languageSkills[] 
            | order(readingLevel desc) 
            | order(writingLevel desc) 
            | order(listeningLevel desc) 
            | order(speakingLevel desc) 
            | order(languageSkill asc) -> {
          ...
        },
        keywords,
        profileImage -> {
          ...,
          "imageData": imageData.asset -> {...}
        },
        language,
      }[0]`,
      {next: {revalidate: revalidateTime}});
}