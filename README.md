# <img src='https://cdn.icon-icons.com/icons2/2107/PNG/64/file_type_nestjs_icon_130355.png' width='32' style='margin-right: 2px;'/>Nest.js, <img src='https://cdn.icon-icons.com/icons2/2107/PNG/64/file_type_light_prisma_icon_130444.png' style='margin-right: 5px;' width='32px'> Prisma, and <img src='https://cdn.icon-icons.com/icons2/2415/PNG/64/postgresql_original_logo_icon_146391.png' style='margin-right: 5px;' width='32px'>PostgreSQL Blog Posts API with <img src='https://jwt.io/img/pic_logo.svg' width='26px'> JWT authentification , 📃posts and 👤 user management, 📑 pagination and <img src="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_swagger_icon_130134.png" width="32px"/> Swagger documentation 🤗

## Overview 📜

Blog Posts API is a robust and scalable API built with NestJS, Prisma, PostgreSQL, and Swagger. This project is designed to provide a comprehensive set of endpoints for managing blog posts, users, and authentication, with a strong emphasis on security, role-based access control, and efficient data management. The API supports pagination to handle large datasets effectively, ensuring smooth and performant operations.

<hr/>

### 💻 Technologies used: <br/>

<img src='https://cdn.icon-icons.com/icons2/2107/PNG/64/file_type_nestjs_icon_130355.png' width='26' style='margin-right: 2px;'/>[Nest.js](https://nestjs.com/) - A progressive Node.js framework for building efficient, reliable, and scalable server-side applications. Nest.js provides a modular architecture, making it easy to organize and maintain the codebase.<br/>
<img src='https://cdn.icon-icons.com/icons2/2107/PNG/64/file_type_light_prisma_icon_130444.png' style='margin-right: 5px;' width='20px'>[Prisma](https://www.prisma.io/) - A next-generation ORM for Node.js and TypeScript. Prisma provides a type-safe database client, making it easy to interact with the PostgreSQL database and ensuring data integrity.<br/>
<img src='https://cdn.icon-icons.com/icons2/2415/PNG/64/postgresql_original_logo_icon_146391.png' style='margin-right: 5px;' width='20px'>[PostgreSQL](https://www.postgresql.org/) - A powerful, open-source object-relational database system known for its reliability and performance. PostgreSQL is used to store and manage the data for the API.<br/>
<img src="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_swagger_icon_130134.png" width="22px" style='margin-top: -1px;'/> [Swagger](https://swagger.io/) - A tool for documenting APIs, providing an interactive interface to explore and test the endpoints. Swagger makes it easy to generate and maintain API documentation.<br>
<img src='https://jwt.io/img/pic_logo.svg' width='26px'> [JWT](https://jwt.io/) - A compact, URL-safe means of representing claims to be transferred between two parties. JWTs are used for securely transmitting information between parties as a JSON object, ensuring secure authentication and authorization.

<hr/>

## Key Features 🔑

- **User Management**: Users can create an account, update their profile, and delete their profile. Moderators and admins have additional privileges to manage other users' posts and profiles.
- **Authentication**: Secure authentication using JWT with support for signin, signup, signout, and token refresh.
- **Role-Based Access Control**: Differentiate access and permissions based on user roles (user, moderator, admin).
- **Blog Posts Management**: Users can perform CRUD operations on their posts. Moderators can manage posts from users, and admins can manage posts from both users and moderators.
- **API Documentation**: Comprehensive API documentation using Swagger.

### Authentication 🔏

The API uses JSON Web Tokens (JWT) for authentication, ensuring secure and stateless user sessions. The authentication system supports the following operations:

- **Signin**: Users can sign in to their accounts using their credentials. Upon successful authentication, a JWT access token and a refresh token are issued.
- **Signup**: New users can create an account by providing their details. The signup process includes validation to ensure data integrity and security.
- **Signout**: Users can sign out of their accounts, invalidating their current session.
- **Refresh**: The API supports token refresh functionality, allowing users to obtain a new access token using a valid refresh token. This ensures continuous authentication without requiring users to sign in repeatedly.

### Role-Based Access Control ⛑️

The API implements a robust role-based access control system, ensuring that users have appropriate permissions based on their roles. The following roles are supported:

- **User**: Users can perform CRUD (Create, Read, Update, Delete) operations on their own posts. They can also update and delete their profiles. The creation of a user account happens during the signup process.
- **Moderator**: Moderators have all the permissions of users, plus the ability to update and delete posts created by users. This role is designed to help manage content and maintain the quality of posts.
- **Admin**: Admins have all the permissions of moderators, plus the ability to update and delete posts created by moderators. This role provides full control over the content and user management.

### Guards 🛡️

The API uses two types of guards to protect routes and ensure that only authorized users can access specific endpoints:

- **Auth Guard**: This guard ensures that only authenticated users can access certain routes. It verifies the presence and validity of the JWT access token.
- **Roles Guard**: This guard ensures that users have the appropriate role to access specific routes. It checks the user's role against the required roles for the endpoint.

### Blog Posts Management 📚

The API provides comprehensive functionality for managing blog posts. Users can create, read, update, and delete their own posts. Moderators and admins have additional privileges to manage posts created by other users. The following operations are supported:

- **Create Post**: Users can create new blog posts by providing the necessary details.
- **Read Posts**: Users can retrieve a list of all posts or a specific post by its ID. The API supports filtering and pagination to efficiently manage large datasets.
- **Update Post**: Users can update their own posts. Moderators can update posts created by users, and admins can update posts created by both users and moderators.
- **Delete Post**: Users can delete their own posts. Moderators can delete posts created by users, and admins can delete posts created by both users and moderators.

### API Documentation 📄

The API is documented using Swagger, providing an interactive interface to explore and test the endpoints. The documentation includes detailed information about each endpoint, including the request parameters, response structure, and possible status codes. This makes it easy for developers to understand and integrate with the API. The documentation also covers pagination, explaining how to use the skip and take parameters to efficiently manage large datasets.

## API Endpoints 🔗

The following endpoints are defined in the project:

- **Authentication Endpoints:**

  - `POST /auth/signin` - Signin user **(Public)**
  - `POST /auth/signup` - Signup user **(Public)**
  - `POST /auth/signout` - Signout user **(Private)**
  - `POST /auth/refresh` - Refresh access token **(Private)**

- **User Endpoints:**

  - `GET /users` - Get all users **(Private)**
  - `GET /users/{id}` - Get user by ID **(Private)**
  - `GET /users/public` - Get public users info **(Public)**
  - `GET /users/public/{id}` - Get public user by ID **(Public)**
  - `GET /users/profile` - Get user's profile **(Private)**
  - `POST /users` - Create user **(Private)**
  - `PUT /users/profile` - Update user's profile **(Private)**
  - `DELETE /users/profile` - Delete profile **(Private)**
  - `PUT /users/{id}` - Update user **(Private)**
  - `DELETE /users/{id}` - Delete user **(Private)**

- **Post Endpoints:**

  - `GET /posts` - Get all posts **(Private)**
  - `GET /posts/{id}` - Get logged user's post by ID **(Private)**
  - `GET /posts/published` - Get all published posts **(Public)**
  - `GET /posts/published/{id}` - Get published post by ID **(Public)**
  - `POST /posts` - Create new post **(Private)**
  - `PUT /posts/{id}` - Update published post **(Private)**
  - `DELETE /posts/{id}` - Delete logged user's post **(Private)**
  - `PUT /posts/published/{id}` - Update logged user's post **(Private)**
  - `DELETE /posts/published/{id}` - Delete logged user's post **(Private)**

<hr/>

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/NikolaJohnny94/nestjs-auth-api.git
   cd nestjs-auth-api
   ```
2. **Install dependencies:**:

   ```bash
   npm install
   ```

3. **Set up environment variables: Create a .env file in the root directory and add the following variables:**:

   ```bash
   DATABASE_URL=your_db_url
   JWT_SECRET=your_jwt_secret
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
