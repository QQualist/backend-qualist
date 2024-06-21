import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsFutureDate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isFutureDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (value instanceof Date) {
            return value >= new Date();
          }
          return false;
        },
        defaultMessage() {
          return 'Date must be equal to or greater than the current date';
        },
      },
    });
  };
}
