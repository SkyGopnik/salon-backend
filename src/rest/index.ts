import { resolve } from 'path';
import {fastify, FastifyInstance, FastifyRequest} from 'fastify';
import { bootstrap } from 'fastify-decorators';
import UserModel from "@models/user.model";


export interface UserFastifyRequest extends FastifyRequest {
  headers: {
    authorization: string
  }
  user: UserModel
}

const app:FastifyInstance = fastify({
  ajv: {
    customOptions: {
      removeAdditional: false,
      useDefaults: true,
      coerceTypes: true,
      allErrors: true,
      nullable: true
    },
    plugins: []
  }
});

// Register handlers auto-bootstrap
app.register(bootstrap, {
  directory: resolve(__dirname),
  mask: /\.(controller|handler)\./
});

app.register(require('fastify-cors'), {
  origin: "*"
});

export default app;
