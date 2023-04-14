import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCert } from '@/pages/api/getCert';
import {
    collection,
    query,
    where,
    getDocs,
    deleteDoc,
} from "firebase/firestore";
import { db } from "@/confic/firebase";

const Certs = () => {
    const [certItem, setcertItem] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const certData = await getCert();
            setcertItem(certData);
        }

        fetchData();
    }, []);

    const [titleD, setTitleD] = useState("");

    const handleSubmitDelete = async (e) => {
        e.preventDefault();
        const certRef = collection(db, "Cert");
        const querySnapshot = await getDocs(query(certRef, where("title", "==", titleD)));
        if (!querySnapshot.empty) {
            querySnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
            });
            console.log("Delete Success")
            setTitleD("");
        }
    };

    return (
        <>
            <div className='flex h-fit items-start md:items-center justify-center'>
                <div className='h-full w-11/12 flex flex-col mt-10  '>
                    <div className='flex flex-col'>
                        <div className='text-3xl mb-2'>Configure certificates</div>
                        <div className=" p-8 rounded-md">
                            <Link className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-fit"
                                href="/admin/cert-edit/add" >Add new certificate</Link>
                            <Link className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-fit mx-5"
                                href="/admin" >Back to Admin</Link>
                        </div>
                        <div className=" p-8 rounded-md">
                            <div className="text-3xl">Delete Cert Data (Not Delete Picture in Storage)</div>
                            <form onSubmit={handleSubmitDelete}>
                                <div className="mb-4">
                                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={titleD}
                                        onChange={(e) => setTitleD(e.target.value)}
                                        className="w-full border rounded-md p-2"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Delete
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className='w-full h-4/5 grid grid-cols-2 md:grid-cols-4 place-items-center'>
                        {certItem.map((item) => (
                            <div className='flex flex-col w-full h-full p-4 hover:p-0' key={item.id}>
                                <Link href={`/admin/cert-edit/${item.id}`} className='h-full w-full'>
                                    <img src={item.pic_url} alt='projectpic' className='object-contain h-3/5 w-full rounded-xl' />
                                    <div className='h-2/5 w-full flex flex-col items-center justify-center p-2'>
                                        <div className='flex text-sm lg:text-lg justify-center items-center h-12 w-full border-y border-solid border-black'>
                                            <div className="text-black">Edit {item.title}</div>
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