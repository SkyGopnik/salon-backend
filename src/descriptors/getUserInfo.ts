import UserModel from "@models/user.model";

export default function GetUserInfo(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> {
  // Запоминаем исходную функцию
  let originalMethod = descriptor.value;
  // Подменяем ее на нашу обертку
  descriptor.value = async function (req: any, reply: any) {
    const { authorization } = req.headers;

    req.user = await UserModel.findOne({
      where: {
        token: authorization
      }
    });

    return originalMethod.apply(target, arguments);
  };
  // Обновляем дескриптор
  return descriptor;
}