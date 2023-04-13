import React from 'react'
import Link from 'next/link'

function admin() {
    return (
        <>
            <div className='flex h-[calc(100vh_-_64px)] w-full items-center justify-center'>
                <div>
                    <div className='text-5xl'>Configure</div>
                    <div className=" p-8 rounded-md m-5">
                        <Link className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-fit"
                            href="/admin/SkilledForm" >Skilled</Link>
                    </div>
                    <div className=" p-8 rounded-md m-5">
                        <Link className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-fit"
                            href="/admin/WorksForm" >Works</Link>
                    </div>
                    <div className=" p-8 rounded-md m-5">
                        <Link className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-fit"
                            href="/admin/CertForm" >Certificates</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default admin