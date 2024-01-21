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
  //console.log(profile.profileImage) // Why does the attribution not get displayed?

  return (
    <main className="flex items-center justify-center">
      <section className="mt-20 md:mt-24 max-w-7xl p-2">
        <div id={profile._id} className="grid grid-cols-6 gap-1">
          <div className="bg-gradient-to-r from-blue-600 via-orange-400 to-lime-600 bg-clip-text text-transparent col-span-4 row-span-2 p-2 text-start break-words text-4xl font-bold md:font-black text-gray-600 md:text-6xl">
            {profile.headline.toLowerCase()}
          </div>
          <div className="col-span-2 col-start-5 row-span-3 flex items-center justify-center">
            <div className="grid grid-cols-1 gap-1"> 
              <Image
                  src={urlFor(profile.profileImage.imageData).quality(100).size(700,700).fit('min').url().toString()}
                  alt={profile.profileImage.caption}
                  title={profile.profileImage.caption}
                  width={350}
                  height={350}
                  priority={false}
                />
                {typeof profile.profileImage.attribution === 'undefined' ? ``: ( <span className="-mt-5 w-auto truncate px-1 text-right text-sm text-gray-200 backdrop-blur-md" title={profile.profileImage.attribution}>{profile.profileImage.attribution}</span> )}
            </div>
          </div>
          <div className="col-span-6 p-2 text-justify text-base md:text-lg font-extralight text-gray-800 md:col-span-4">
            <PortableText value={profile.summary}/>
          </div>
          {profile.keywords && profile.keywords.map((keyword, index) => {
            return (
              <div key={index} className="border-slate-400 hover:bg-sky-200 col-span-2 border-[1px] break-words rounded-md p-2 text-center text-sm font-light text-gray-600">
                {keyword}
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
