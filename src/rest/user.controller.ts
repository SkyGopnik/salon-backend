import {Controller, GET} from "fastify-decorators";
import CheckUserAuth from "@descriptors/checkUserAuth";
import GetUserInfo from "@descriptors/getUserInfo";
import {UserFastifyRequest} from "@rest/index";

@Controller({ route: '/user' })
export default class RequestController {

  @CheckUserAuth
  @GetUserInfo
  @GET({
    url: "/profile"
  })
  getUserProfile(req: UserFastifyRequest) {
    return req.user;
  }

}