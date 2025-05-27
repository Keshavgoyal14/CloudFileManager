'use client'
import { createContext } from 'react';

export interface ParentFolderContextType {
  parentFolderId: string | undefined;
  setparentFolderId: (id: string | undefined) => void;
}

export const ParentFolderContext = createContext<ParentFolderContextType | null>(null);
