import Course from "../models/course.modal";
import Section from "../models/section.modal";
import Lesson from "../models/lession.modal";
import { Types } from "mongoose";
import cloudinary from "../config/cloudinary";

interface CloudinaryUploadVideoResult {
  public_id: string;
  bytes: number;
  duration?: number;
  [key: string]: any;
}

interface CloudinaryUploadFileResult {
  public_id: string;
  [key: string]: any;
}
export async function uploadFileToCloudinaryRepo(
  buffer: Buffer,
  filename: string,
  resourceType: "image" | "video" | "raw" = "image",
  folder: string = "learningPlatform"
): Promise<CloudinaryUploadFileResult> {
  console.log("repository layer file upload started");
  console.log("buffer", buffer);
  console.log("resourceType", resourceType);
  console.log("folder", folder);
  console.log("fileName", filename);

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: resourceType,
          public_id: filename,
          folder,
          upload_preset: "learning_platform", // Only if you want to use custom preset
          use_filename: true,
          overwrite: false,
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result as CloudinaryUploadFileResult);
        }
      )
      .end(buffer);
  });

  return { public_id: result.public_id } as CloudinaryUploadFileResult;
}

// export async function uploadFileToCloudinary(request: Request) {
//   try {
//     const formData = await request.formData();
//     const file = formData.get("file") as File | null;
//     if (!file) {
//       throw new Error("No file provided");
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const result = await new Promise<CloudinaryUploadFileResult>(
//       (resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           {
//             resource_type: "image",
//             public_id: file.name,
//             folder: "learningPlatform",
//           },
//           (error, result) => {
//             if (error) {
//               console.error("Cloudinary upload error:", error);
//               reject(error);
//             } else {
//               console.log("Cloudinary upload result:", result);
//               resolve(result as CloudinaryUploadFileResult);
//             }
//           }
//         );

//         uploadStream.end(buffer);
//       }
//     );

//     return result;
//   } catch (error) {
//     console.log("Upload image failed:", error);
//   }
// }

// export async function uploadVideoToCloudinary(request: Request) {
//   try {
//     const formData = await request.formData();
//     const file = formData.get("file") as File | null;
//     const title = formData.get("title") as string | null;
//     const description = formData.get("description") as string | null;
//     const originalSize = formData.get("originalSize") as string | null;

//     if (!file) {
//       throw new Error("No file provided");
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const result = await new Promise<CloudinaryUploadResult>(
//       (resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           {
//             resource_type: "video",
//             public_id: file.name,
//             folder: "video—upload",
//             transformation: [{ quality: "auto", fetch_format: "mp4" }],
//           },
//           (error, result) => {
//             if (error) {
//               console.error("Cloudinary upload error:", error);
//               reject(error);
//             } else {
//               console.log("Cloudinary upload result:", result);
//               resolve(result as CloudinaryUploadResult);
//             }
//           }
//         );

//         uploadStream.end(buffer);
//       }
//     );

//     const video = await Lesson.create({
//       data: {
//         title,
//         description,
//         publicId: result.public_id,
//         originalSize: originalSize ? parseInt(originalSize) : 0,
//         compressedSize: String(result.bytes),
//         duration: result.duration || 0,
//       },
//     });
//     return video;
//   } catch (error) {
//     console.log("Upload video failed:", error);
//   }
// }

// Standalone function for file upload
export async function uploadCourseBanner(fileBuffer: Buffer, filename: string) {
  console.log("repository layer file upload started");

  console.log({
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME
      ? process.env.CLOUDINARY_CLOUD_NAME
      : "missing",
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY
      ? process.env.CLOUDINARY_API_KEY
      : "missing",
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
      ? process.env.CLOUDINARY_API_SECRET
      : "missing",
  });

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          public_id: filename,
          folder: "learningPlatform",
          upload_preset: "learning_platform", // Only if you want to use custom preset
          overwrite: true,
        },
        (err, result) => {
          if (err) {
            console.error("Upload error:", err);
            return reject(err);
          }
          console.log("Upload result:", result);
          resolve(result);
        }
      )
      .end(fileBuffer);
  });
}

export const CourseRepository = {
  async create(data: any) {
    return await Course.create(data);
  },

  async createCourseInDb(data: {
    title: string;
    description?: string;
    thumbnail: string;
    price: number;
  }) {
    console.log("repository layer");
    const course = new Course(data);
    return await course.save();
  },

  async findByIdPopulated(courseId: string) {
    return Course.findById(courseId).populate({
      path: "sections",
      populate: { path: "lessons" },
    });
  },

  async findAllPopulated() {
    return Course.find().populate({
      path: "sections",
      populate: { path: "lessons" },
    });
  },
};

export const SectionRepository = {
  async create(data: any) {
    return await Section.create(data);
  },

  async addToCourse(courseId: string, sectionId: Types.ObjectId) {
    return Course.findByIdAndUpdate(
      courseId,
      { $push: { sections: sectionId } },
      { new: true }
    );
  },

  async findByCourseId(courseId: string) {
    return Section.find({ course: courseId });
  },
};

export const LessonRepository = {
  async create(data: any) {
    try {
    } catch (error) {
      sendError();
    }
    return await Lesson.create(data);
  },

  async addToSection(sectionId: string, lessonId: Types.ObjectId) {
    return Section.findByIdAndUpdate(
      sectionId,
      { $push: { lessons: lessonId } },
      { new: true }
    );
  },
};
