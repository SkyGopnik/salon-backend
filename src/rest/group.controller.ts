import GroupModel from "@models/group.model";

import {Controller, GET, POST} from "fastify-decorators";

import {FastifyRequest} from "fastify";

@Controller({route: '/group'})
export default class RequestController {

  @POST({
    url: '/',
    options: {
      schema: {
        body: {
          type: "object",
          properties: {
            groupId: {
              type: 'string'
            }
          },
          required: ['groupId'],
          additionalProperties: false
        }
      }
    }
  })
  groupCreate(req: FastifyRequest) {
    const { groupId } = <{ groupId: string }>req.body;

    return GroupModel.create({
      groupId
    });
  }

  @GET({
    url: "/"
  })
  groupGet() {
    return GroupModel.findOne({
      order: [
        ['createdAt', 'DESC']
      ]
    });
  }

}
