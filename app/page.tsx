"use client";
import Searchbar from "../component/Searchbar"
import FolderList from "../component/FolderList"
import FileList from "../component/fileList"
import { useState } from "react";
export default function Home() {
  const [search, setSearch] = useState("");


 return (
  <div>
    <Searchbar setsearch={setSearch}/>
    <FolderList search={search}/>
    <FileList search={search}/>
  </div>
 )
  
}
