import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  fileUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
     blob: { maxFileSize: "4MB",maxFileCount: 1,},
    video: { maxFileSize: "8MB", maxFileCount: 1 }
  })
    .onUploadComplete(async ({ file }) => {
      console.log(" Upload complete");
      console.log(" File URL:", file.url);
      return { uploadedBy: "anon", url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
