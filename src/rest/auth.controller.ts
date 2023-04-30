import bcrypt from "bcrypt";

import {Controller, GET, POST} from "fastify-decorators";

import randomstring from "randomstring";

import {FastifyRequest} from "fastify";
import UserModel from "@models/user.model";

@Controller({ route: '/auth' })
export default class RequestController {

  @POST({
    url: '/register',
    options: {
      schema: {
        body: {
          type: "object",
          properties: {
            firstName: {
              type: 'string',
              minLength: 3
            },
            lastName: {
              type: 'string',
              minLength: 3
            },
            email: {
              type: 'string',
              minLength: 3
            },
            password: {
              type: 'string',
              minLength: 3
            }
          },
          required: ['firstName', 'lastName', 'email', 'password'],
          additionalProperties: false
        }
      }
    }
  })
  async userRegister(req: FastifyRequest) {
    const {
      firstName,
      lastName,
      email,
      password
    } = <{
      firstName: string,
      lastName: string,
      email: string,
      password: string
    }>req.body;

    const checkUserExist = await UserModel.findOne({
      where: {
        email
      }
    });

    if (checkUserExist) {
      throw Error("User already exist");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const token = randomstring.generate({
      length: 50
    });

    return UserModel.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      token: token
    });
  }

  @POST({
    url: '/login',
    options: {
      schema: {
        body: {
          type: "object",
          properties: {
            email: {
              type: 'string',
              minLength: 3
            },
            password: {
              type: 'string',
              minLength: 3
            }
          },
          required: ['email', 'password'],
          additionalProperties: false
        }
      }
    }
  })
  async userLogin(req: FastifyRequest) {
    const {
      email,
      password
    } = <{
      firstName: string,
      lastName: string,
      email: string,
      password: string
    }>req.body;

    const user = await UserModel.findOne({
      where: {
        email
      }
    });

    if (!user) {
      throw Error("Login or password not valid");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw Error("Login or password not valid");
    }

    return user;
  }

}
