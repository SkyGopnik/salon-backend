import checkSignVkGame from "@functions/checkSignVkGame";
import checkSignVk from "@functions/checkVkSign";
import queryGet from "@functions/queryGet";

export default class AuthService {

  static getInfo(url: string | undefined) {
    if (!url) {
      return;
    }

    const platform = queryGet(url, 'reglis_type');

    if (platform === 'vk') {
      return {
        id: String(queryGet(url, 'vk_user_id'))
      };
    } else if (platform === 'ok') {
      return {
        id: String(queryGet(url, 'vk_user_id'))
      };
    } else if (platform === 'vk_game') {
      return {
        id: String(queryGet(url, 'viewer_id'))
      };
    } else {
      throw Error('Platform isn\'t exist');
    }
  }

  static validateUser(url: string | undefined) {
    if (!url) {
      return;
    }

    const platform = queryGet(url, 'reglis_type');

    if (platform === 'vk') {
      if (!checkSignVk(url)) {
        throw Error('Sign vk isn\'t valid');
      }
    } else if (platform === 'ok') {
      if (!checkSignVk(url)) {
        throw Error('Sign ok isn\'t valid');
      }
    } else if (platform === 'vk_game') {
      if (!checkSignVkGame(url)) {
        throw Error('Sign vk_game isn\'t valid');
      }
    } else {
      throw Error('Platform isn\'t exist');
    }
  }

}
