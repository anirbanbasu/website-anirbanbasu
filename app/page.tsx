import Image from 'next/image'
import { urlFor, getProfileSummary } from '@/sanity/client'
import { PortableText } from '@portabletext/react';
import { ProfileSummary } from '@/types/ProfileSummary';
import { PiTagChevronDuotone } from "react-icons/pi";


const profileId = '2a886ccf-baf9-4c46-99cc-f7028d6a230b'

export default async function Home() {
  const profile:ProfileSummary = await getProfileSummary(profileId)

  return (
    <main className="lg:max-w-7xl mx-auto max-w-3xl md:px-16 px-6">
      <section className="flex xl:flex-row flex-col xl:items-center items-start xl:justify-center justify-between gap-x-12 lg:mt-32 mt-20 mb-16">
      <Image
            className="relative z-10 w-1/3 rounded-lg"
            src={urlFor(profile.profileImage.imageData).fit('min').url().toString()}
            alt={profile.profileImage.altText}
            width={profile.profileImage.imageData.metadata.dimensions.width}
            height={profile.profileImage.imageData.metadata.dimensions.height}
            priority
          />
        <div key={profile._id} className="lg:max-w-2xl max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight lg:min-w-[700px] min-w-full">
            {profile.name}
          </h1>
          <h2 className="text-xl font-extralight tracking-tight sm:text-2xl mb-6 lg:leading-[3.7rem] leading-tight lg:min-w-[700px] min-w-full">
            {profile.tagLine}
          </h2>
          <div className="text-base text-justify text-zinc-400 leading-relaxed">
            <PortableText value={profile.summary} />
          </div>
          <ul className="flex items-center gap-x-6 my-10">
              {profile.keywords && profile.keywords.map((keyword, index) => (
                  <li key={index} className="items-center flex justify-between text-sm text-pretty"><PiTagChevronDuotone />&nbsp;{keyword}</li>
                ))}
            </ul>
        </div>
      </section>
    </main>
  )
}
