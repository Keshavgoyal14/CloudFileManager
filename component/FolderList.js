import{ useEffect, useState } from 'react'
import FolderItem from './FolderItem'
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSession } from 'next-auth/react';
import { ParentFolderContext } from './context/ParentFolderContext';
import { db } from '../firebaseConfig';
import { useContext } from 'react';
function FolderList({search}) {
const [isfolders,setFolders]=useState([])
const {parentFolderId, setparentFolderId}=useContext(ParentFolderContext)
const [loading, setLoading] = useState(false);
const {data:session}=useSession();
const handleFetchFolders=async()=>{
    setLoading(true);
    setFolders([]);
    if(session?.user.email){
const q = query(collection(db, "Folders"), where("email", "==", session?.user.email),where("parentFolderID", "==", 0));

const querySnapshot =await getDocs(q);
querySnapshot.forEach((doc) => {
 setFolders((prev) => [...prev, { id: doc.id, ...doc.data() }]);
});}
setLoading(false);
}
useEffect(()=>{
    setparentFolderId(0);
    handleFetchFolders();
},[session])
const filteredFolders = isfolders.filter(folders =>
    folders.folder.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="flex flex-col m-5 shadow-xl">
        <div className='flex flex-row justify-between m-5'><h2>Recent Folders</h2>
         <h2 className='text-sm text-blue-400 hover:underline'>View All</h2></div>
        <div className='grid grid-cols-1 sm:grid-cols-2 l md:grid-cols-4 gap-2'>{filteredFolders?.map((item)=>{
            return(
                <FolderItem item={item} />
            )
        })}</div>       
    </div>
  )
}

export default FolderList