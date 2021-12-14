CREATE SCHEMA "public"

CREATE TABLE "employees" (
  "employeeId" serial NOT NULL UNIQUE,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
) WITH (OIDS = FALSE);
