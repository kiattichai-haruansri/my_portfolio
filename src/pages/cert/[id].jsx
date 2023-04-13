import { useRouter } from 'next/router';
import { getCertById } from '@/pages/api/getCert';
import React, { useState, useEffect } from 'react'
import Link from 'next/link';

const Cert = () => {
  const router = useRouter();
  const { id } = router.query;

  const [certData, setCertData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const cert = await getCertById(id);
      setCertData(cert);
    }

    fetchData();
  }, [id]);

  if (!certData) {
    return <p>Loading...</p>;
  }

  const item = certData;

  return (
    <div className='flex h-full lg:h-[calc(100vh_-_64px)] w-full items-center justify-center'>
      <div className='flex flex-col p-4 w-11/12  h-4/5 border border-black border-solid rounded-3xl my-6 lg:my-0'>
        <h1 className='text-2xl md:text-2xl text-center mb-5 md:mb-0 p-1'>Certificate name : {item.title}</h1>
        <div className='flex flex-col lg:flex-row h-[calc(100%_-_36px)] w-full'>
          <img src={item.pic_url} alt='projectpic' className='object-contain h-full w-full rounded-xl' />
          <div className='p-5 text-base h-full w-full flex flex-col'>
            <div className='h-full w-full overflow-scroll'>{item.content}</div>
            <div className='flex justify-around my-3'>
              <Link href={item.pic_url} target='_blank' className='text-xs md:text-base border border-black p-2 rounded-lg h-fit w-fit'>See full picture</Link>
              <Link href={'/cert'} className='text-xs md:text-base border border-black p-2 rounded-lg h-fit w-fit'>Back to certificates</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cert;