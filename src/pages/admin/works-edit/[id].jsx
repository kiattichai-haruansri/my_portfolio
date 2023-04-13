import { useRouter } from 'next/router';
import { getProjectById } from '@/pages/api/getWorks';
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from '@/confic/firebase'
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";

const Work = () => {
    const router = useRouter();
    const { id } = router.query;

    const [workData, setWorkData] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [project_url, setProject_url] = useState("")
    const [code_url, setCode_url] = useState("");
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);

    const workRef = doc(db, "Projects", id);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    useEffect(() => {
        async function fetchData() {
            const work = await getProjectById(id);
            if (work) {
                setWorkData(work);
                setTitle(work.title);
                setContent(work.content);
                setCode_url(work.code_url);
                setProject_url(work.project_url)
            }
        }

        fetchData();
    }, [id]);

    if (!workData) {
        return <p>Loading...</p>;
    }

    const item = workData;

    const handleSave = (e) => {
        e.preventDefault();
        if (file === null) {
            console.log("No file selected");
            updateDoc(workRef, {
                title: title,
                content: content,
                project_url: project_url,
                code_url: code_url,
                pic_url: item.pic_url,
            })
                .then(() => {
                    console.log("Document successfully update!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
            return;
        }

        const storageRef = ref(storage, `projects/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    updateDoc(workRef, {
                        title: title,
                        content: content,
                        project_url: project_url,
                        code_url: code_url,
                        pic_url: url,
                    })
                        .then(() => {
                            console.log("Document successfully update!");
                        })
                        .catch((error) => {
                            console.error("Error writing document: ", error);
                        });
                });
            }
        );
    };

    return (
        <div className='flex h-full xl:h-[calc(100vh_-_64px)] w-full items-center justify-center'>
            <form onSubmit={handleSave} className='flex flex-col p-4 w-11/12  h-4/5 border border-black border-solid rounded-3xl my-6 lg:my-0'>
                <div className='flex justify-center'>
                    <h1 className='text-2xl md:text-2xl text-center mb-5 md:mb-0 p-1'>Project name : </h1>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-fit border rounded-md p-2"
                    />
                </div>
                <div className='flex flex-col xl:flex-row h-[calc(100%_-_36px)] w-full'>
                    <img src={item.pic_url} alt='projectpic' className='object-contain h-full w-full rounded-xl' />
                    <div className='p-5 text-base h-full w-full flex flex-col'>
                        <textarea
                            type="text"
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full h-full border rounded-md p-2"
                        />
                        <div className="mb-4">
                            <label htmlFor="project" className="block text-gray-700 font-bold mb-2">
                                Project Link
                            </label>
                            <input
                                type="text"
                                name="project"
                                value={project_url}
                                onChange={(e) => setProject_url(e.target.value)}
                                className="w-full border rounded-md p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="code" className="block text-gray-700 font-bold mb-2">
                                Source Code Link
                            </label>
                            <input
                                type="text"
                                name="code"
                                value={code_url}
                                onChange={(e) => setCode_url(e.target.value)}
                                className="w-full border rounded-md p-2"
                            />
                        </div>
                        <div className='flex justify-around my-3'>
                            <Link href={item.pic_url} target='_blank' className='text-xs md:text-base border border-black p-2 rounded-lg h-fit w-fit'>See full picture</Link>
                            <Link href={'/admin/WorksForm'} className='text-xs md:text-base border border-black p-2 rounded-lg h-fit w-fit'>Back to work Admin</Link>
                        </div>
                        <div className='flex justify-between'>
                            <label htmlFor="file" className="block text-gray-700 font-bold mb-2">
                                Choose new pictuer
                            </label>
                            <input type="file" name="file" onChange={handleFileChange} className="mb-2" />
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
                            >Save</button>
                        </div>
                    </div>
                </div>
                {progress > 0 && progress < 100 && (
                    <div className="bg-blue-200 rounded-full w-full h-2">
                        <div className="bg-blue-500 rounded-full h-2" style={{ width: `${progress}%` }}></div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Work;