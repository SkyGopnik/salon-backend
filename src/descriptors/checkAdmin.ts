import AuthService from "@services/auth";

export default function CheckAdmin(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> {
  // Запоминаем исходную функцию
  let originalMethod = descriptor.value;
  // Подменяем ее на нашу обертку
  descriptor.value = function (req: any, reply: any) {
    const { user } = req.headers;

    const info = AuthService.getInfo(user);

    if (!info) {
      throw Error('User isn\'t exist');
    }

    const userId = info.id;

    if (!["126399522", "398377870"].includes(userId)) {
      throw Error("User not admin");
    }

    return originalMethod.apply(target, arguments);
  };
  // Обновляем дескриптор
  return descriptor;
}
