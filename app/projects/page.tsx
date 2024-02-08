import Image from 'next/image'
import { urlFor, fetchProfile, socialLinkIcon, fetchProjects } from '@/sanity/client'
import { PortableText } from '@portabletext/react';
import { Metadata } from 'next';
import { Profile } from '@/types/Profile';
import Link from 'next/link';
import { Project } from '@/types/Project';
import { HiHashtag } from "react-icons/hi2";
import { PiPlayDuotone, PiStopDuotone } from "react-icons/pi";




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
  const ongoing:string = 'on-going'

  return (
    <main className="flex items-center justify-center">
      <section className="mt-20 md:mt-24 max-w-7xl p-2">
       <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
            {projects && projects.map((project, index) => {
                    return (
                        <article key={project._id} className="card card-compact rounded-none w-auto bg-base-200 shadow-md">
                          {project.endDate === null? <div className="absolute m-2 badge rounded-none badge-warning text-warning-content text-xs tracking-tight uppercase">{ongoing}</div> : null }
                            <figure>
                              <Image
                                      src={urlFor(project.representativePicture.imageData).quality(100).size(Math.round(project.representativePicture.imageData.metadata.dimensions.width/4),Math.round(project.representativePicture.imageData.metadata.dimensions.height/4)).fit('min').url().toString()}
                                      alt={project.representativePicture.caption}
                                      title={project.representativePicture.caption}
                                      width={Math.round(project.representativePicture.imageData.metadata.dimensions.width/4)}
                                      height={Math.round(project.representativePicture.imageData.metadata.dimensions.height/4)}
                                      className="object-cover w-auto h-52"
                                      priority={false}
                                      />
                            </figure>
                            {project.otherPictures !== null? <div className="carousel carousel-center max-w-md p-1 space-x-1 justify-center">{project.otherPictures.map((picture, index) => {
                              return (picture !== null? <Image
                                      key={picture._id}
                                      src={urlFor(picture.imageData).quality(100).size(Math.round(picture.imageData.metadata.dimensions.width/4),Math.round(picture.imageData.metadata.dimensions.height/4)).fit('min').url().toString()}
                                      alt={picture.caption}
                                      title={picture.caption}
                                      width={Math.round(picture.imageData.metadata.dimensions.width/4)}
                                      height={Math.round(picture.imageData.metadata.dimensions.height/4)}
                                      className="carousel-item object-cover w-12 h-auto"
                                      priority={false}
                                      /> : ""
                              )
                            })}</div> : ""}
                            <div className="card-body">
                                <h3 className="card-title">{project.name}</h3>
                                <div className="flex flex-wrap items-center justify-between">
                                  {project.startDate !== null? <span className="flex items-center justify-start text-xs tracking-tight uppercase text-success"><PiPlayDuotone/>&nbsp;{project.startDate}</span> : null }
                                  {project.endDate !== null? <span className="flex items-center justify-start text-xs tracking-tight uppercase text-error"><PiStopDuotone/>&nbsp;{project.endDate}</span> : null }
                                </div>
                                <div className="line-clamp-5"><PortableText value={project.description}/></div>
                                <div className="flex flex-wrap items-center justify-between">
                                  <Link className="btn btn-xs btn-outline rounded-none btn-neutral" href="#">Read more</Link>
                                  <Link className="btn btn-xs btn-outline rounded-none btn-neutral" href="#">Project website</Link>
                                </div>
                                <div className="badge rounded-none badge-accent"><HiHashtag/></div>
                                {project.keywords !== null? <ul className="flex flex-wrap items-center justify-start gap-1 text-xs tracking-tight lowercase">{project.keywords.map((keyword, index) => {
                                    return (
                                        <li key={index} className="border-b-[1px] p-1">{keyword}</li>
                                    )
                                })}
                                </ul> : ""}
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
