import express, { Express, Request, Response } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import cors from 'cors';
import { config } from './config/env.js';
import { authMiddleware } from './middleware/auth.js';
import { typeDefs } from './graphql/schema.js';
import { createResolvers } from './graphql/resolvers/index.js';

const app: Express = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

/**
 * Initialize Apollo GraphQL Server
 */
async function startServer() {
  const resolvers = createResolvers();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  // Apply middleware
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req, res }: { req: any; res: any }) => {
        return authMiddleware(req, res);
      },
    })
  );

  // Start listening
  app.listen(config.app.port, () => {
    console.log(
      `🚀 Server ready at http://localhost:${config.app.port}/graphql`
    );
    console.log(`📊 Environment: ${config.app.nodeEnv}`);
  });
}

// Start the server
startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

export default app;
