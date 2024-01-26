import Image from 'next/image'
import { urlFor, fetchProfile, socialLinkIcon, fetchProjects } from '@/sanity/client'
import { PortableText } from '@portabletext/react';
import { Metadata } from 'next';
import { Profile } from '@/types/Profile';
import Link from 'next/link';
import { Project } from '@/types/Project';

export async function generateMetadata(): Promise<Metadata> {
  // fetch data
  const profile:Profile = await fetchProfile()
  return {
    title: profile.name.givenNames.join(' ').concat(' ', profile.name.familyName),
    description: profile.headline,
  }
}

export default async function Home() {
  const projects:Project[] = await fetchProjects()
  const ongoing:string = 'present'

  return (
    <main className="flex items-center justify-center">
      <section className="mt-20 md:mt-24 max-w-7xl p-2">
       <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
            {projects && projects.map((project, index) => {
                    return (
                        <article key={project._id} className="flex flex-col">
                            <a rel="noopener noreferrer" href={(project.webURL!==null? project.webURL : '#')} aria-label="Link to project URL">
                            <Image
                                    src={urlFor(project.representativePicture.imageData).quality(100).size(Math.round(project.representativePicture.imageData.metadata.dimensions.width/4),Math.round(project.representativePicture.imageData.metadata.dimensions.height/4)).fit('min').url().toString()}
                                    alt={project.representativePicture.caption}
                                    title={project.representativePicture.caption}
                                    width={Math.round(project.representativePicture.imageData.metadata.dimensions.width/4)}
                                    height={Math.round(project.representativePicture.imageData.metadata.dimensions.height/4)}
                                    className="object-cover w-full h-52"
                                    priority={false}
                                    />
                            </a>
                            <div className="flex flex-col flex-1 p-6">
                                <a rel="noopener noreferrer" href="#" className="text-xs tracking-tight uppercase hover:underline">{project.startDate} - {(project.endDate !== null? project.endDate : ongoing)}</a>
                                <h3 className="flex-1 py-2 text-lg font-semibold leading-tight">{project.name}</h3>
                                <div className="text-justify line-clamp-5"><PortableText value={project.description}/></div>
                            </div>
                        </article>
                    )
                }
            )}
        </div>
      </section>
    </main>
  )
}
