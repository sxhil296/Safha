
import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// Replace this with your actual auth function
// const auth = (req: Request) => ({ id: "fakeId" });


export const ourFileRouter = {
  pdfUploader: f({
    pdf: {
      maxFileSize: "4GB",
      maxFileCount: 1,
    },
  })
    // .middleware(async ({ req }) => {
    //   const {userId} = await auth()
    //   if (!userId) throw new UploadThingError("Unauthorized");
    //   return { userId};
    // })
    .onUploadComplete(async ({ metadata, file }) => {
      // IMPORTANT: Keep this fast and return simple JSON
      return { 
        // uploadedBy: metadata.userId,
        fileUrl: file.ufsUrl
      };
    }),

  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
  // .middleware(async ({ req }) => {
  //   const {userId} = await auth()
  //   if (!userId) throw new UploadThingError("Unauthorized");
  //   return { userId};
  // })
    .onUploadComplete(async ({ metadata, file }) => {
      // IMPORTANT: Keep this fast and return simple JSON
      return { 
        // uploadedBy: metadata.userId,
        fileUrl: file.ufsUrl 
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
