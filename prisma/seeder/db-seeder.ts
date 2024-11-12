//Prisma
import { PrismaClient, Role } from '@prisma/client';
//Faker
import { faker } from '@faker-js/faker';
//Bcrypt
import * as bcrypt from 'bcrypt';
//Constants
import { bcryptSaltRounds } from '../../src/shared/constants';

//Prisma Client instance
const prisma = new PrismaClient();

/**
 * Main function to seed the database with initial data.
 * Checks if the database has been previously seeded and populates it with sample users and posts if not.
 */
async function main() {
  try {
    // Check if the database has already been seeded
    const userCount = await prisma.user.count();

    if (userCount > 0) {
      console.log('Database already seeded');
      return;
    }

    // Define roles for sample users
    const roles: Role[] = ['USER', 'MODERATOR', 'ADMIN'];
    //Hashed password
    const hashedPassword = await bcrypt.hash('Password123.', bcryptSaltRounds);

    // Create sample users with different roles
    const userPromises = roles.map(async (role) => {
      //Name
      const name = faker.person.fullName();
      const email = faker.internet.email();

      const user = await prisma.user.create({
        data: { email, name, password: hashedPassword, role },
      });

      const postPromises = Array.from({ length: 3 }).map(
        async () =>
          await prisma.post.create({
            data: {
              title: faker.lorem.sentence(),
              content: faker.lorem.paragraph(),
              published: faker.datatype.boolean(),
              author: {
                connect: { id: user.id },
              },
            },
          }),
      );

      await Promise.all(postPromises);
    });

    //Test user with ADMIN role
    const testUser = await prisma.user.create({
      data: {
        email: 'test_user@example.com',
        name: 'Test User',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    await Promise.all([...userPromises, testUser]);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
