import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { db } from "../../firebaseConfig";
import { LiaVideoSolid } from "react-icons/lia";
import { IoImagesOutline, IoDocumentSharp } from "react-icons/io5";
import { FaExclamationCircle } from "react-icons/fa";

function StorageInfo() {
  const { data: session } = useSession();
  const [fileList, setFileList] = useState([]);
  const [totalSizeUsed, setTotalSizeUsed] = useState("0");
  const [imageStats, setImageStats] = useState({ count: 0, size: 0 });
  const [videoStats, setVideoStats] = useState({ count: 0, size: 0 });
  const [docStats, setDocStats] = useState({ count: 0, size: 0 });
  const [otherStats, setOtherStats] = useState({ count: 0, size: 0 });

  const imageTypes = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
  const videoTypes = ["mp4", "mov", "avi", "mkv", "webm"];
  const docTypes = ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt"];

  const getAllFiles = async () => {
    if (!session?.user.email) return;
    const q = query(collection(db, "Files"), where("Email", "==", session.user.email));
    const querySnapshot = await getDocs(q);
    let files = [];
    let totalSize = 0;
    let imgCount = 0, imgSize = 0;
    let vidCount = 0, vidSize = 0;
    let docCount = 0, docSize = 0;
    let otherCount = 0, otherSize = 0;

    querySnapshot.forEach((docSnap) => {
      const file = docSnap.data();
      files.push(file);
      totalSize += file.size || 0;
      const ext = (file.type || "").toLowerCase();

      if (imageTypes.includes(ext)) {
        imgCount++; imgSize += file.size || 0;
      } else if (videoTypes.includes(ext)) {
        vidCount++; vidSize += file.size || 0;
      } else if (docTypes.includes(ext)) {
        docCount++; docSize += file.size || 0;
      } else {
        otherCount++; otherSize += file.size || 0;
      }
    });

    setFileList(files);
    setTotalSizeUsed((totalSize / 1024 ** 2).toFixed(2) + " MB");
    setImageStats({ count: imgCount, size: imgSize });
    setVideoStats({ count: vidCount, size: vidSize });
    setDocStats({ count: docCount, size: docSize });
    setOtherStats({ count: otherCount, size: otherSize });
  };

  useEffect(() => {
    getAllFiles();
    // eslint-disable-next-line
  }, [session?.user.email, fileList]);

  return (
    <div className='mt-7'>
      <h2 className="text-2xl mb-5 font-medium">Storage</h2>
      <h2 className="text-[22px] font-medium">
        {totalSizeUsed}{" "}
        <span className="text-[14px] font-medium"> used of {"  "} </span>{"   "} 1 GB
      </h2>
      <div className='w-full bg-gray-200  h-2.5 flex rounded-xl mb-4'>
        {/* You can make the width dynamic based on usage if you want */}
        <div className='bg-blue-600 h-2.5' style={{ width: `${imageStats.size / (1024 *1024*1024) * 100}%`, minWidth: 2 }}></div>
        <div className='bg-green-600 h-2.5' style={{ width: `${videoStats.size / (1024 *1024*1024) * 100}%`, minWidth: 2 }}></div>
        <div className='bg-yellow-400 h-2.5' style={{ width: `${docStats.size / (1024 *1024*1024) * 100}%`, minWidth: 2 }}></div>
        <div className='bg-gray-400 h-2.5' style={{ width: `${otherStats.size / (1024 *1024*1024) * 100}%`, minWidth: 2 }}></div>
      </div>
      <div className="grid grid-rows-4 w-full">
        <div className="flex flex-row justify-between mt-5 hover:bg-gray-100 p-2 rounded-lg">
          <div className="flex gap-2">
            <IoImagesOutline size={25} />
            <div>
              <h2 className="text-[14px] font-medium">Images</h2>
              <h2 className="text-[13px] text-center font-medium">{imageStats.count} files</h2>
            </div>
          </div>
          <h2>{(imageStats.size / 1024 ** 2).toFixed(2)} MB</h2>
        </div>
        <div className="flex flex-row justify-between mt-5 hover:bg-gray-100 p-2 rounded-lg">
          <div className="flex gap-2">
            <LiaVideoSolid size={25} />
            <div>
              <h2 className="text-[14px] font-medium">Videos</h2>
              <h2 className="text-[13px] text-center font-medium">{videoStats.count} files</h2>
            </div>
          </div>
          <h2>{(videoStats.size / 1024 ** 2).toFixed(2)} MB</h2>
        </div>
        <div className="flex flex-row justify-between mt-5 hover:bg-gray-100 p-2 rounded-lg">
          <div className="flex gap-2">
            <IoDocumentSharp size={25} />
            <div>
              <h2 className="text-[14px] font-medium">Documents</h2>
              <h2 className="text-[13px] text-center font-medium">{docStats.count} files</h2>
            </div>
          </div>
          <h2>{(docStats.size / 1024 ** 2).toFixed(2)} MB</h2>
        </div>
        <div className="flex flex-row justify-between mt-5 hover:bg-gray-100 p-2 rounded-lg">
          <div className="flex gap-2">
            <FaExclamationCircle size={25} />
            <div>
              <h2 className="text-[14px] font-medium">Others</h2>
              <h2 className="text-[13px] text-center font-medium">{otherStats.count} files</h2>
            </div>
          </div>
          <h2>{(otherStats.size / 1024 ** 2).toFixed(2)} MB</h2>
        </div>
      </div>
    </div>
  );
}

export default StorageInfo;