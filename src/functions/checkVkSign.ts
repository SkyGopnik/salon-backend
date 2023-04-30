const qs = require('querystring');
const crypto = require('crypto');

import getAllUrlParams from '@functions/getAllUrlParams';

const keys = require('@config/keys.json');

export default function checkSignVk(searchParams: string) {
  const urlParams = getAllUrlParams(searchParams);

  // Получаем все GET параметры с префиксом vk_ и сортируем их
  const ordered:any = {};
  Object.keys(urlParams).sort().forEach((key) => {
    if (key.slice(0, 3) === 'vk_') {
      ordered[key] = urlParams[key];
    }
  });

  // Собираем новую подпись
  const stringParams = qs.stringify(ordered);
  const paramsHash = crypto
    .createHmac('sha256', keys.secretKeyVk)
    .update(stringParams)
    .digest()
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=$/, '');

  return paramsHash === urlParams.sign;
}
