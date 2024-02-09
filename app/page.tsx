import Image from 'next/image'
import { urlFor, fetchProfile, socialLinkIcon } from '@/sanity/client'
import { PortableText } from '@portabletext/react';
import { Metadata } from 'next';
import { Profile } from '@/types/Profile';
import Link from 'next/link';

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
    <main className="flex items-center justify-center">
      <section className="mt-20 md:mt-24 max-w-7xl p-2">
        <div id={profile._id} className="grid grid-cols-6 gap-1">
          <div className="bg-gradient-to-r from-info via-accent to-error bg-clip-text text-transparent col-span-6 md:col-span-4 md:row-span-2 p-2 text-start break-words text-4xl font-bold md:font-black md:text-6xl">
            {profile.headline.toLowerCase()}
          </div>
          <div className="col-span-6 md:col-span-2 md:col-start-5 row-span-3 flex items-center justify-center">
            <div className="mask mask-squircle grid grid-cols-1 gap-1">
              <Image
                  src={urlFor(profile.profileImage.imageData).quality(100).size(400,400).fit('min').url().toString()}
                  alt={profile.profileImage.caption}
                  title={profile.profileImage.caption}
                  width={350}
                  height={350}
                  priority={false}
                />
                {typeof profile.profileImage.attribution === 'undefined' ? ``: ( <span className="-mt-8 w-auto truncate px-1 text-center text-sm backdrop-blur-md" title={profile.profileImage.attribution}>{profile.profileImage.attribution}</span> )}
            </div>
          </div>
          <div className="col-span-6 p-2 text-justify text-base md:text-lg font-extralight md:col-span-4">
            <PortableText value={profile.summary}/>
          </div>
        </div>
      </section>
    </main>
  )
}
