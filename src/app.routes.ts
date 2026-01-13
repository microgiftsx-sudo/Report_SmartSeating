import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TermsComponent } from './app/terms/terms.component';
import { PrivacyComponent } from './app/privacy/privacy.component';

export const routes: Routes = [
  { path: '', component: AppComponent, pathMatch: 'full' },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: '**', redirectTo: '' }
];
