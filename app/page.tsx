"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Searchbar from "../component/Searchbar"
import FolderList from "../component/FolderList"
import FileList from "../component/fileList"
import { useState } from "react";
export default function Home() {
  const { data: session,status} = useSession();
  const [search, setSearch] = useState("");
const router = useRouter();

 return (
  <div>
    <Searchbar setsearch={setSearch}/>
    <FolderList search={search}/>
    <FileList search={search}/>
  </div>
 )
  
}
