export const swaggerUserConfig = {
  getUsers: {
    apiOperation: { summary: 'Get all users' },
    apiResponse: {
      status: 200,
      description: 'Users retrieved successfully!',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'User created successfully!' },
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                email: { type: 'string' },
                role: { type: 'string' },
              },
            },
          },
        },
        example: {
          success: true,
          message: 'Users retrieved successfully!',
          data: [
            {
              id: 1,
              name: 'Jerry',
              email: 'jerry@email.com',
              role: 'USER',
            },
            {
              id: 2,
              name: 'Tom',
              email: 'tom@email.com',
              role: 'USER',
            },
          ],
        },
      },
    },
  },
  getUserById: {
    apiOperation: { summary: 'Get user by id' },
    apiResponse: {
      status: 200,
      description: 'User retrieved successfully!',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'User retrieved successfully!' },
          data: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              name: { type: 'string', example: 'Jerry' },
              email: { type: 'string', example: 'jerry@email.com' },
              role: { type: 'string', example: 'ADMIN' },
              posts: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number', example: 1 },
                    title: { type: 'string', example: 'My Post' },
                    content: {
                      type: 'string',
                      example: 'This is my post content',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  getProfile: {
    apiOperation: { summary: 'Get users profile' },
    apiResponse: {
      status: 200,
      description: 'Users profile info retrieved successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: {
            type: 'string',
            example: 'Users profile info retrieved successfully',
          },
          data: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              name: { type: 'string', example: 'Jerry' },
              email: { type: 'string', example: 'jerry@email.com' },
              password: { type: 'string', example: 'Jerry123.' },
              role: { type: 'string', example: 'ADMIN' },
            },
          },
        },
      },
    },
  },
  getPublicUsersInfo: {
    apiOperation: { summary: 'Get public users info' },
    apiResponse: {
      status: 200,
      description: 'Public users info retrieved successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: {
            type: 'string',
            example: 'Public users info retrieved successfully',
          },
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number', example: 1 },
                name: { type: 'string', example: 'Jerry' },
                role: { type: 'string', example: 'ADMIN' },
              },
            },
          },
        },
        example: {
          success: true,
          message: 'Public users info retrieved successfully!',
          data: [
            {
              id: 1,
              name: 'Jerry',
              email: 'jerry@email.com',
              role: 'ADMIN',
            },
            {
              id: 2,
              name: 'Tom',
              email: 'tom@email.com',
              role: 'USER',
            },
          ],
        },
      },
    },
  },
  getPublicUserInfoById: {
    apiOperation: { summary: 'Get user by id' },
    apiResponse: {
      status: 200,
      description: 'Public user info retrieved successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: {
            type: 'string',
            example: 'Public user info retrieved successfully!',
          },
          data: {
            type: 'object',
            properties: {
              name: { type: 'string', example: 'Jerry' },
              role: { type: 'string', example: 'ADMIN' },
              posts: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number', example: 1 },
                    title: { type: 'string', example: 'My Post' },
                    content: {
                      type: 'string',
                      example: 'This is my post content',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  createUser: {
    apiOperation: { summary: 'Create user' },
    apiResponse: {
      status: 200,
      description: 'User created successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'User created successfully' },
          data: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 3 },
              name: { type: 'string', example: 'New User' },
              email: { type: 'string', example: 'new_user@email.com' },
              role: { type: 'string', example: 'USER' },
            },
          },
        },
      },
    },
    apiBody: {
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'New User' },
          email: { type: 'string', example: 'new_user@email.com' },
          password: { type: 'string', example: 'Newuser123.' },
        },
      },
    },
  },
  updateProfile: {
    apiOperation: { summary: 'Update users profile' },
    apiResponse: {
      status: 200,
      description: 'Users profile updated successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: {
            type: 'string',
            example: 'Users profile updated successfully',
          },
          data: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 3 },
              name: { type: 'string', example: 'Updated Users profile' },
              email: {
                type: 'string',
                example: 'updated_users_profile@email.com',
              },
            },
          },
        },
      },
    },
    apiBody: {
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Updated User' },
          email: { type: 'string', example: 'updated_user@email.com' },
          password: { type: 'string', example: 'Updateduser123.' },
        },
      },
    },
  },
  updateUser: {
    apiOperation: { summary: 'Update user' },
    apiResponse: {
      status: 200,
      description: 'User updated successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'User updated successfully' },
          data: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 3 },
              name: { type: 'string', example: 'Updated User' },
              email: { type: 'string', example: 'updated_user@email.com' },
            },
          },
        },
      },
    },
    apiBody: {
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Updated User' },
          email: { type: 'string', example: 'updated_user@email.com' },
          password: { type: 'string', example: 'Updateduser123.' },
          role: { type: 'string', example: 'ADMIN' },
        },
      },
    },
  },
  deleteProfile: {
    apiOperation: { summary: 'Delete profile' },
    apiResponse: {
      status: 200,
      description: 'Users profile deleted successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: {
            type: 'string',
            example: 'Users profile deleted successfully',
          },
          data: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 3 },
              name: { type: 'string', example: 'New User' },
              email: { type: 'string', example: 'new_user@email.com' },
            },
          },
        },
      },
    },
  },
  deleteUser: {
    apiOperation: { summary: 'Delete user' },
    apiResponse: {
      status: 200,
      description: 'User deleted successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'User deleted successfully' },
          data: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 3 },
              name: { type: 'string', example: 'New User' },
              email: { type: 'string', example: 'new_user@email.com' },
            },
          },
        },
      },
    },
  },
};
