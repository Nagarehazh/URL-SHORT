import { PrismaClient } from '@prisma/client';
let db: PrismaClient;

/* Usually
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
*/

/* this is needed because in develpment mode we don't want to restart the server everytime we change a file, but we want to make sure we don't create a new connection to the DB with every change either */

if (process.env.NODE_ENV === 'production') { // if we are in production mode, we want to create a new connection to the DB everytime we change a file
 db = new PrismaClient();
} else { // if we are in development mode, we want to reuse the same connection to the DB everytime we change a file
 if (!global.__db) {
  global.__db = new PrismaClient();
 }
 db = global.__db;
}

export { db };