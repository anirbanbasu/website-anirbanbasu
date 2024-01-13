import Image from 'next/image'
import { urlFor, getProfileSummary } from '@/sanity/client'
import { PortableText } from '@portabletext/react';
import { ProfileSummary } from '@/types/ProfileSummary';
import { PiTagChevronDuotone } from "react-icons/pi";


const profileId = '2a886ccf-baf9-4c46-99cc-f7028d6a230b'

export default async function Home() {
  const profile:ProfileSummary = await getProfileSummary(profileId)

  return (
    <main className="mt-20 md:mt-24 p-2 md:p-4 w-full flex items-center justify-center">
      <section className="p-4 border-2 border-zinc-600 rounded-lg">
        <div key={profile._id} className="flex flex-wrap items-center">
          <Image
                className="object-contain mr-8 rounded-lg"
                src={urlFor(profile.profileImage.imageData).quality(100).size(350,350).fit('min').url().toString()}
                alt={profile.profileImage.altText}
                width={175}
                height={175}
                priority={false}
              />
          <div>
            <h1 className="font-display mt-4 md:mt-0 lg:text-4xl text-2xl font-semibold dark:text-gray-200">
              {profile.name}
            </h1>
            <h2 className="lg:text-2xl font-extralight text-xl mb-4 md:mb-24 ">
              {profile.tagLine}
            </h2>
          </div>
        </div>
        <div className="text-base mt-4 mb-4 text-justify">
            <PortableText value={profile.summary} />
          </div>
        <ul className="border-t  border-zinc-800 pt-4 flex flex-wrap items-center gap-4">
            {profile.keywords && profile.keywords.map((keyword, index) => (
                <li key={index} className="items-center flex justify-between text-sm text-pretty"><PiTagChevronDuotone />&nbsp;{keyword}</li>
              ))}
        </ul>
      </section>
    </main>
  )
}
