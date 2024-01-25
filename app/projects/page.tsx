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
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                {projects && projects.map((project, index) => {
                        if(index % 2 !== 0) {
                            return (
                                <li key={project._id}>
                                    <div className="timeline-middle">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                    </div>
                                    <div className="timeline-start md:text-end mb-10">
                                        <time className="font-mono italic">{project.startDate} - {(project.endDate !== null? project.endDate : ongoing)}</time>
                                        <div className="text-lg font-black">{project.name}</div>
                                        <Image
                                            src={urlFor(project.representativePicture.imageData).quality(100).size(Math.round(project.representativePicture.imageData.metadata.dimensions.width/4),Math.round(project.representativePicture.imageData.metadata.dimensions.height/4)).fit('min').url().toString()}
                                            alt={project.representativePicture.caption}
                                            title={project.representativePicture.caption}
                                            width={Math.round(project.representativePicture.imageData.metadata.dimensions.width/4)}
                                            height={Math.round(project.representativePicture.imageData.metadata.dimensions.height/4)}
                                            priority={false}
                                            />
                                        <div className="text-justify"><PortableText value={project.description}/></div>
                                    </div>
                                    <hr/>
                                </li>
                            )
                        }
                        else {
                            return (
                                <li key={project._id} className='relative'>
                                    <hr />
                                    <div className="timeline-middle">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                    </div>
                                    <div className="timeline-end mb-10">
                                        <time className="font-mono italic">{project.startDate} - {(project.endDate !== null? project.endDate : ongoing)}</time>
                                    <div className="text-lg font-black">{project.name}</div>
                                    <Image
                                            src={urlFor(project.representativePicture.imageData).quality(100).size(Math.round(project.representativePicture.imageData.metadata.dimensions.width/4),Math.round(project.representativePicture.imageData.metadata.dimensions.height/4)).fit('min').url().toString()}
                                            alt={project.representativePicture.caption}
                                            title={project.representativePicture.caption}
                                            width={Math.round(project.representativePicture.imageData.metadata.dimensions.width/4)}
                                            height={Math.round(project.representativePicture.imageData.metadata.dimensions.height/4)}
                                            priority={false}
                                            />
                                    <div className="text-justify"><PortableText value={project.description}/></div>
                                    </div>
                                    <hr />
                                </li>
                            )
                        }
                    }
                )}
            </ul>
      </section>
    </main>
  )
}
