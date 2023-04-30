const axios = require('axios');

const keys = require('@config/keys.json');

export interface UserInfo {
  id: number,
  first_name: string,
  last_name: string,
  is_closed: boolean,
  can_access_closed: boolean,
  sex: number,
  photo_100: string
}

export default async function getVkUserInfoList(user_ids: Array<string> | null) {
  let usersInfo: Array<UserInfo> = [];

  await axios.get(`https://api.vk.com/method/users.get?user_ids=${user_ids}&fields=photo_100,city,sex&lang=ru&name_case=Nom&v=5.103&access_token=${keys.accessTokenVk}`)
    .then((res: any) => {
      usersInfo = res.data.response;
    }).catch((err: any) => console.log(err));

  return usersInfo;
};
