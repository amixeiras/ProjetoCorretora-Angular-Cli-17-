import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BrokerCatalogService } from '../../core/application/broker-catalog.service';

@Component({
  selector: 'app-home', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './home.component.html', styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly catalog = inject(BrokerCatalogService);
  broker = this.catalog.getBySlug(this.route.snapshot.paramMap.get('brokerSlug'));
  submitted = false;
  readonly quoteForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required], insurance: ['Seguro Auto', Validators.required],
    email: ['', [Validators.required, Validators.email]], phone: ['', Validators.required]
  });

  constructor() {
    this.catalog.brokerUpdated$.subscribe(broker => {
      if (broker.slug === this.route.snapshot.paramMap.get('brokerSlug')) this.broker = broker;
    });
  }

  submitQuote(): void {
    this.submitted = true;
    if (this.quoteForm.invalid) { this.quoteForm.markAllAsTouched(); return; }
    window.dispatchEvent(new CustomEvent('broker-quote-requested', { detail: { broker: this.broker.slug, ...this.quoteForm.getRawValue() } }));
  }

  login(): void {
    window.dispatchEvent(new CustomEvent('broker-login-requested', { detail: { broker: this.broker.slug } }));
  }

}