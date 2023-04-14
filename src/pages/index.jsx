import React from 'react';
import Image from 'next/image';
import profile from '@/img/profile.jpg';
import SlideSkilled from '@/components/SlideSkilled';
import Link from 'next/link';

const IndexPage = () => {

  return (
    <div className='flex h-full lg:h-[calc(100vh_-_64px)] w-full items-center justify-center'>
      <div className='flex flex-col p-4 w-11/12  h-4/5 border border-black border-solid rounded-3xl my-6 lg:my-0'>
        <div className='flex  flex-col lg:flex-row h-2/4 w-full justify-between'>
          <div className='flex flex-col lg:flex-row'>
            <Image src={profile} className='w-auto rounded-full mr-0 lg:mr-4' />
            <div className='grid grid-col-1 md:grid-cols-2 grid-rows-10 md:grid-rows-5 h-full w-full my-5 lg:my-0'>
              <div className='flex justify-center col-span-1 md:col-span-2 text-lg md:text-3xl'>About Me</div>
              {[
                ['Name', 'Kiattichai Haruansri'],
                ['Nickname', 'Gad'],
                ['Ages', '17'],
                ['Birthday', '24/07/2006'],
                ['School', 'Sammuk Christian Academy'],
                ['Study plan', 'Science-Mathematics'],
                ['Study level', 'Secondary 5'],
                ['GPA', '...'],
              ].map(([title, content]) => (
                <div className='flex items-center text-sm md:text-lg' key={title}>{title} : {content}</div>
              ))}
            </div>
          </div>
          <div className='ml-4 h-full w-full lg:w-64'>
            <SlideSkilled />
          </div>
        </div>

        <div className='h-2/4 w-full grid grid-cols-1 md:grid-cols-3 grid-rows-3 md:grid-rows-1 place-items-center'>
          {[
            ['Works', '/works'],
            ['Certificates', '/cert'],
            ['Contact', '/contact'],
          ].map(([title, url]) => (
            <div className='flex justify-center items-center h-12 w-36 border-y border-solid border-black hover:w-48 m-10 md:m-0' key={title}>
              <Link href={url}>
                <div className='relative after:opacity-0 hover:after:opacity-100 before:opacity-0 hover:before:opacity-100 before:left-0 before:text-black before:content-[">>"] after:right-0 after:text-black after:content-["<<"] '>
                  <span className='p-3 hover:p-0 text-lg hover:text-2xl'>{title}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
};

export default IndexPage;