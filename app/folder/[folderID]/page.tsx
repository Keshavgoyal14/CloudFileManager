"use client"
import Searchbar from '@/component/Searchbar';
import { useParams, useSearchParams } from 'next/navigation'
import { useState, useContext, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { db } from "../../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import FolderItem from '../../../component/FolderItem';
import { ParentFolderContext } from '../../../component/context/ParentFolderContext';
import Fileitem from "../../../component/Fileitem";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type FolderType = {
  id: string;
  name: string;
};

type FileType = {
  id: string;
  Filename: string;
};

function FolderId() {
  const router =useRouter()
    const { folderID } = useParams();
   const [files, setFiles] = useState<FileType[]>([]);
  const [isfolders, setFolders] = useState<FolderType[]>([]);
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const context = useContext(ParentFolderContext);

if (!context) {
  throw new Error("useContext must be used within a ParentFolderProvider");
}

const { setparentFolderId } = context;
    const foldername = searchParams.get('folder');
    const handleFetchFolders = async () => {
       
        setFolders([]);
        if (session?.user?.email) {
            const q = query(collection(db, "Folders"),
                where("email", "==", session?.user.email),
                where("parentFolderID", "==", folderID));

            const querySnapshot = await getDocs(q);
        
            console.log(querySnapshot)
       querySnapshot.forEach((doc) => {
  const data = doc.data() as FolderType;
  setFolders((prev) => [...prev, { ...data, id: doc.id }]);
});
        }
    }
    useEffect(() => {
        handleFetchFolders();
    }, [session])

  useEffect(() => {
  if (typeof folderID === "string") {
    setparentFolderId(folderID);
  } else {
    setparentFolderId(undefined);
  }
}, [folderID]);

    const handleFetchFiles = async () => {
     
        setFiles([]);
        if (session?.user?.email) {
            const q = query(collection(db, "Files"), where("Email", "==", session?.user.email), where("parentFolderId", "==", folderID));

            const querySnapshot = await getDocs(q);
            console.log("file", querySnapshot);
            querySnapshot.forEach((doc) => {
  const data = doc.data() as FileType;
  setFiles((prev) => [...prev, { ...data, id: doc.id }]);
});
        }
       
    }
    useEffect(() => {
         if (typeof folderID === "string") {
    setparentFolderId(folderID);
  } else {
    setparentFolderId(undefined);
  }
        handleFetchFiles();
    }, [session])

const handleDelete=async()=>{
if(!session?.user?.email) return;
await fetch("/api/delete-folder-uploadthing", {
  method:"POST",
  body:JSON.stringify({userEmail:session?.user?.email,folderId:folderID}),
  headers:{
    "Content-Type":"application/json"
  }
}

)
toast.success("Folder Deleted Sucessfully")
router.back();
}
    return (
        <div>
            <Searchbar />
            <div className='m-5 flex justify-between'>
                <h2 className='text-2xl font-medium'>{foldername}</h2>
                <button onClick={()=>handleDelete()} className='text-red-500 mr-3'><FaRegTrashAlt size={18}/></button></div>
            <div className="flex flex-col m-5 shadow-xl">
                <div className='flex flex-row justify-between m-5'><h2>Recent Folders</h2>
                    <h2 className='text-sm text-blue-400 hover:underline'>View All</h2></div>
                <div className='grid grid-cols-1 sm:grid-cols-2 l md:grid-cols-4 gap-2'>{isfolders?.map((item) => {
                    return (
                        <FolderItem key={item.id} item={item} />
                    )
                })}</div>
            </div>
               <Fileitem files ={files}/>
        </div>)
}

export default FolderId
