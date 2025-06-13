"use client"
import { useState } from "react"
import { ParentFolderContext, ParentFolderContextType } from "../component/context/ParentFolderContext";

export default function ParentFolderProvider({ children }: { children: React.ReactNode }) {
    const [parentFolderId, setparentFolderId] = useState<string | undefined>(undefined)
  const value: ParentFolderContextType={parentFolderId, setparentFolderId};

  return (
    <ParentFolderContext.Provider value={value}>
      {children}
    </ParentFolderContext.Provider>
  );
}
