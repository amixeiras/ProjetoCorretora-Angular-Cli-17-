import { Injectable, signal } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'alert';

export interface NotificationState {
  message: string;
  type: NotificationType;
  action?: () => void;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly state = signal<NotificationState | null>(null);
  readonly notification = this.state.asReadonly();

  show(message: string, type: NotificationType = 'alert', action?: () => void): void {
    this.state.set({ message, type, action });
  }

  success(message: string): void {
    this.show(message, 'success');
  }

  alert(message: string, action?: () => void): void {
    this.show(message, 'alert', action);
  }

  confirm(): void {
    const action = this.state()?.action;
    this.close();
    action?.();
  }

  close(): void {
    this.state.set(null);
  }
}
