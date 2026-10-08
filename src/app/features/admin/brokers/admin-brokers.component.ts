import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../../core/application/admin-auth.service';
import { BrokerCatalogService } from '../../../core/application/broker-catalog.service';
import { InsuranceIconService } from '../../../core/application/insurance-icon.service';
import { BrokerBrand, InsuranceProduct } from '../../../core/domain/insurance-broker';

@Component({ selector: 'app-admin-brokers', standalone: true, imports: [CommonModule, FormsModule, ReactiveFormsModule], templateUrl: './admin-brokers.component.html', styleUrl: './admin-brokers.component.scss' })
export class AdminBrokersComponent {
  private readonly catalog = inject(BrokerCatalogService);
  private readonly auth = inject(AdminAuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly iconService = inject(InsuranceIconService);
  readonly iconOptions = this.iconService.list();
  brokers: BrokerBrand[] = this.catalog.list();
  editingSlug: string | null = null;
  formVisible = false;
  error = '';
  productDrafts: InsuranceProduct[] = [];
  readonly editingProducts = new Set<number>();
  readonly form = this.formBuilder.nonNullable.group({
    id: [0, Validators.required], slug: ['', Validators.required], name: ['', Validators.required], logoUrl: ['', Validators.required], tagline: ['', Validators.required],
    headline: ['', Validators.required], headlineAccent: ['', Validators.required], intro: ['', Validators.required], phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]], primaryColor: ['#087b4b', Validators.required], secondaryColor: ['#0d4f79', Validators.required]
  });

  constructor() { if (!this.auth.isAuthenticated()) this.router.navigateByUrl('/admin/login'); }

  newBroker(): void {
    this.editingSlug = null; this.error = ''; this.productDrafts = []; this.editingProducts.clear();
    this.form.reset({ id: Math.max(0, ...this.brokers.map(item => item.id)) + 1, slug: '', name: '', logoUrl: '', tagline: '', headline: '', headlineAccent: '', intro: '', phone: '', email: '', primaryColor: '#087b4b', secondaryColor: '#0d4f79' });
    this.formVisible = true;
  }

  editBroker(broker: BrokerBrand): void { this.editingSlug = broker.slug; this.error = ''; this.productDrafts = broker.products.map(product => { const icon = this.iconOptions.find(option => option.id === product.iconId || option.value === product.icon); return { ...product, iconId: icon?.id ?? (typeof product.iconId === 'number' ? product.iconId : undefined), icon: icon?.symbol ?? product.icon }; }); this.editingProducts.clear(); this.form.patchValue(broker); this.formVisible = true; }
  addProduct(): void { const icon = this.iconOptions[0]; this.productDrafts = [{ icon: icon?.symbol ?? '', iconId: icon?.id ?? 0, name: '', description: '' }, ...this.productDrafts]; this.editingProducts.clear(); this.editingProducts.add(0); }
  toggleProductEdit(index: number): void { if (this.editingProducts.has(index)) this.editingProducts.delete(index); else this.editingProducts.add(index); }
  isProductEditing(index: number): boolean { return this.editingProducts.has(index); }
  iconPreview(iconId: number | undefined): string { return this.iconOptions.find(icon => icon.id === Number(iconId))?.symbol ?? ''; }
  removeProduct(index: number): void { this.productDrafts = this.productDrafts.filter((_, itemIndex) => itemIndex !== index); }
  updateProduct(index: number, field: keyof InsuranceProduct, event: Event): void { const value = (event.target as HTMLInputElement | HTMLTextAreaElement).value; this.productDrafts = this.productDrafts.map((product, itemIndex) => itemIndex === index ? { ...product, [field]: value } : product); }
  updateIcon(index: number, iconId: number): void { const icon = this.iconOptions.find(option => option.id === Number(iconId)); if (!icon) return; this.productDrafts = this.productDrafts.map((product, itemIndex) => itemIndex === index ? { ...product, iconId: icon.id, icon: icon.symbol } : product); }

  save(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    if (this.productDrafts.some(product => !product.icon || !product.name || !product.description)) { this.error = 'Preencha o ícone, nome e descrição de todos os produtos.'; return; }
    const value = this.form.getRawValue();
    const broker: BrokerBrand = { ...value, products: this.productDrafts };
    if (this.editingSlug && this.editingSlug !== broker.slug) this.catalog.remove(this.editingSlug);
    this.catalog.save(broker); this.brokers = this.catalog.list(); this.productDrafts = broker.products.map(product => ({ ...product })); this.formVisible = false; this.router.navigateByUrl('/admin');
  }

  remove(broker: BrokerBrand): void { if (window.confirm(`Excluir a corretora ${broker.name}?`)) { this.catalog.remove(broker.slug); this.brokers = this.catalog.list(); } }
  logout(): void { this.auth.logout(); this.router.navigateByUrl('/admin/login'); }
}
