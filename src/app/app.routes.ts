import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'seguranca-total' },
	{ path: 'admin/login', loadComponent: () => import('./features/admin/login/admin-login.component').then(({ AdminLoginComponent }) => AdminLoginComponent) },
	{
		path: 'admin',
		loadComponent: () => import('./features/admin/admin-shell.component').then(({ AdminShellComponent }) => AdminShellComponent),
		children: [
			{ path: '', pathMatch: 'full', loadComponent: () => import('./features/admin/home/admin-home.component').then(({ AdminHomeComponent }) => AdminHomeComponent) },
			{ path: 'icones', loadComponent: () => import('./features/admin/icons/admin-icons.component').then(({ AdminIconsComponent }) => AdminIconsComponent) },
			{ path: 'corretoras', loadComponent: () => import('./features/admin/brokers/admin-brokers.component').then(({ AdminBrokersComponent }) => AdminBrokersComponent) }
		]
	},
	{
		path: 'cliente/login/:route',
		loadComponent: () => import('./features/client-area/login/cliente-login.component').then(({ ClienteLoginComponent }) => ClienteLoginComponent) 
	},
	{
		path: ':brokerSlug',
		children: [
			{ path: 'admin/login', loadComponent: () => import('./features/client-admin/login/client-adm-login.component').then(({ ClientAdmLoginComponent }) => ClientAdmLoginComponent) },
			{ path: 'admin/clientes', loadComponent: () => import('./features/client-admin/client-adm.component').then(({ ClientAdmComponent }) => ClientAdmComponent) },
			{
				path: 'cliente',
				children: [
					{ path: 'login', loadComponent: () => import('./features/client-area/login/cliente-login.component').then(({ ClienteLoginComponent }) => ClienteLoginComponent) },
					{
						path: '',
						loadComponent: () => import('./features/client-area/client-shell.component').then(({ ClientShellComponent }) => ClientShellComponent),
						children: [
					{ path: '', pathMatch: 'full', redirectTo: 'painel' },
										{ path: 'painel', loadComponent: () => import('./features/client-area/dashboard/client-dashboard.component').then(({ ClientDashboardComponent }) => ClientDashboardComponent) },
										{ path: 'solicitacoes', loadComponent: () => import('./features/client-area/requests/client-requests.component').then(({ ClientRequestsComponent }) => ClientRequestsComponent) },
										{ path: 'documentos', loadComponent: () => import('./features/client-area/documents/client-documents.component').then(({ ClientDocumentsComponent }) => ClientDocumentsComponent) },
										{ path: 'minha-conta', loadComponent: () => import('./features/client-area/account/client-account.component').then(({ ClientAccountComponent }) => ClientAccountComponent) }
						]
					}
				]
			},
			{ path: '', pathMatch: 'full', loadComponent: () => import('./features/home/home.component').then(({ HomeComponent }) => HomeComponent) }
		]
	}
];
