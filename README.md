# 🚀 Backend M1 Fin d’Année

Backend de projet développé avec **NestJS**, **Prisma** et **TypeScript** pour la gestion d’une API REST robuste, scalable et testée.

---

## 🧠 Présentation

Ce backend est une API construite avec **NestJS**, destinée à servir de serveur pour une application métier (CRUD, authentification, gestion des fichiers, etc.).  
Il utilise **Prisma** comme ORM et contient des tests unitaires et E2E pour assurer la qualité du code.

---

## 🛠️ Technologies & outils

✔ **NestJS** — framework backend Node.js  
✔ **Prisma** — ORM moderne pour Node.js  
✔ **TypeScript** — typage fort  
✔ **Jest** — tests (unit + e2e)  
✔ **Uploads** — gestion des fichiers  
✔ **ESLint / Prettier** — qualité de code

---

## Project setup

```bash
$ npm install
$ npm i -g @nestjs/cli
$ npm install prisma --save-dev
$ npm install @prisma/client
$ npx prisma init
$ npx prisma generate
$ npx prisma migrate dev --name init
$ npm run start:dev
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

