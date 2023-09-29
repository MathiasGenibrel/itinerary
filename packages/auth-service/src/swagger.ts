import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'Documentation for your API Auth-Service',
  },
  basePath: '/',
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
