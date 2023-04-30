import AuthService from "@services/auth";

export default function CheckUserAuth(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> {
  // Запоминаем исходную функцию
  let originalMethod = descriptor.value;
  // Подменяем ее на нашу обертку
  descriptor.value = function (req: any, reply: any) {
    const { user } = req.headers;

    // Проверяем на существование заголовка
    if (user) {
      AuthService.validateUser(user);
    } else {
      throw Error('User header isn\'t exist');
    }
    // console.log(request.query);
    return originalMethod.apply(target, arguments);
  };
  // Обновляем дескриптор
  return descriptor;
}
