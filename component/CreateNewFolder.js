import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import {db} from  "../firebaseConfig"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState,useContext } from "react"
import { ParentFolderContext } from "./context/ParentFolderContext"
import {useSession} from 'next-auth/react';
import { doc, setDoc } from "firebase/firestore"; 
import { toast } from "sonner"
export const CreateNewFolder=({openFolder, setOpenFolder}) => {
   const {parentFolderId, setparentFolderId,subFolders,setsubFolders}=useContext(ParentFolderContext)
    const docId =Date.now().toString();
    const {data:session}=useSession();
    const [folderName, setFolderName] = useState("");
    const handleFolder=async()=>{
        console.log(folderName);
        await setDoc(doc(db, "Folders",docId ),{
            folder:folderName,
            id:docId,
            email:session.user.email,
            parentFolderID:parentFolderId,

        })
        toast.success("Folder Created Successfully");
        setOpenFolder(false);
    }
    
  return (
    <div><Dialog open={openFolder} onOpenChange={setOpenFolder}> 
  <DialogContent >
    <DialogHeader className="gap-2">
      <DialogTitle className="mb-3">Create Folder</DialogTitle>
      <DialogDescription className="flex flex-col gap-2">
       <Input onChange={(e)=>setFolderName(e.target.value)} type="text" placeholder="Folder Name"/>
       <Button onClick={()=>handleFolder()} className="mt-2">Create</Button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
</div>
  )
}

