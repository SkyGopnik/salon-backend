const md5 = require('md5');

import getAllUrlParams from './getAllUrlParams';

const keys = require('@config/keys.json');

export default function checkSignOk(searchParams: string) {
  // Проверяем подпись для Одноклассников
  // Получаем все GET параметры
  const urlParams = getAllUrlParams(searchParams);
  // Собираем подпись
  const paramsHash = md5(urlParams.logged_user_id + urlParams.session_key + keys.secretKeyOk);

  // Сверяем две подписи
  return paramsHash === urlParams.auth_sig;
}
