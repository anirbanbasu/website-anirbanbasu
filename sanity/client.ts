import 'server-only'
import { createClient, type ClientConfig } from "next-sanity";

import imageUrlBuilder from '@sanity/image-url'
import { Image } from "sanity";
import { groq } from "next-sanity";
import { Profile } from '@/types/Profile';
import { IconType } from 'react-icons';
import { IoShareSocialOutline } from 'react-icons/io5';
import { Si500Px, SiAcademia, SiArtstation, SiBehance, SiBitbucket, SiDribbble, SiEtsy, SiFacebook, SiFlickr, SiGithub, SiGitlab, SiGoodreads, SiGooglescholar, SiInstagram, SiLinkedin, SiMedium, SiOrcid, SiPatreon, SiPinterest, SiReddit, SiResearchgate, SiSketchfab, SiSnapchat, SiSociety6, SiSoundcloud, SiSpotify, SiStackexchange, SiStackoverflow, SiTiktok, SiTumblr, SiTwitch, SiTwitter, SiVimeo, SiWordpress, SiYoutube, SiZotero } from "react-icons/si";
import { Project } from '@/types/Project';

const sanityClientConfig: ClientConfig = {
    projectId: 'l7tokq15',
    dataset: 'production',
    apiVersion: '2023-08-31',
    useCdn: true, // set to 'false' to bypass the edge cache
}

export const revalidateTime = 192; // revalidation time in seconds

const sanityClient = createClient(sanityClientConfig);

const builder = imageUrlBuilder(sanityClient)

const socialIconMap = new Map<string, IconType>([
  ["500px", Si500Px],
  ["academia", SiAcademia],
  ["artstation", SiArtstation],
  ["behance", SiBehance],
  ["bitbucket", SiBitbucket],
  ["dribble", SiDribbble],
  ["etsy", SiEtsy],
  ["facebook", SiFacebook],
  ["flickr", SiFlickr],
  ["github", SiGithub],
  ["gitlab", SiGitlab],
  ["goodreads", SiGoodreads],
  ["googlescholar", SiGooglescholar],
  ["instagram", SiInstagram],
  ["linkedin", SiLinkedin],
  ["medium", SiMedium],
  ["orcid", SiOrcid],
  ["patreon", SiPatreon],
  ["pinterest", SiPinterest],
  ["reddit", SiReddit],
  ["researchgate", SiResearchgate],
  ["sketchfab", SiSketchfab],
  ["snapchat", SiSnapchat],
  ["society6", SiSociety6],
  ["soundcloud", SiSoundcloud],
  ["spotify", SiSpotify],
  ["stackexchange", SiStackexchange],
  ["stackoverflow", SiStackoverflow],
  ["tiktok", SiTiktok],
  ["tumblr", SiTumblr],
  ["twitch", SiTwitch],
  ["twitter", SiTwitter],
  ["vimeo", SiVimeo],
  ["wordpress", SiWordpress],
  ["youtube", SiYoutube],
  ["zotero", SiZotero],
]);

export function urlFor(source: Image) {
  return builder.image(source)
}

export function socialLinkIcon(socialName: string): IconType {
  return socialIconMap.get(socialName.toLowerCase()) || IoShareSocialOutline;
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
          experience[] 
              | order(endDate desc) -> {
            ...,
            skills[] -> {...},
            relatedProjects[] -> {...}
          },
          education[] 
              | order(endDate desc) -> {
            ...,
            skills[] -> {...},
          },
          projects[] 
              | order(endDate desc) -> {
            ...,
            skills[] -> {...},
            contributors[] -> {...},
            representativePicture -> {
              ...,
              "imageData": imageData.asset -> {...}
            },
            otherPictures[] -> {
              ...,
              "imageData": imageData.asset -> {...}
            }
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
          socialLinks[] | order(socialLinkType asc) -> {...},
          keywords,
          profileImage -> {
            ...,
            "imageData": imageData.asset -> {...}
          },
          language,
        }[0]`,
      {next: {revalidate: revalidateTime}});
}

export async function fetchProjects(): Promise<Project[]> {
  return sanityClient.fetch(
    groq`*[_type == 'project'] | order(endDate desc) {
      _id,
      _createdAt,
      _updatedAt,
      _rev,
      name,
      slug,
      webURL,
      startDate,
      endDate,
      description,
      skills[] -> {...},
      contributors[] -> {...},
      representativePicture -> {
        ...,
        "imageData": imageData.asset -> {...}
      },
      otherPictures[] -> {
        ...,
        "imageData": imageData.asset -> {...}
      },
      keywords,
    }`,
  {next: {revalidate: revalidateTime}});
}