"use client";
import { useContext } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { db } from "../firebaseConfig";
import { UploadButton } from "../app/uploadingthing";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { ParentFolderContext } from "./context/ParentFolderContext";
import { useSession } from "next-auth/react";
export const Fileupload = ({ openFile, setOpenFile }) => {
  const { data: session } = useSession();
  const { parentFolderId} = useContext(ParentFolderContext);
 const formattedDate = new Date().toLocaleString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});
  return (
    <Dialog open={openFile} onOpenChange={setOpenFile}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>
                 <UploadButton
             appearance={{
                button: "bg-blue-600 text-white px-4 py-2 rounded",
                label: "text-gray-700"
              }}
              endpoint="fileUploader"
              onClientUploadComplete={async (res) => {
                const fileInfo = res?.[0];
                if (!fileInfo || !session?.user?.email) return;

                const docID = Date.now().toString(); // Unique ID for the file

                // Store file info in Firestore
                await setDoc(doc(db, "Files", docID), {
                  Filename: fileInfo.name,
                  id: docID,
                  Email: session.user.email,
                  type: fileInfo.name.split(".").pop(),
                  size: fileInfo.size,
                  uploadedAt: formattedDate,
                  parentFolderId: parentFolderId,
                  fileUrl: fileInfo.url,
                  key:fileInfo.key,
                  starred:false,
                  trashed:false
                });

                toast.success(`Uploaded: ${fileInfo.name}`);
                setOpenFile(false);
              }}
              onUploadError={() => {
                toast.error("Upload failed");
              }}
            />
 </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
