import Image from 'next/image'
import { urlFor, fetchProfile, socialLinkIcon, fetchProjects } from '@/sanity/client'
import { PortableText } from '@portabletext/react';
import { Metadata } from 'next';
import { Profile } from '@/types/Profile';
import Link from 'next/link';
import { Project } from '@/types/Project';
import { PiPlayDuotone, PiStopDuotone } from "react-icons/pi";
import { MdOutlineTopic, MdReadMore } from "react-icons/md";


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
  const lblOngoing:string = 'on-going'
  const lblReadMore:string = 'Read more'

  const mainImageHeight:number = 208 //h-52 = 208px, adjust height and width request to download smaller images
  const carouselImageWidth:number = 144 //w-12 = 48px, adjust height and width request to download smaller images but 48 is too small to be useful

  return (
    <main className="flex items-center justify-center">
      <section className="mt-20 md:mt-24 max-w-7xl p-2">
       <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
            {projects && projects.map((project, index) => {
                    return (
                        <article key={project._id} className="opacity-90 card card-compact rounded-none w-auto bg-base-200 shadow-md">
                          {project.endDate === null? <div className="absolute top-2 left-2 badge rounded-none badge-warning text-warning-content text-xs tracking-tight uppercase">{lblOngoing}</div> : null }
                            <figure>
                              <Image
                                      src={urlFor(project.representativePicture.imageData).quality(100).size(Math.round(mainImageHeight*project.representativePicture.imageData.metadata.dimensions.width/project.representativePicture.imageData.metadata.dimensions.height),mainImageHeight).fit('min').url().toString()}
                                      alt={project.representativePicture.caption}
                                      title={project.representativePicture.caption}
                                      width={Math.round(mainImageHeight*project.representativePicture.imageData.metadata.dimensions.width/project.representativePicture.imageData.metadata.dimensions.height)}
                                      height={mainImageHeight}
                                      className="object-cover w-auto h-52" 
                                      priority={false}
                                      />
                            </figure>
                            {project.otherPictures !== null? <div className="carousel carousel-center max-w-md p-1 space-x-1 justify-center">{project.otherPictures.map((picture, index) => {
                              return (picture !== null? <Image
                                      key={picture._id}
                                      src={urlFor(picture.imageData).quality(100).size(carouselImageWidth,Math.round(carouselImageWidth * picture.imageData.metadata.dimensions.height/picture.imageData.metadata.dimensions.width)).fit('min').url().toString()}
                                      alt={picture.caption}
                                      title={picture.caption}
                                      width={carouselImageWidth}
                                      height={Math.round(carouselImageWidth * picture.imageData.metadata.dimensions.height/picture.imageData.metadata.dimensions.width)}
                                      className="carousel-item object-cover w-12 h-auto"
                                      priority={false}
                                      /> : null
                              )
                            })}</div> : null}
                            <div className="card-body">
                                <h3 className="card-title">{project.name}</h3>
                                <div className="flex flex-wrap items-center justify-between my-1">
                                <Link className="btn btn-xs rounded-none btn-outline uppercase tracking-tight" href="#" aria-label={lblReadMore} title={lblReadMore}>{lblReadMore}</Link>
                                {project.startDate !== null? <span className="flex items-center justify-start text-xs tracking-tight uppercase"><PiPlayDuotone/>&nbsp;{project.startDate}</span> : null }
                                {project.endDate !== null? <span className="flex items-center justify-start text-xs tracking-tight uppercase"><PiStopDuotone/>&nbsp;{project.endDate}</span> : null }
                                </div>
                                <div className="line-clamp-6">
                                  <PortableText value={project.description}/>
                                </div>
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
