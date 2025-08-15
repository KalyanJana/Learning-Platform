import { prisma } from "../config/db"; // or mongoose if you're using Mongo
import { User } from "@prisma/client"; // remove if not using Prisma

class UserRepository {
  async create(data: { email: string; password: string; name: string }): Promise<User> {
    return prisma.user.create({ data });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }
}

export const userRepository = new UserRepository();
