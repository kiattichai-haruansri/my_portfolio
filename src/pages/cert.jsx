import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCert } from '@/pages/api/getCert';

const Certs = () => {
  const [certItem, setcertItem] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const certData = await getCert();
      setcertItem(certData);
    }

    fetchData();
  }, []);

  return (
    <>
      <div className='flex h-fit items-start md:items-center justify-center'>
        <div className='h-full w-11/12 flex flex-col mt-10  '>
          <div className='text-3xl mb-2'>My certificates</div>
          <div className='w-full h-4/5 grid grid-cols-2 md:grid-cols-4 place-items-center'>
            {certItem.map((item) => (
              <div className='flex flex-col w-full h-full p-4 hover:p-0' key={item.id}>
                <Link href={`/cert/${item.id}`} className='h-full w-full'>
                  <img src={item.pic_url} alt='projectpic' className='object-contain h-3/5 w-full rounded-xl' />
                  <div className='h-2/5 w-full flex flex-col items-center justify-center p-2'>
                    <div className='flex text-sm lg:text-lg justify-center items-center h-12 w-full border-y border-solid border-black'>
                      <div className="text-black">View {item.title}</div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Certs