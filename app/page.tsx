"use client";
import SideNavbar from "../component/SideNavbar"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { useSession, signIn, signOut } from "next-auth/react";
import Searchbar from "../component/Searchbar"
import FolderList from "../component/FolderList"
import FileList from "../component/fileList"
import { useEffect, useState } from "react";
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