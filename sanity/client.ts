import 'server-only'
import { createClient, type ClientConfig } from "next-sanity";

import imageUrlBuilder from '@sanity/image-url'
import { Image } from "sanity";
import { groq } from "next-sanity";
import { Profile } from '@/types/Profile';
import { IconType } from 'react-icons';
import { IoShareSocialOutline } from 'react-icons/io5';
import { Si500Px, SiAcademia, SiArtstation, SiBehance, SiBitbucket, SiDribbble, SiEtsy, SiFacebook, SiFlickr, SiGithub, SiGitlab, SiGoodreads, SiGooglescholar, SiInstagram, SiLinkedin, SiMedium, SiOrcid, SiPatreon, SiPinterest, SiReddit, SiResearchgate, SiSketchfab, SiSnapchat, SiSociety6, SiSoundcloud, SiSpotify, SiStackexchange, SiStackoverflow, SiTiktok, SiTumblr, SiTwitch, SiTwitter, SiVimeo, SiWordpress, SiYoutube, SiZotero } from "react-icons/si";

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

export function socialLinkIcon(socialName: string): IconType {
  var icon:IconType = IoShareSocialOutline
        switch (socialName) {
          case '500px':
            icon = Si500Px
            break
          case 'academia':
            icon = SiAcademia
            break
          case 'artstation':
            icon = SiArtstation
            break
          case 'behance':
            icon = SiBehance
            break
          case 'bitbucket':
            icon = SiBitbucket
            break
          case 'dribble':
            icon = SiDribbble
            break
          case 'etsy':
            icon = SiEtsy
            break
          case 'facebook':
            icon = SiFacebook
            break
          case 'flickr':
            icon = SiFlickr
            break
          case 'github':
            icon = SiGithub
            break
          case 'gitlab':
            icon = SiGitlab
            break
          case 'goodreads':
            icon = SiGoodreads
            break
          case 'googlescholar':
            icon = SiGooglescholar
            break
          case 'instagram':
            icon = SiInstagram
            break
          case 'linkedin':
            icon = SiLinkedin
            break
          case 'medium':
            icon = SiMedium
            break
          case 'orcid':
            icon = SiOrcid
            break
          case 'patreon':
            icon = SiPatreon
            break
          case 'pinterest':
            icon = SiPinterest
            break
          case 'reddit':
            icon = SiReddit
            break
          case 'researchgate':
            icon = SiResearchgate
            break
          case 'sketchfab':
            icon = SiSketchfab
            break
          case 'snapchat':
            icon = SiSnapchat
            break
          case 'society6':
            icon = SiSociety6
            break
          case 'soundcloud':
            icon = SiSoundcloud
            break
          case 'spotify':
            icon = SiSpotify
            break
          case 'stackexchange':
            icon = SiStackexchange
            break
          case 'stackoverflow':
            icon = SiStackoverflow
            break
          case 'tiktok':
            icon = SiTiktok
            break
          case 'tumblr':
            icon = SiTumblr
            break
          case 'twitch':
            icon = SiTwitch
            break
          case 'twitter':
            icon = SiTwitter
            break
          case 'vimeo':
            icon = SiVimeo
            break
          case 'wordpress':
            icon = SiWordpress
            break
          case 'youtube':
            icon = SiYoutube
            break
          case 'zotero':
            icon = SiZotero
            break
          default:
        }
    return icon
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
          projects[] -> {
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