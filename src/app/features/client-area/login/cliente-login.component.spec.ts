import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { ClienteLoginComponent } from './cliente-login.component';

describe('ClienteLoginComponent', () => {
  let component: ClienteLoginComponent;
  let fixture: ComponentFixture<ClienteLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteLoginComponent],
      providers: [{
        provide: ActivatedRoute,
        useValue: { snapshot: { paramMap: { get: () => 'seguranca-total' } } }
      }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClienteLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
