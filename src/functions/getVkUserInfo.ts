const axios = require('axios');

const keys = require('@config/keys.json');

export default async function getVkUserInfo(user_id: string | null) {
  let userInfo = null;

  await axios.get(`https://api.vk.com/method/users.get?user_ids=${user_id}&fields=photo_100,city,sex,domain&lang=ru&name_case=Nom&v=5.103&access_token=${keys.accessTokenVk}`)
    .then((res: any) => {
      userInfo = res.data.response ? res.data.response[0] : null;
    }).catch((err: any) => console.log(err));

  return userInfo;
}
