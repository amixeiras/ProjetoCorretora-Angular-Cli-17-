import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BrokerBrand } from '../domain/insurance-broker';
import { BROKER_MOCKS } from '../infrastructure/mocks/broker.mock';

@Injectable({ providedIn: 'root' })
export class BrokerCatalogService {
  private readonly brokers = BROKER_MOCKS;
  readonly brokerUpdated$ = new Subject<BrokerBrand>();

  list(): BrokerBrand[] { return Object.values(this.brokers); }

  save(broker: BrokerBrand): void {
    const savedBroker = { ...broker, products: broker.products.map(product => ({ ...product })) };
    this.brokers[savedBroker.slug] = savedBroker;
    this.brokerUpdated$.next(savedBroker);
    window.dispatchEvent(new CustomEvent('broker-updated', { detail: savedBroker }));
  }

  remove(slug: string): void { delete this.brokers[slug]; }

  getBySlug(slug: string | null): BrokerBrand {
    return this.brokers[slug ?? ''] ?? this.brokers['seguranca-total'];
  }
}

