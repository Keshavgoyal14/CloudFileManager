'use client'
import { createContext } from 'react';

export interface ParentFolderContextType {
  parentFolderId: string | undefined;
    setparentFolderId: ()=>{};
}

export const ParentFolderContext = createContext<ParentFolderContextType | null>(null);
