import { JwtPayload } from '../utils/jwt.js';

export interface GraphQLContext {
  user?: JwtPayload;
  req: any;
  res: any;
}
