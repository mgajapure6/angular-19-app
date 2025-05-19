import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { StartComponent } from './pages/start/start.component';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ManagementReportComponent } from './pages/management-report/management-report.component';
import { DispatcherReportComponent } from './pages/dispatcher-report/dispatcher-report.component';
import { FactoryConfigComponent } from './pages/factory-config/factory-config.component';
import { PartConfigComponent } from './pages/part-config/part-config.component';
import { ParameterConfigComponent } from './pages/parameter-config/parameter-config.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';

/**
 * Application routes configuration with standalone /auth route and AuthGuard for protected routes.
 */
export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'start', pathMatch: 'full' },
      { 
        path: 'start', 
        component: StartComponent, 
        canActivate: [AuthGuard] 
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'management-report',
        component: ManagementReportComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'dispatcher-report',
        component: DispatcherReportComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'factory-config',
        component: FactoryConfigComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'part-config',
        component: PartConfigComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'parameter-config',
        component: ParameterConfigComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  { path: 'auth', component: AuthComponent }, // Standalone auth route
  { path: '**', component: NotFoundComponent } // Wildcard route for 404
];