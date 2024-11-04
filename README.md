# Blog Posts API

## Overview

This project is a Blog Posts API built with NestJS, Prisma, and PostgreSQL. It provides endpoints for managing blog posts, users, and authentication. The API supports role-based access control with three roles: user, admin, and moderator.

### 💻 Stack: <br/>

<img src='https://cdn.icon-icons.com/icons2/2107/PNG/64/file_type_nestjs_icon_130355.png' width='26' style='margin-right: 2px;'/>[Nest.js](https://nestjs.com/)<br/>
<img src='https://cdn.icon-icons.com/icons2/2107/PNG/64/file_type_light_prisma_icon_130444.png' style='margin-right: 5px;' width='20px'>[Prisma](https://www.prisma.io/)<br/>
<img src='https://cdn.icon-icons.com/icons2/2415/PNG/64/postgresql_original_logo_icon_146391.png' style='margin-right: 5px;' width='20px'>[PostgreSQL](https://www.postgresql.org/)<br/>
<img src="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_swagger_icon_130134.png" width="22px" style='margin-top: -1px;'/> [Swagger](https://swagger.io/)<br>

## Features

- **User Management**: Create, update, delete, and retrieve user profiles.
- **Authentication**: Sign up, sign in, sign out, and refresh access tokens.
- **Role-Based Access Control**: Differentiate access and permissions based on user roles (user, admin, moderator).
- **Blog Posts Management**: Create, update, delete, and retrieve blog posts, including published posts.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **Prisma**: A next-generation ORM for Node.js and TypeScript.
- **PostgreSQL**: A powerful, open-source object-relational database system.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/blog-posts-api.git
   cd blog-posts-api
   ```
2. **Install dependencies:**:

   ```bash
   npm install
   ```

3. **Set up environment variables: Create a .env file in the root directory and add the following variables:**:

   ```bash
   DATABASE_URL=postgresql://username:password@localhost:5432/blog-posts-api JWT_SECRET=your_jwt_secret
   ```

4. **Run database migrations:**:

   ```bash
   npx prisma migrate
   ```

5. **Generate Prisma client:**:

   ```bash
   npx prisma generate
   ```

6. **Start the application:**:

   ```bash
   npm run start:dev
   ```

## API Endpoints

The following endpoints are defined in the project:

- **Authentication Endpoints:**

  - `POST /auth/signin` - Signin user
  - `POST /auth/signup` - Signup user
  - `POST /auth/signout` - Signout user
  - `POST /auth/refresh` - Refresh access token

- **User Endpoints:**

  - `GET /users` - Get all users
  - `POST /users` - Create user
  - `GET /users/profile` - Get user's profile
  - `PUT /users/profile` - Update user's profile
  - `DELETE /users/profile` - Delete profile
  - `GET /users/public` - Get public users info
  - `GET /users/{id}` - Get user by ID
  - `PUT /users/{id}` - Update user
  - `DELETE /users/{id}` - Delete user
  - `GET /users/public/{id}` - Get public user by ID

- **Post Endpoints:**

  - `GET /posts` - Get all posts
  - `POST /posts` - Create new post
  - `GET /posts/published` - Get all published posts
  - `GET /posts/published/{id}` - Get published post by ID
  - `PUT /posts/published/{id}` - Update logged user's post
  - `DELETE /posts/published/{id}` - Delete logged user's post
  - `GET /posts/{id}` - Get logged user's post by ID
  - `PUT /posts/{id}` - Update published post
  - `DELETE /posts/{id}` - Delete logged user's post
  <hr/>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
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
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
