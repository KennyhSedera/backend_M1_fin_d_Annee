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
import { MentionModule } from './mention/mention.module';
import { ParcoursModule } from './parcours/parcours.module';
import { NiveauModule } from './niveau/niveau.module';
import { ParcoursNiveauModule } from './parcours-niveau/parcours-niveau.module';
import { UniteEnseignementModule } from './unite-enseignement/unite-enseignement.module';
import { VolumeHoraireModule } from './volume-horaire/volume-horaire.module';
import { GradeModule } from './grade/grade.module';
import { EnseignantModule } from './enseignant/enseignant.module';
import { EnseignantVolumeHoraireModule } from './enseignant-volume-horaire/enseignant-volume-horaire.module';
import { HeuresComplementaireModule } from './heures-complementaire/heures-complementaire.module';

@Module({
  imports: [UsersModule, EnseignantModule, PrismaModule, UserModule, AuthModule, MatiereModule, MentionModule, ParcoursModule, NiveauModule, ParcoursNiveauModule, UniteEnseignementModule, VolumeHoraireModule, GradeModule, EnseignantVolumeHoraireModule, HeuresComplementaireModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
