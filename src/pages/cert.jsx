import React from 'react'
import Image from 'next/image'
import Profile from '@/img/Profile.jpg'
import Link from 'next/link'

const works = () => {
  return (
    <>
      <div className='flex h-fit items-start md:items-center justify-center'>
        <div className='h-full w-11/12 flex flex-col mt-10  '>
          <div className='text-3xl mb-2'>My certificates</div>
          <div className='w-full h-4/5 grid grid-cols-2 md:grid-cols-4 place-items-center'>
            {[
              ['Certificate-test', '#'],
              ['Certificate-test', '#'],
              ['Certificate-test', '#'],
              ['Certificate-test', '#'],
              ['Certificate-test', '#'],
              ['Certificate-test', '#'],
              ['Certificate-test', '#'],
              ['Certificate-test', '#'],
              ['Certificate-test', '#'],
              ['Certificate-test', '#'],
              ['Certificate-test', '#'],
              ['Certificate-test', '#'],
            ].map(([title, url]) => (
              <div className='flex flex-col w-full h-full p-4 hover:p-0'>
                <Image src={Profile} alt='projectpic' className='object-cover h-3/5 w-full rounded-xl' />
                <div className='h-2/5 w-full flex flex-col items-center justify-center p-2'>
                  <div className='flex  text-sm lg:text-lg justify-center items-center h-12 w-full border-y border-solid border-black'>
                    <Link href={url} className="text-black">View {title}</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default works