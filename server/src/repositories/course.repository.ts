import { CourseModel, ICourse } from "../models/course.model";

export const CourseRepository = {
  list: () => CourseModel.find().lean<ICourse[]>(),
  getById: (id: string) => CourseModel.findById(id).lean<ICourse | null>(),
  create: (data: Partial<ICourse>) => new CourseModel(data).save(),
};