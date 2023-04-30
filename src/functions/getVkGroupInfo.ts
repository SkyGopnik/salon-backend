// import {GroupInfoInterface} from "@entity/group";

const axios = require('axios');

const keys = require('@config/keys.json');

export default async function getVkGroupInfo(groupId: string): Promise<any | null> {
  // let groupInfo = null;
  //
  // await axios.get(`https://api.vk.com/method/groups.getById?group_id=${groupId}&fields=description&lang=ru&v=5.131&access_token=${keys.accessTokenVk}`)
  //   .then((res: any) => {
  //     groupInfo = res.data.response ? res.data.response[0] : null;
  //   }).catch((err: any) => console.log(err));
  //
  // return groupInfo;
}
