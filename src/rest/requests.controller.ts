import {Controller, DELETE, GET, POST} from "fastify-decorators";
import CheckUserAuth from "@descriptors/checkUserAuth";
import GetUserInfo from "@descriptors/getUserInfo";
import {UserFastifyRequest} from "@rest/index";
import SaloonModel from "@models/saloon.model";
import RequestModel from "@models/request.model";
import ServiceModel from "@models/service.model";

@Controller({ route: '/requests' })
export default class RequestController {

  @CheckUserAuth
  @GetUserInfo
  @GET({
    url: "/:saloonId"
  })
  getRequests(req: UserFastifyRequest) {
    const { saloonId } = <{
      saloonId: string
    }>req.params;

    return RequestModel.findAll({
      include: [ServiceModel],
      order: [
        ['id', 'DESC']
      ],
      where: {
        saloonId
      }
    });
  }

  @POST({
    url: "/:saloonId",
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
            phone: {
              type: 'string',
              minLength: 3
            },
            serviceId: {
              type: 'number'
            }
          },
          required: ['firstName', 'lastName', 'phone', 'serviceId'],
          additionalProperties: false
        }
      }
    }
  })
  async createRequest(req: UserFastifyRequest) {
    const { saloonId } = <{
      saloonId: string
    }>req.params;

    const {
      firstName,
      lastName,
      phone,
      serviceId
    } = <{
      firstName: string,
      lastName: string,
      phone: string,
      serviceId: number
    }>req.body;

    return RequestModel.create({
      firstName,
      lastName,
      phone,
      serviceId,
      saloonId
    });
  }

  @CheckUserAuth
  @GetUserInfo
  @DELETE({
    url: "/:saloonId/:id"
  })
  async deleteRequest(req: UserFastifyRequest) {
    const { saloonId, id } = <{
      saloonId: string,
      id: string
    }>req.params;

    const saloon = await SaloonModel.findOne({
      where: {
        id: saloonId
      }
    });

    const request = await RequestModel.findOne({
      where: {
        id
      }
    });

    if (!request) {
      throw Error("Request not exist");
    }

    const isSaloonOwnerRequest = await saloon?.$has("requests", request);

    if (!isSaloonOwnerRequest) {
      throw Error("Request not found");
    }

    return RequestModel.destroy({
      where: {
        id
      }
    });
  }

}
