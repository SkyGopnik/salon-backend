export default function queryGet(location: string, key: string) {
  const match = location.match(new RegExp(key + '=([^&=]+)'));
  return match ? match[1] : false;
}
