export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

interface NotificationProps {
  type?: NotificationType;
  message: string;
}

class NotificationSingleton {
  public readonly notifications: NotificationProps[] = [];
  private static _instance: NotificationSingleton;

  private constructor() {}

  static getInstance() {
    if (!this._instance) this._instance = new NotificationSingleton();

    return this._instance;
  }

  public add(props: NotificationProps): void {
    this.notifications.push(props);
  }

  public hasErrors(): boolean {
    return this.notifications.some(
      (notification) => notification.type === NotificationType.ERROR,
    );
  }

  public getErrors(): NotificationProps[] {
    return this.notifications.filter(
      (notification) => notification.type === NotificationType.ERROR,
    );
  }

  public getErrorMessages(): string {
    const errorMessages = this.getErrors().map((notification) =>
      notification.message
    );

    return errorMessages.join(', ');
  }

  public clearNotifications() {
    for (const index in this.notifications) {
      delete this.notifications[index];
    }
  }
}

export const Notification = NotificationSingleton.getInstance();
