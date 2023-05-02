import {Controller, DELETE, GET, POST, PUT} from "fastify-decorators";
import CheckUserAuth from "@descriptors/checkUserAuth";
import GetUserInfo from "@descriptors/getUserInfo";
import {UserFastifyRequest} from "@rest/index";
import SaloonModel from "@models/saloon.model";
import ServiceModel from "@models/service.model";
import ReviewModel from "@models/review.model";

@Controller({ route: '/reviews' })
export default class RequestController {

  @CheckUserAuth
  @GetUserInfo
  @GET({
    url: "/:saloonId"
  })
  getReviews(req: UserFastifyRequest) {
    const { saloonId } = <{
      saloonId: string
    }>req.params;

    return ReviewModel.findAll({
      order: [
        ['id', 'DESC']
      ],
      where: {
        saloonId
      }
    });
  }

  @CheckUserAuth
  @GetUserInfo
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
            rating: {
              type: 'number',
              min: 0
            },
            description: {
              type: 'string',
              minLength: 3
            }
          },
          required: ['firstName', 'lastName', 'description', 'rating'],
          additionalProperties: false
        }
      }
    }
  })
  async createReview(req: UserFastifyRequest) {
    const { saloonId } = <{
      saloonId: string
    }>req.params;

    const {
      firstName,
      lastName,
      rating,
      description
    } = <{
      firstName: string,
      lastName: string,
      rating: number,
      description: string
    }>req.body;

    const saloon = await SaloonModel.findOne({
      where: {
        id: saloonId,
        userId: req.user.id
      }
    });

    if (!saloon) {
      throw Error("Saloon not exist");
    }

    return ReviewModel.create({
      firstName,
      lastName,
      rating,
      description,
      saloonId
    });
  }

  @CheckUserAuth
  @GetUserInfo
  @PUT({
    url: "/:saloonId/:id",
    options: {
      schema: {
        body: {
          type: "object",
          properties: {
            name: {
              type: 'string',
              minLength: 3
            },
            subName: {
              type: 'string',
              minLength: 3
            },
            description: {
              type: 'string',
              minLength: 3
            },
            price: {
              type: 'number',
              min: 0
            }
          },
          required: ['name', 'description', 'price'],
          additionalProperties: false
        }
      }
    }
  })
  async updateService(req: UserFastifyRequest) {
    const { saloonId, id } = <{
      saloonId: string,
      id: string
    }>req.params;

    const {
      name,
      subName,
      description,
      price
    } = <{
      name: string,
      subName: string,
      description: string,
      price: number
    }>req.body;

    const saloon = await SaloonModel.findOne({
      where: {
        id: saloonId
      }
    });

    const service = await ServiceModel.findOne({
      where: {
        id
      }
    });

    if (!service) {
      throw Error("Service not exist");
    }

    const isSaloonOwnerService = await saloon?.$has("services", service);

    if (!isSaloonOwnerService) {
      throw Error("Service not found");
    }

    return ServiceModel.update({
      name,
      subName,
      description,
      price
    }, {
      where: {
        id
      }
    });
  }

  @CheckUserAuth
  @GetUserInfo
  @DELETE({
    url: "/:saloonId/:id"
  })
  async deleteService(req: UserFastifyRequest) {
    const { saloonId, id } = <{
      saloonId: string,
      id: string
    }>req.params;

    const saloon = await SaloonModel.findOne({
      where: {
        id: saloonId
      }
    });

    const service = await ServiceModel.findOne({
      where: {
        id
      }
    });

    if (!service) {
      throw Error("Service not exist");
    }

    const isSaloonOwnerService = await saloon?.$has("services", service);

    if (!isSaloonOwnerService) {
      throw Error("Service not found");
    }

    return ServiceModel.destroy({
      where: {
        id
      }
    });
  }

}