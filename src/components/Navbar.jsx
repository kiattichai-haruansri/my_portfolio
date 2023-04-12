import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className='w-full h-fit md:h-16 border-b border-black flex flex-col md:flex-row justify-between items-center p-5'>
            <div className='text-3xl mb-5 md:mb-0' id="typing-container">Kiattichai Haruansri</div>
            <div className='grid grid-rows-1 grid-cols-4 h-full w-full md:w-3/5 place-items-stretch'>
                {[
                    ['Home', '/'],
                    ['Works', '/works'],
                    ['Certificates', '/cert'],
                    ['Contact', '/contact'],
                ].map(([title, url]) => (
                    <div className='flex flex-row h-4/6 w-9/12 justify-center items-center' key={title}>
                        <Link href={url}>
                            <div className='relative after:opacity-0 hover:after:opacity-100 before:opacity-0 hover:before:opacity-100 hover:before:animate-ping hover:after:animate-ping before:left-0 before:text-black before:content-[">>"] after:right-0 after:text-black after:content-["<<"] '>
                                <span className='p-3 hover:p-0 text-base'>{title}</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </nav>

    )
}

export default Navbar