import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TranslateModule, RouterOutlet, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hideImages = false;
  constructor(private translate: TranslateService, private router: Router) {
    this.translate.setDefaultLang('de');
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.hideImages = event.url.includes('/app-impressum') || event.url.includes('/app-privacypolicy');
      }
    });
  }
}