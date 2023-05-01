import {Controller, GET, POST} from "fastify-decorators";
import CheckUserAuth from "@descriptors/checkUserAuth";
import GetUserInfo from "@descriptors/getUserInfo";
import {UserFastifyRequest} from "@rest/index";
import SaloonModel from "@models/saloon.model";

@Controller({ route: '/saloons' })
export default class RequestController {

  @CheckUserAuth
  @GetUserInfo
  @GET({
    url: "/"
  })
  getSaloons(req: UserFastifyRequest) {
    return SaloonModel.findAll({
      where: {
        userId: req.user.id
      }
    });
  }

  @CheckUserAuth
  @GetUserInfo
  @POST({
    url: "/",
    options: {
      schema: {
        body: {
          type: "object",
          properties: {
            name: {
              type: 'string',
              minLength: 3
            },
            description: {
              type: 'string',
              minLength: 3
            }
          },
          required: ['name', 'description'],
          additionalProperties: false
        }
      }
    }
  })
  createSaloon(req: UserFastifyRequest) {
    const { name, description } = <{
      name: string,
      description: string
    }>req.body;

    return SaloonModel.create({
      name,
      description,
      userId: req.user.id
    });
  }

}