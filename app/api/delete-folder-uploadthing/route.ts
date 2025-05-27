import { collection, query, where, getDocs,doc, deleteDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
import { db } from "../../../firebaseConfig";
const utapi = new UTApi();
async function deleteFolderTree(userEmail,folderId) {
  try {
    // Delete all files in this folder
    const filesQ = query(
      collection(db, "Files"),
      where("Email", "==", userEmail),
      where("parentFolderId", "==", folderId)
    );
    const filesSnap = await getDocs(filesQ);

    // Extract UploadThing file keys (if available)
    const uploadThingKeys = filesSnap.docs
      .map(doc => doc.data().key)
      .filter(Boolean); // skip undefined/null

    // Delete files from UploadThing
    if (uploadThingKeys.length > 0) {
      await utapi.deleteFiles(uploadThingKeys);
    }

    // Delete files from Firestore
    const fileDeletePromises = filesSnap.docs.map((fileDoc) =>
      deleteDoc(doc(db, "Files", fileDoc.id))
    );

    // Find all subfolders
    const foldersQ = query(
      collection(db, "Folders"),
      where("email", "==", userEmail),
      where("parentFolderID", "==", folderId)
    );
    const foldersSnap = await getDocs(foldersQ);

    // Recursively delete all subfolders
    const subfolderDeletePromises = foldersSnap.docs.map((folderDoc) =>
      deleteFolderTree( userEmail,folderDoc.id)
    );

    // Delete this folder
    const thisFolderDelete = deleteDoc(doc(db, "Folders", folderId));

    // Wait for all deletions to finish
    await Promise.all([
      ...fileDeletePromises,
      ...subfolderDeletePromises,
      thisFolderDelete,
    ]);

  } catch (error) {
    console.error("Error deleting folder tree:", error);
    throw error;
  }
}
export async function POST(req: Request) {
  const{userEmail,folderId}= await req.json();
   if (!userEmail || !folderId) {
    return new Response(JSON.stringify({ error: "Missing userEmail or folderId" }), { status: 400 });
  }
  await deleteFolderTree(userEmail, folderId);
  return NextResponse.json({ success: true });
}