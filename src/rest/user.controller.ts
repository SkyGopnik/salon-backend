import {Controller, GET} from "fastify-decorators";
import CheckUserAuth from "@descriptors/checkUserAuth";

@Controller({ route: '/user' })
export default class RequestController {

  @CheckUserAuth
  @GET({
    url: "/profile"
  })
  getUserProfile() {
    return null;
  }

}