export const swaggerPostConfig = {
  getUsersPosts: {
    apiOperation: { summary: 'Get all posts' },
    apiResponse: {
      status: 200,
      description: 'Posts retrieved successfully!',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                title: { type: 'string' },
                content: { type: 'string' },
              },
            },
          },
        },
        example: {
          success: true,
          message: 'Posts retrieved successfully!',
          data: [
            {
              id: 1,
              title: 'Tom & Jerry Adventures',
              content:
                'Story about adventures of cat and mouse named Tom and Jerry',
              published: true,
            },
            {
              id: 2,
              title: 'Tom & Jerry Adventures part II',
              content:
                'Story about adventures of cat and mouse named Tom and Jerry part II',
              published: false,
            },
          ],
        },
      },
    },
    apiQuery: [
      {
        name: 'skip',
        required: false,
        type: 'string',
        description: "Example: '0'",
      },
      {
        name: 'take',
        required: false,
        type: 'string',
        description: "Example: '5'",
      },
      {
        name: 'cursor',
        required: false,
        type: 'string',
        description: "Example: '1'",
      },
      {
        name: 'orderBy',
        required: false,
        type: 'string',
        description: 'Example: {"id": "asc"}',
      },
      {
        name: 'where',
        required: false,
        type: 'string',
        description: 'Example: {"published": true}',
      },
    ],
  },
  getPublishedPosts: {
    apiOperation: { summary: 'Get all published posts' },
    apiResponse: {
      status: 200,
      description: 'All published posts retrieved successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                title: { type: 'string' },
                content: { type: 'string' },
                author: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    role: { type: 'string' },
                  },
                },
              },
            },
          },
        },
        example: {
          success: true,
          message: 'All published posts retrieved successfully!',
          data: [
            {
              id: 1,
              title: 'Tom & Jerry Adventures',
              content:
                'Story about adventures of cat and mouse named Tom and Jerry',
              author: {
                id: 1,
                name: 'Jerry',
                role: 'ADMIN',
              },
            },
          ],
        },
      },
    },
    apiQuery: [
      {
        name: 'skip',
        required: false,
        type: 'string',
        description: "Example: '0'",
      },
      {
        name: 'take',
        required: false,
        type: 'string',
        description: "Example: '5'",
      },
      {
        name: 'cursor',
        required: false,
        type: 'string',
        description: "Example: '1'",
      },
      {
        name: 'orderBy',
        required: false,
        type: 'string',
        description: 'Example: {"id": "asc"}',
      },
      {
        name: 'where',
        required: false,
        type: 'string',
        description:
          'Example: {"title":{"contains":"Tom","mode":"insensitive"}}',
      },
    ],
  },
  getPublishedPostById: {
    apiOperation: { summary: 'Get published  post by id' },
    apiResponse: {
      status: 200,
      description: 'Published post with id: 1 retrieved successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: {
            type: 'string',
            example: 'Published post with id: 1 retrieved successfully',
          },
          data: {
            type: 'object',
            properties: {
              title: { type: 'string', example: 'Tom & Jerry Adventures' },
              content: {
                type: 'string',
                example:
                  'Story about adventures of cat and mouse named Tom and Jerry',
              },
              author: {
                type: 'object',
                properties: {
                  id: { type: 'number', example: 1 },
                  name: { type: 'string', example: 'Jerry' },
                  role: { type: 'string', example: 'ADMIN' },
                },
              },
            },
          },
        },
      },
    },
  },
  getUsersPostById: {
    apiOperation: { summary: 'Get logged users post by id' },
    apiResponse: {
      status: 200,
      description: 'Post with id: 1 retrieved successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: {
            type: 'string',
            example: 'Post with id: 1 retrieved successfully',
          },
          data: {
            type: 'object',
            properties: {
              title: { type: 'string', example: 'Tom & Jerry Adventures' },
              content: {
                type: 'string',
                example:
                  'Story about adventures of cat and mouse named Tom and Jerry',
              },
              published: { type: 'boolean', example: true },
            },
          },
        },
      },
    },
  },
  createPost: {
    apiOperation: { summary: 'Create new post' },
    apiResponse: {
      status: 200,
      description: 'Post created successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: {
            type: 'string',
            example: 'Post created successfully',
          },
          data: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 2 },
              title: {
                type: 'string',
                example: 'Tom and Jerry Adventures part III',
              },
              content: {
                type: 'string',
                example:
                  'Third part of the story about adventures of cat and mouse named Tom and Jerry',
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
          title: {
            type: 'string',
            example: 'Updated Tom and Jerry Adventures title',
          },
          content: {
            type: 'string',
            example:
              'Updated Story about adventures of cat and mouse named Tom and Jerry',
          },
        },
      },
    },
  },
  updatePost: {
    apiOperation: { summary: 'Update published post' },
    apiResponse: {
      status: 200,
      description: 'Published post updated successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: {
            type: 'string',
            example: 'Published post updated successfully',
          },
          data: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              title: {
                type: 'string',
                example: 'Updated Tom and Jerry Adventures title',
              },
              content: {
                type: 'string',
                example:
                  'Updated Story about adventures of cat and mouse named Tom and Jerry',
              },
              published: { type: 'boolean', example: false },
            },
          },
        },
      },
    },
    apiBody: {
      schema: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            example: 'Updated Tom and Jerry Adventures title',
          },
          content: {
            type: 'string',
            example:
              'Updated Story about adventures of cat and mouse named Tom and Jerry',
          },
          published: { type: 'boolean', example: false },
        },
      },
    },
  },
  updatePublishedPost: {
    apiOperation: { summary: "Update logged users's post" },
    apiResponse: {
      status: 200,
      description: 'Post updated successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Post updated successfully' },
          data: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              title: {
                type: 'string',
                example: 'Updated Tom and Jerry Adventures title',
              },
              content: {
                type: 'string',
                example:
                  'Updated Story about adventures of cat and mouse named Tom and Jerry',
              },
              published: { type: 'boolean', example: false },
              author: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  role: { type: 'string' },
                },
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
          title: {
            type: 'string',
            example: 'Updated Tom and Jerry Adventures title',
          },
          content: {
            type: 'string',
            example:
              'Updated Story about adventures of cat and mouse named Tom and Jerry',
          },
          published: { type: 'boolean', example: false },
        },
      },
    },
  },
  deletePost: {
    apiOperation: { summary: "Delete logged user's post" },
    apiResponse: {
      status: 200,
      description: 'Post deleted successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: {
            type: 'string',
            example: 'Post deleted successfully',
          },
          data: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              title: {
                type: 'string',
                example: 'Updated Tom and Jerry Adventures title',
              },
              content: {
                type: 'string',
                example:
                  'Updated Story about adventures of cat and mouse named Tom and Jerry',
              },
              published: { type: 'boolean', example: false },
            },
          },
        },
      },
    },
  },
  deletePublishedPost: {
    apiOperation: { summary: "Delete logged user's post" },
    apiResponse: {
      status: 200,
      description: 'Published post deleted successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: {
            type: 'string',
            example: 'Published post deleted successfully',
          },
          data: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              title: {
                type: 'string',
                example: 'Updated Tom and Jerry Adventures title',
              },
              content: {
                type: 'string',
                example:
                  'Updated Story about adventures of cat and mouse named Tom and Jerry',
              },
              author: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  name: { type: 'string' },
                  role: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
  },
};
