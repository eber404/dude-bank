import {
  Notification,
  NotificationType,
} from 'domain/singletons/notification.ts';

function toEnum(enumerator: any, key: string) {
  const value = enumerator[key];

  if (!value) {
    Notification.add({
      type: NotificationType.ERROR,
      message: `${key} is not a valid ${enumerator.name}`,
    });
  }

  return value ?? null;
}

export const EnumHelper = {
  toEnum,
};
