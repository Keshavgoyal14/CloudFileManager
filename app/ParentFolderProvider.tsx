"use client"
import { useState } from "react"
import { ParentFolderContext } from "../component/context/ParentFolderContext";

export default function ParentFolderProvider({ children }: { children: React.ReactNode }) {
  const [parentFolderId, setparentFolderId] = useState();
   const [subFolders,setsubFolders]=useState(false)
  return (
    <ParentFolderContext.Provider value={{ parentFolderId, setparentFolderId ,subFolders,setsubFolders}}>
      {children}
    </ParentFolderContext.Provider>
  );
}