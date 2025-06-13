import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BsThreeDotsVertical } from "react-icons/bs";


function Fileitem({files,setFiles,isTrash}) {

const handleMoveToTrash = async (filekey,fileId) => {
  const fileRef = doc(db, "Files", fileId);
  await updateDoc(fileRef, { trashed: true });
  setFiles(prev => prev.filter(file => file.id !== fileId)); // Remove from UI
  toast.success("File moved to Trash!");
};

 const handleStarred=async(fileId,currentStarred)=>{
  const fileRef = doc(db, "Files", fileId);
  await updateDoc(fileRef,{starred:!currentStarred})
  setFiles((prev) => prev.map((file) => {
    if (file.id === fileId) {
      return { ...file, starred: !currentStarred };
    }
    return file; 
  }));
  toast.success(!currentStarred ? "File starred!" : "File unstarred!")
}

const handleDelete=async(fileKey,docId)=>{
  const res = await fetch("/api/delete-uploadthing", {
    method: "POST",
    body: JSON.stringify({ fileKey }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (data.success) {
    await deleteDoc(doc(db, "Files", docId)); 
     setFiles(prev => prev.filter(file => file.id !== docId));
    toast.success("File deleted!");
  } else {
    toast.error("Failed to delete file");
  }
}

  return (
    <div>
        <div >
            <h2 className='text-gray-600 text-xl fond-bold mb-1.5'>Recent Files</h2>
    <Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px] ">Name</TableHead>
      <TableHead>Modified</TableHead>
      <TableHead>Size</TableHead>
      <TableHead className="text-right"> </TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {files.map((file) => {
        return(
    <TableRow >
      <TableCell onClick={()=>window.open(file.fileUrl)} className="font-medium hover:underline hover:cursor-pointer">{file.Filename}</TableCell>
      <TableCell>{file.uploadedAt}</TableCell>
      <TableCell>{(file.size/(1024*1024)).toFixed(2)+"MB"}</TableCell>
      <TableCell className="text-right"><DropdownMenu>
  <DropdownMenuTrigger className="cursor-pointer hover:bg-gray-200"><BsThreeDotsVertical /></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={()=>window.open(file.fileUrl)}>Open file</DropdownMenuItem>
    <DropdownMenuItem onClick={()=>{navigator.clipboard.writeText(file.fileUrl);
    toast.success("File URL copied to clipboard");
    }}>Copy File URL</DropdownMenuItem>
    {isTrash? (  <DropdownMenuItem onClick={()=>handleDelete(file.key,file.id)} className="text-red-500">Delete Permanently</DropdownMenuItem>
 ) :(  <>   <DropdownMenuItem onClick={()=>handleStarred(file.id,file.starred)}>{file.starred?"Unstarred":"Starred"}</DropdownMenuItem>
     <DropdownMenuItem onClick={()=>handleMoveToTrash(file.key,file.id)}>Move to Trash</DropdownMenuItem>
     <DropdownMenuItem onClick={()=>handleDelete(file.key,file.id)} className="text-red-500">Delete Permanently</DropdownMenuItem>
    </>)}   
  </DropdownMenuContent>
</DropdownMenu></TableCell>
    </TableRow>)})}
  </TableBody>
</Table>
    </div>
  
    </div>
  )
}

export default Fileitem
