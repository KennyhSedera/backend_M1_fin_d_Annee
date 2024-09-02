import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EnseignantService {
    constructor(private prisma: PrismaService) {}
    
}
