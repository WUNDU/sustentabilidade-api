// const swaggerJsDoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Sustentabilidade',
      version: '1.0.0',
      description: 'API para incentivar ações sustentáveis',
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      schemas: {
        Action: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
            },
            title: {
              type: 'string',
              description: 'Título da ação',
            },
            description: {
              type: 'string',
              description: 'Descrição detalhada da ação',
            },
            category: {
              type: 'string',
              description: 'Categoria da ação',
            },
            points: {
              type: 'integer',
              description: 'Pontos atribuídos à ação',
            },
            userId: {
              type: 'string',
              description: 'Identificação do usuário que criou a ação',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação',
            },
          },
          required: ['title', 'points'],
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [path.join(__dirname, '../routes/*.js')],
};

const specs = swaggerJsDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};