import { Injectable } from "@nestjs/common";
import { Enseignant, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class EnseignantService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Enseignant[]> {
    return this.prisma.enseignant.findMany();
  }

  async findOne(id:number): Promise<Enseignant> {
    return this.prisma.enseignant.findUnique({where:{id}});
  }

  async create(data:Prisma.EnseignantCreateInput){
    await this.prisma.enseignant.create({data});
    return{
        success: true,
        message: "Enseignant enregistré avec succès",
    };
  }

  async delete(id:number){
    await this.prisma.enseignant.delete({where:{id}});
    return{
        success: true,
        message: "Enseignant supprimé avec succès",
    };
  }

  async update(id:number, data:Prisma.EnseignantUpdateInput){
    await this.prisma.enseignant.update({where:{id}, data});
    return{
        success: true,
        message: "Enseignant modifié avec succès",
    };
  }
}
