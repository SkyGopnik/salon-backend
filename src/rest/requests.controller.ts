import {Controller, DELETE, GET, POST} from "fastify-decorators";
import CheckUserAuth from "@descriptors/checkUserAuth";
import GetUserInfo from "@descriptors/getUserInfo";
import {UserFastifyRequest} from "@rest/index";
import SaloonModel from "@models/saloon.model";
import RequestModel from "@models/request.model";
import ServiceModel from "@models/service.model";
import moment from "moment";
import { Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";

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

  @GET({
    url: "/time/:saloonId/:serviceId"
  })
  getRequestsTime(req: UserFastifyRequest) {
    const { saloonId, serviceId } = <{
      saloonId: string,
      serviceId: string
    }>req.params;

    const TODAY_START = moment().format('YYYY-MM-DD 00:00');
    const NOW = moment().format('YYYY-MM-DD 23:59');

    return RequestModel.findAll({
      attributes: ['time'],
      order: [
        ['id', 'DESC']
      ],
      where: {
        time: {
          [Op.between]: [
            TODAY_START,
            NOW,
          ]
        },
        serviceId,
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
            time: {
              type: 'string',
              minLength: 3
            },
            serviceId: {
              type: 'number'
            }
          },
          required: ['firstName', 'lastName', 'phone', 'time', 'serviceId'],
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
      time,
      serviceId
    } = <{
      firstName: string,
      lastName: string,
      phone: string,
      time: string,
      serviceId: number
    }>req.body;

    const [hours, minutes] = time.split(":");

    return RequestModel.create({
      firstName,
      lastName,
      phone,
      time: moment().set("hours", +hours).set("minutes", +minutes).format("YYYY-MM-DD HH:mm:ss").toString(),
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
