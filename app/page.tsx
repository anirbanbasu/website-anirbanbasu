import Image from 'next/image'
import { urlFor, fetchProfile } from '@/sanity/client'
import { PortableText } from '@portabletext/react';
import { GoWorkflow } from "react-icons/go";
import { IoLanguageOutline } from "react-icons/io5";
import { PiTagChevronDuotone } from "react-icons/pi";
import { Metadata } from 'next';
import { Profile } from '@/types/Profile';

export async function generateMetadata(): Promise<Metadata> {
  // fetch data
  const profile:Profile = await fetchProfile()
  return {
    title: profile.name.givenNames.join(' ').concat(' ', profile.name.familyName),
    description: profile.headline,
  }
}

export default async function Home() {
  const profile:Profile = await fetchProfile()

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
              {profile.name.givenNames.join(' ').concat(' ', profile.name.familyName)}
            </h1>
            <h2 className="lg:text-2xl font-extralight text-xl mb-4 md:mb-24 ">
              {profile.headline}
            </h2>
          </div>
        </div>
        <div className="text-base mt-4 mb-4 text-justify">
            <PortableText value={profile.summary} />
        </div>
        <ul className="pb-4 pt-4 flex flex-wrap items-center gap-4">
            {(profile.skills!=null)? 'Top skills:' : ''}
            {profile.skills && profile.skills.map((skill, index) => (
                <li key={index} className="items-center flex justify-between text-pretty"><GoWorkflow />&nbsp;{skill.skill}&nbsp;{(skill.note!=null? `(${skill.note})`: '' )}</li>
              ))}
        </ul>
        <ul className="pb-4 flex flex-wrap items-center gap-4">
            {(profile.languageSkills!=null)? 'Languages:' : ''}
            {profile.languageSkills && profile.languageSkills.map((languageSkill, index) => (
                <li key={index} className="items-center flex justify-between text-pretty"><IoLanguageOutline />&nbsp;{languageSkill.languageSkill}&nbsp;{(languageSkill.locale!=null? `(${languageSkill.locale})`: '' )}</li>
              ))}
        </ul>
        <ul className="border-t  border-zinc-800 pt-4 flex flex-wrap items-center gap-4">
            {profile.keywords && profile.keywords.map((keyword, index) => (
                <li key={index} className="items-center flex justify-between text-sm text-pretty"><PiTagChevronDuotone />&nbsp;{keyword}</li>
              ))}
        </ul>
      </section>
    </main>
  )
}
