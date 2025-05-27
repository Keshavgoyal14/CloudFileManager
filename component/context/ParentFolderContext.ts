'use client'
import { createContext, Dispatch, SetStateAction } from 'react';

export interface ParentFolderContextType {
  parentFolderId: string | undefined;
  setparentFolderId: Dispatch<SetStateAction<string | undefined>>;
}

export const ParentFolderContext = createContext<ParentFolderContextType | null>(null);
