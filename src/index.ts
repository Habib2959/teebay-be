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

// Configure CORS
const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:4000',
      'http://teebay-frontend:5173',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:4000',
    ];

    // Allow requests with no origin (mobile apps, curl requests, etc)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // In development, be more permissive
      if (process.env.NODE_ENV === 'development') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

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
