import UserModel from "@models/user.model";

export default function CheckUserAuth(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> {
  // Запоминаем исходную функцию
  let originalMethod = descriptor.value;
  // Подменяем ее на нашу обертку
  descriptor.value = async function (req: any, reply: any) {
    const { authorization } = req.headers;

    // Проверяем на существование заголовка
    if (!authorization) {
      throw Error('User header isn\'t exist');
    }

    const user = await UserModel.findOne({
      where: {
        token: authorization
      }
    });

    if (!user) {
      throw Error('Token not valid');
    }

    return originalMethod.apply(target, arguments);
  };
  // Обновляем дескриптор
  return descriptor;
}