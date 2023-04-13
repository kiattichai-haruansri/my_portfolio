import { useState } from "react";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import {
    collection,
    addDoc,
} from "firebase/firestore";


import { db, storage } from "@/confic/firebase";
import Link from "next/link";

export default function UploadForm() {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [content, setContent] = useState("");
    const [project_url, setProject_url] = useState("")
    const [code_url, setCode_url] = useState("");
    const [progress, setProgress] = useState(0);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (file === null) {
            console.log("No file selected");
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
                    addDoc(collection(db, "Projects"), {
                        title: title,
                        content: content,
                        project_url: project_url,
                        code_url: code_url,
                        pic_url: url,
                    })
                        .then(() => {
                            console.log("Document successfully written!");
                        })
                        .catch((error) => {
                            console.error("Error writing document: ", error);
                        });
                });
            }
        );
    };

    return (
        <div>
            <div className="p-8 rounded-md">
                <div className="text-3xl">Add Project Data</div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border rounded-md p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
                            Content
                        </label>
                        <textarea
                            type="text"
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full h-[25vh] border rounded-md p-2"
                        />
                    </div>
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
                    <div className="mb-4">
                        <label htmlFor="file" className="block text-gray-700 font-bold mb-2">
                            Picture
                        </label>
                        <input type="file" name="file" onChange={handleFileChange} className="mb-2" />
                        {progress > 0 && progress < 100 && (
                            <div className="bg-blue-200 rounded-full w-full h-2">
                                <div className="bg-blue-500 rounded-full h-2" style={{ width: `${progress}%` }}></div>
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                    <Link className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mx-5" href={"/admin/WorksForm"}>Back to works Admin</Link>
                </form>
            </div>
        </div>
    );
}