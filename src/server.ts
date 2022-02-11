import {
  Notification,
  NotificationType,
} from './domain/entities/notification.ts';

const notification = new Notification();

notification.add({
  message: 'teste',
  type: NotificationType.SUCCESS,
});
