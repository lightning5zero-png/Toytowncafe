const path = require("path");

/** @type {import('prisma').PrismaConfig} */
module.exports = {
    earlyAccess: true,
    schema: path.join(__dirname, "prisma", "schema.prisma"),
    datasource: {
        url: process.env.DATABASE_URL || "file:./dev.db",
    },
};
