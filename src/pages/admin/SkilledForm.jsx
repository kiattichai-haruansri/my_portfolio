import { useState } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import Link from "next/link";


import { db, storage } from "@/confic/firebase";

export default function UploadForm() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
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

    const storageRef = ref(storage, `skilled_icon/${file.name}`);
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
          addDoc(collection(db, "Skilled"), {
            title,
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

  const [titleD, setTitleD] = useState("");

  const handleSubmitDelete = async (e) => {
    e.preventDefault();
    const skilledRef = collection(db, "Skilled");
    const querySnapshot = await getDocs(query(skilledRef, where("title", "==", titleD)));
    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      console.log("Delete Success")
      setTitleD("");
    }
  };

  return (
    <div>
      <div className="p-8 rounded-md">
        <div className="text-3xl">Add Skilled Data</div>
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
            <label htmlFor="file" className="block text-gray-700 font-bold mb-2">
              File
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
        </form>
      </div>

      <div className=" p-8 rounded-md">
        <div className="text-3xl">Delete Skilled Data (Not Delete Picture in Storage)</div>
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
      <div className=" p-8 rounded-md flex flex-col lg:flex-row justify-between">
        <div className="text-3xl">The update function is not necessary. just delete and add a new one</div>

        <Link className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-fit"
          href="/admin" >Back to Admin</Link>

      </div>
    </div>
  );
}