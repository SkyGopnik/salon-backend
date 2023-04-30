export default function getAllUrlParams(url: string) {
  // извлекаем строку из URL
  let queryString = url;

  // объект для хранения параметров
  const obj:any = {};

  // если есть строка запроса
  if (queryString) {
    // данные после знака # будут опущены
    // eslint-disable-next-line prefer-destructuring
    queryString = queryString.split('#')[0];

    // разделяем параметры
    const arr = queryString.split('&');

    for (let i = 0; i < arr.length; i++) {
      // разделяем параметр на ключ => значение
      const a = arr[i].split('=');

      // обработка данных вида: list[]=thing1&list[]=thing2
      const paramNum = '';
      const paramName = a[0].replace(/\[\d*\]/, (v: string) => v.slice(1, -1));

      // передача значения параметра ('true' если значение не задано)
      const paramValue = decodeURIComponent(a[1]);

      // если ключ параметра уже задан
      if (obj[paramName]) {
        // преобразуем текущее значение в массив
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        // если не задан индекс...
        if (typeof paramNum === 'undefined') {
          // помещаем значение в конец массива
          obj[paramName].push(paramValue);
        } else {
          // размещаем элемент по заданному индексу
          obj[paramName][paramNum] = paramValue;
        }
      } else {
        obj[paramName] = paramValue;
      }
    }
  }

  return obj;
}
