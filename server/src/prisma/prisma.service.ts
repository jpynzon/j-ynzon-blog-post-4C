import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {}

@Injectable()
export class PostService {
  private prisma = new PrismaClient();

  async getAll() {
    return this.prisma.post.findMany();
  }

  async get(id: number) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  async create(data: Prisma.PostCreateInput) {
    return this.prisma.post.create({ data });
  }

  async update(id: number, data: Prisma.PostUpdateInput) {
    return this.prisma.post.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}
