import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function StrictValidation(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'strictValidation',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (value === undefined || value === null) {
            return true; // Allow undefined or null values
          }
          const allowedFields = Object.keys(args.object);
          const receivedFields = Object.keys(value);
          return receivedFields.every((field) => allowedFields.includes(field));
        },
        defaultMessage(args: ValidationArguments) {
          return `Invalid properties found: ${Object.keys(args.value)
            .filter((field) => !Object.keys(args.object).includes(field))
            .join(', ')}`;
        },
      },
    });
  };
}
