import { Routes } from '@angular/router';
import { ImpressumComponent } from './shared/impressum/impressum.component';
import { MainContentComponent } from './main-content/main-content.component';
import { PrivacypolicyComponent } from './shared/privacypolicy/privacypolicy.component';


export const routes: Routes = [
  { path: '', component: MainContentComponent },
  { path: 'app-impressum', component: ImpressumComponent },
  { path: 'app-privacypolicy', component: PrivacypolicyComponent }
];
