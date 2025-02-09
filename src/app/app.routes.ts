import { Routes } from '@angular/router';
import { ImpressumComponent } from './shared/impressum/impressum.component';
import { MainContentComponent } from './main-content/main-content.component';


export const routes: Routes = [
  { path: '', component: MainContentComponent },
  { path: 'app-impressum', component: ImpressumComponent },
];
