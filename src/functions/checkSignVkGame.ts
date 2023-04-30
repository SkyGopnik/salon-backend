const md5 = require('md5');

const keys = require('@config/keys.json');

export default function checkSignVkGame(searchParams: string) {
  const url = new URL(searchParams);
  const search = url.searchParams;

  const auth_key = md5(search.get('api_id') + '_' + search.get('viewer_id') + '_' + keys.secretKeyVkGame);

  return auth_key === search.get('auth_key');
}
