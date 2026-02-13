// Prisma Client Singleton
// --------------------------------------------------
// NOTE: Prisma client generation requires running `npx prisma generate`
// from a path without spaces. The current workspace path contains spaces
// which causes a known issue with Prisma v7 CLI.
//
// To fix: either rename the workspace directory to remove spaces,
// or run prisma generate from a path without spaces.
//
// Once generated, uncomment the code below:
//
// import { PrismaClient } from "@prisma/client";
//
// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };
//
// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     log:
//       process.env.NODE_ENV === "development"
//         ? ["query", "error", "warn"]
//         : ["error"],
//   });
//
// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }

export { };
