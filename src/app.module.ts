import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EnseignantModule } from './enseignant/enseignant.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MatiereController } from './matiere/matiere.controller';
import { MatiereModule } from './matiere/matiere.module';

@Module({
  imports: [UsersModule, EnseignantModule, PrismaModule, UserModule, AuthModule, MatiereModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
