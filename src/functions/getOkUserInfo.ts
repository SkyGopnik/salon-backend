const axios = require('axios');
const md5 = require('md5');

const keys = require('@config/keys.json');

export default async function getOkUserInfo(user_id: string | null) {
  const paramsHash = `application_key=${keys.publicKeyOk}fields=FIRST_NAME,LAST_NAME,PIC128X128,GENDER,LOCATIONformat=jsonmethod=users.getInfouids=${user_id}${keys.secretKeyOk}`;

  return axios.get(`https://api.ok.ru/fb.do?application_key=${keys.publicKeyOk}&fields=FIRST_NAME,LAST_NAME,PIC128X128,GENDER,LOCATION&format=json&method=users.getInfo&uids=${user_id}&sig=${md5(paramsHash)}`)
    .then((okApi: any) => {
      console.log(okApi.data);
      return okApi.data[0];
    }).catch((err: any) => console.log(err));
}
