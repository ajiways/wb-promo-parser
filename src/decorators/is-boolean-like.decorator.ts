import {
  ValidationOptions,
  registerDecorator,
  buildMessage,
} from 'class-validator';

export function IsBooleanLike(
  validationOptions?: ValidationOptions & { isOptional?: boolean },
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isBooleanLike',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (validationOptions.isOptional && !value) {
            return true;
          }

          if (value === 'true' || value === 1 || value === '1') {
            return true;
          }

          return false;
        },
        defaultMessage: buildMessage(
          (eachPrefix) => `${eachPrefix}$property должно быть boolean-like`,
          validationOptions,
        ),
      },
    });
  };
}
