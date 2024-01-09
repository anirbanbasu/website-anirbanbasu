import Image from 'next/image'
import { urlFor, getProfileSummary } from '@/sanity/client'
import { PortableText } from '@portabletext/react';
import { ProfileSummary } from '@/types/ProfileSummary';

export default async function Home() {
  const profile:ProfileSummary = await getProfileSummary('2a886ccf-baf9-4c46-99cc-f7028d6a230b');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <b>{profile.name}</b>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <code>{profile.tagLine}</code>
        </div>
      </div>

      <div className="relative flex place-items-left">
        <p className="m-0 p-8 max-w-[70ch] text-sm text-justify opacity-50">
          <PortableText value={profile.summary} />
        </p>
        <Image
            className="relative"
            src={urlFor(profile.profileImage.imageData).fit('max').url().toString()}
            alt={profile.profileImage.altText}
            width={profile.profileImage.imageData.metadata.dimensions.width/3}
            height={profile.profileImage.imageData.metadata.dimensions.height/3}
            priority
          />
      </div>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-5 lg:text-left">
      {
        profile.keywords && profile.keywords.map((keyword, index) => (
          <h2 key={index} className="mb-3 text-2xl font-light">
            <div className="flex flex-wrap justify-center">
              <p className="text-sm opacity-50">{keyword}</p>
            </div>
          </h2>
        ))
      }
      </div>
    </main>
  )
}
