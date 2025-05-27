"use client"
import {useState,useContext,useEffect} from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Star, Home,Folder,User2, ChevronUp,  Trash2,SquarePlus } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation";
import { ParentFolderContext } from "./context/ParentFolderContext";
 import { Button } from "@/components/ui/button"
 import {CreateNewFolder} from './CreateNewFolder';
  import { Fileupload } from '../component/Fileupload';
import { signOut ,signIn ,useSession} from 'next-auth/react';
const SideNavbar = () => {
    const { data: session, status } = useSession();
  const {currentParentFolderId} = useContext(ParentFolderContext)
  const [canCreate, setCanCreate] = useState(false);
    const [active, setActive] = useState("")
  const [openFolder, setOpenFolder] = useState(false)
  const [openFile, setOpenFile] = useState(false)
  const pathname = usePathname();
  useEffect(() => {
    const found = items.find(item => item.url === pathname);
    if (found) setActive(found.title);
  }, [pathname]);

  const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "My Files",
    url: "/my-files",
    icon: Folder,
  },
  {
    title: "Starred",
    url: "/starred",
    icon: Star,
  },
  {
    title: "Trash",
    url: "/trashed",
    icon: Trash2,
  }
]
 
  return (
    <div> <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='text-2xl m-2'>FileManager</SidebarGroupLabel>
          <SidebarGroupContent>
                       <Button className='mt-5 hover:cursor-pointer w-full' onClick={()=>setOpenFile(true)}>Add New File <SquarePlus /> </Button>
                  <Button className=' mt-2 hover:cursor-pointer w-full' onClick={()=>setOpenFolder(true)}>New Folder <SquarePlus /> </Button>
                  <Fileupload openFile={openFile} setOpenFile={setOpenFile} />
           <CreateNewFolder openFolder={openFolder} setOpenFolder={setOpenFolder} />
            <SidebarMenu className='mt-5 '>
              {items.map((item) => (
                <SidebarMenuItem  className={active === item.title?"m-3 p-1 border-gray-500 border-2 rounded-2xl":" m-3 p-1 hover:shadow-2xl hover:border-gray-500 rounded-2xl hover:border-2"} key={item.title}>
                  <SidebarMenuButton onClick={()=>setActive(item.title)}  asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span className='text-[17px]'>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 />  {session ? (session.user?.name || session.user?.email) : ""}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem >
                     <button onClick={() => signOut()}>Sign out</button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
    </div>
  )
}

export default SideNavbar