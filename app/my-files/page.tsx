"use client";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Searchbar from "../../component/Searchbar";
import Fileitem from "../../component/Fileitem";
import { db } from "../../firebaseConfig";

type FileType = {
  id: string;
  [key: string]: any;
};

export default function MyFiles() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState<Array<FileType>>([]);
const [search,setsearch]=useState("")
  const fetchFiles = async () => {
    setLoading(true);
    setFiles([]);
    if (session?.user?.email) {
      const q = query(
        collection(db, "Files"),
        where("Email", "==", session.user.email),
        where("trashed", "==", false)
      );
      const querySnapshot = await getDocs(q);
      const userFiles: FileType[] = [];
      querySnapshot.forEach((doc) => {
        userFiles.push({ id: doc.id, ...doc.data() });
      });
      setFiles(userFiles);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFiles();
  }, [session]);

const filterfiles =files.filter(file=>file.Filename.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="m-5 p-5 shadow-xl">
      <Searchbar setsearch={setsearch}/>
      <h2 className="text-gray-600 text-xl fond-bold mb-4">My Files</h2>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></span>
          <span className="ml-2 text-black">Loading files...</span>
        </div>
      ) : files.length === 0 ? (
        <div className="text-center text-gray-400 py-10">No files found.</div>
      ) : (
        <Fileitem files={filterfiles} setFiles={setFiles} isTrash={false} />
      )}
    </div>
  );
}
