export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

interface NotificationProps {
  type: NotificationType;
  message: string;
}

export class Notification {
  public readonly notifications: NotificationProps[] = [];
  private readonly instance!: Notification;

  constructor() {
    if (!this.instance) {
      this.instance = new Notification();
    }
  }

  public add(props: NotificationProps): void {
    this.notifications.push(props);
  }
}
