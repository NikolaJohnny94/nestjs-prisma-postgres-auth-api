export const swaggerAuthConfig = {
  signIn: {
    apiOperation: { summary: 'Signin user' },
    apiResponse: {
      status: 200,
      description: 'User signed in successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'User signed in successfully' },
          data: {
            type: 'object',
            properties: {
              accessToken: { type: 'string', example: 'your_access_token' },
              refreshToken: { type: 'string', example: 'your_refresh_token' },
            },
          },
        },
      },
    },
    apiBody: {
      schema: {
        type: 'object',
        properties: {
          email: { type: 'string', example: 'jerry@email.com' },
          password: { type: 'string', example: 'Jerry123.' },
        },
      },
    },
  },
  signUp: {
    apiOperation: { summary: 'Signup user' },
    apiResponse: {
      status: 200,
      description: 'User signed up successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'User signed up successfully' },
          data: {
            type: 'object',
            properties: {
              accessToken: { type: 'string', example: 'your_access_token' },
              refreshToken: { type: 'string', example: 'your_refresh_token' },
            },
          },
        },
      },
    },
    apiBody: {
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Jerry' },
          email: { type: 'string', example: 'jerry@email.com' },
          password: { type: 'string', example: 'Jerry123.' },
        },
      },
    },
  },
  signOut: {
    apiOperation: { summary: 'Signout user' },
    apiResponse: {
      status: 200,
      description: 'User signed out successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'User signed out successfully' },
        },
      },
    },
  },
  refreshToken: {
    apiOperation: { summary: 'Refresh access token' },
    apiResponse: {
      status: 200,
      description: 'Access token refreshed successfully',
      schema: {
        type: 'object',
        properties: {
          accessToken: { type: 'string', example: 'your_new_access_token' },
        },
      },
    },
    apiBody: {
      schema: {
        type: 'object',
        properties: {
          refresh_token: { type: 'string', example: 'your_refresh_token' },
        },
      },
    },
  },
};
