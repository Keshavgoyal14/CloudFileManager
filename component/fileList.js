import { useEffect, useState } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSession } from 'next-auth/react';
import Fileitem from "./Fileitem";
import { ParentFolderContext } from './context/ParentFolderContext';
import { db } from '../firebaseConfig';
import { useContext } from 'react';
function FileList({search}) {
  const { data: session } = useSession();
  const {parentFolderId, setparentFolderId}=useContext(ParentFolderContext)
const [loading, setLoading] = useState(false);
const [files, setFiles] = useState([]);
   
const handleFetchFiles=async()=>{
    setLoading(true);
    setFiles([]);
    if(session?.user.email){
const q = query(collection(db, "Files"), where("Email", "==", session?.user.email),where("parentFolderId", "==", 0));

const querySnapshot =await getDocs(q);
console.log("file",querySnapshot);
querySnapshot.forEach((doc) => {
 setFiles((prev) => [...prev, { id: doc.id, ...doc.data() }]);
});}
setLoading(false);
}
useEffect(()=>{
    setparentFolderId(0);
    handleFetchFiles();
},[session])
 const filteredFiles = files.filter(file =>
    file.Filename.toLowerCase().includes(search.toLowerCase())
  );

  return (
     <div className='m-5 p-5 shadow-xl'>  
     {loading ? (
        <div className="flex justify-center items-center h-32">
          <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></span>
          <span className="ml-2 text-black">Loading files...</span>
        </div>
      ) : files.length === 0 ? (
        <div className="text-center text-gray-400 py-10">No files found.</div>
      ) : (
        <Fileitem files={filteredFiles} setFiles={setFiles} />
      )}</div>
    )
}

export default FileList