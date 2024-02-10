import Image from 'next/image'
import { urlFor, fetchProfile, socialLinkIcon } from '@/sanity/client'
import { PortableText } from '@portabletext/react';
import { Metadata } from 'next';
import { Profile } from '@/types/Profile';
import Link from 'next/link';
import { HiEllipsisVertical } from "react-icons/hi2";


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
  const profileImageWidth:number = 400

  return (
    <main className="flex flex-col flex-wrap items-center justify-evenly">
      <div>
        <section className="mt-20 md:mt-24 max-w-7xl p-2">
          <div id={profile._id} className="grid grid-cols-6 gap-1">
            <div className="bg-gradient-to-r from-info via-accent to-error bg-clip-text text-transparent col-span-6 md:col-span-4 md:row-span-2 p-2 text-start break-words text-4xl font-black md:text-5xl">
              {profile.headline.toLowerCase()}
            </div>
            <div className="col-span-6 md:col-span-2 md:col-start-5 row-span-3 flex items-center justify-center">
              <div className="mask mask-squircle grid grid-cols-1 gap-1">
                <Image
                    src={urlFor(profile.profileImage.imageData).quality(100).size(profileImageWidth,Math.round(profileImageWidth * profile.profileImage.imageData.metadata.dimensions.height/profile.profileImage.imageData.metadata.dimensions.width)).fit('min').url().toString()}
                    alt={profile.profileImage.caption}
                    title={profile.profileImage.caption}
                    width={profileImageWidth}
                    height={Math.round(profileImageWidth * profile.profileImage.imageData.metadata.dimensions.height/profile.profileImage.imageData.metadata.dimensions.width)}
                    priority={false}
                  />
                  {typeof profile.profileImage.attribution === 'undefined' ? null: ( <span className="-mt-8 w-auto truncate px-1 text-center text-sm backdrop-blur-md" title={profile.profileImage.attribution}>{profile.profileImage.attribution}</span> )}
              </div>
            </div>
            <div className="col-span-6 p-2 text-justify text-base md:text-lg font-extralight md:col-span-4">
              <PortableText value={profile.summary}/>
            </div>
          </div>
        </section>
        <section className="max-w-4xl p-2">
          <div className="text-2xl font-semibold my-8">Work experience</div>
          <div className="flex flex-col gap-y-12 pb-12 items-start justify-start">
            {profile.experience && profile.experience.map((item, index) => {
              let startDate = new Date(item.startDate)
              let endDate = new Date(item.endDate)
              return (
                <div key={item._id} className="flex items-start gap-x-4 relative before:absolute before:bottom-0 before:top-20 before:left-9 before:w-[1px] before:h-[calc(100%-2.5rem)] before:bg-neutral">
                  <div className="min-h-20 min-w-20 text-center text-lg rounded-md overflow-clip bg-secondary flex flex-col items-center justify-center">
                    {startDate.getFullYear()}
                    <HiEllipsisVertical/>
                    {(typeof item.endDate !=='undefined'? endDate.getFullYear() : null)}
                  </div>
                  <div className="flex flex-col items-start">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <h3 className="text-base italic">{item.title}</h3>
                    <div className="w-full pt-6 text-justify text-base font-extralight">
                      <PortableText value={item.description}/>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
        <section className="max-w-4xl p-2">
          <div className="text-2xl font-semibold my-8">Education</div>
          <div className="flex flex-col gap-y-12 pb-12 items-start justify-start">
            {profile.education && profile.education.map((item, index) => {
              let startDate = new Date(item.startDate)
              let endDate = new Date(item.endDate)
              return (
                <div key={item._id} className="flex items-start gap-x-4 relative before:absolute before:bottom-0 before:top-20 before:left-9 before:w-[1px] before:h-[calc(100%-2.5rem)] before:bg-neutral">
                  <div className="min-h-20 min-w-20 text-center text-lg rounded-md overflow-clip bg-secondary flex flex-col items-center justify-center">
                    {startDate.getFullYear()}
                    <HiEllipsisVertical/>
                    {(typeof item.endDate !=='undefined'? endDate.getFullYear() : null)}
                  </div>
                  <div className="flex flex-col items-start">
                    <h2 className="text-lg font-semibold">{item.institution}</h2>
                    <h3 className="text-base italic">{item.degree}:&nbsp;{item.fieldOfStudy}</h3>
                    <div className="w-full pt-6 text-justify text-base font-extralight">
                      <PortableText value={item.summary}/>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </main>
  )
}
