import { Injectable } from '@angular/core';
import { CLIENT_MOCKS } from '../infrastructure/mocks/client.mock';

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  private authenticated = false;
  private authenticatedClientId: number | null = null;

  login(email: string, password: string): boolean {
    this.authenticated = email === 'admin@corretora.com' && password === 'admin123';
    this.authenticatedClientId = null;
    return this.authenticated;
  }

  loginClient(login: string, password: string, brokerId?: number): number | null {
    const client = CLIENT_MOCKS.find(item => item.login === login && item.password === password && (!brokerId || item.brokerId === brokerId));
    this.authenticated = Boolean(client);
    this.authenticatedClientId = client?.id ?? null;
    return this.authenticatedClientId;
  }

  getAuthenticatedClientId(): number | null { return this.authenticatedClientId; }

  logout(): void { this.authenticated = false; this.authenticatedClientId = null; }
  isAuthenticated(): boolean { return this.authenticated; }
}
