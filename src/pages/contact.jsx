import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import facebook from '@/img/contact_icon/facebook.png'
import instagram from '@/img/contact_icon/instagram.png'
import line from '@/img/contact_icon/line.png'
import gmail from '@/img/contact_icon/gmail.png'
import github from '@/img/contact_icon/github.png'
import phone from '@/img/contact_icon/phone-call.png'
import home from '@/img/contact_icon/home.png'

import {
    collection,
    addDoc,
} from "firebase/firestore";
import { db } from '@/confic/firebase'

const Contact = () => {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [contact, setContact] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "Contact"), {
                Email: email,
                Name: name,
                Contact: contact,
            });
            console.log("Document successfully written!");
        } catch (error) {
            console.error("Error writing document: ", error);
        }
    };

    return (
        <div className='flex h-full lg:h-[calc(100vh_-_64px)] items-center justify-center'>
            <div className='flex flex-col p-4 w-11/12  h-4/5 border border-black border-solid rounded-3xl my-6 lg:my-0'>
                <div className='text-3xl text-center'>Contact me</div>
                <div className='flex flex-col-reverse lg:flex-row w-full h-[calc(100%_-_36px)]'>
                    <div className='flex-1 flex flex-col'>
                        <form className='flex flex-col justify-around grow h-[50vh] md:h-auto mt-2 md:mt-0' onSubmit={handleSubmit}>
                            <div className='h-1/6'>
                                <div>Your&#39;s E-mail</div>
                                <input type="emial" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} className='border-b border-black w-full p-1' />
                            </div>
                            <div className='h-1/6'>
                                <div>Your&#39;s Name</div>
                                <input type="text" placeholder="Namel" value={name} onChange={(e) => setName(e.target.value)} className='border-b border-black w-full p-1' />
                            </div>
                            <div className='grow'>
                                <div>Contact</div>
                                <textarea placeholder='Type here...' value={contact} onChange={(e) => setContact(e.target.value)} className='border border-black w-full h-5/6 rounded-lg p-1' />
                            </div>
                            <div className='flex justify-around items-center h-1/6'>
                                <div className='border border-black p-2 rounded-lg'><input type="submit" value="Submit" className='hover:underline' /></div>
                            </div>
                        </form>
                    </div>
                    <div className='flex-1 flex flex-col lg:flex-row'>
                        <div className='flex flex-col justify-between ml-0 lg:ml-2 h-full w-full md:w-2/4'>
                            {[
                                ['Facbook', "Kiattichai Haruansri", "https://web.facebook.com/profile.php?id=100045997794388", facebook],
                                ['Instagram', "Kiattichai Haruansri", "https://www.instagram.com/kiattichai_haruansri/", instagram],
                                ['Line', "ID : kiattichai_haruansri", "https://line.me/ti/p/gJSDwpB6Fk", line],
                                ['Gmail', "Kiattichai Haruansri", "mailto:gading.5457.00@gmail.com", gmail],
                                ['Github', "Kiattichai", "https://github.com/kiattichai-haruansri", github],
                                ['Phone', "080-106-7922", "tel:0801067922", phone],
                            ].map(([title, user, url, pic]) => (
                                <Link href={url} target="_blank" key={title}>
                                    <div className='flex flex-row items-center'>
                                        <div className='h-10 w-10'>
                                            <Image src={pic} alt='icon' width={40} height={40} className='object-cover' />
                                        </div>
                                        <div className='flex flex-col mx-2'>
                                            <div className='underline'>{title}</div>
                                            <div>{user}</div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className='w-full lg:w-2/4 h-full flex flex-col justify-between'>
                            <div className='flex flex-row items-center'>
                                <div className='h-10 w-10'>
                                    <Image src={home} alt='icon' width={40} height={40} className='object-cover' />
                                </div>
                                <div className='flex flex-col mx-2'>
                                    <div className='underline'>Address</div>
                                    <div>923/70ถ ถนนเอกชัย ซอย 30 ตำบลมหาชัย อำเภอเมือง จังหวัดสมุทรสาคร 740000</div>
                                </div>
                            </div>
                            <iframe src={"https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d969.6736291094072!2d100.28809582919239!3d13.554321999404728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTPCsDMzJzE1LjYiTiAxMDDCsDE3JzE5LjEiRQ!5e0!3m2!1sth!2sth!4v1681317419382!5m2!1sth!2sth"}
                                className='h-4/5 w-full'></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact