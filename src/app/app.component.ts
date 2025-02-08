import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { HeroComponent } from './hero/hero.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { SkillsComponent } from './skills/skills.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './shared/footer/footer.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TranslateModule, RouterOutlet, CommonModule, HeaderComponent, HeroComponent, AboutmeComponent, SkillsComponent, PortfolioComponent, FeedbackComponent, ContactComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('scrollAnimation', [
      state('hidden', style({ opacity: 0, transform: 'translateX(-100px)' })),
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hidden => visible', animate('0.6s ease-out'))
    ]),
    trigger('scrollAnimationRight', [
      state('hidden', style({ opacity: 0, transform: 'translateX(100px)' })),
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hidden => visible', animate('0.6s ease-out'))
    ])
  ]
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('de');
  }

  aboutMeState = 'hidden';
  skillsState = 'hidden';
  portfolioState = 'hidden';
  feedbackState = 'hidden';
  contactState = 'hidden';

  @HostListener('window:scroll', ['$event'])
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.checkVisibility('.about-me', (visible) => {
      this.aboutMeState = visible ? 'visible' : 'hidden';

    });

    this.checkVisibility('.skills', (visible) => {
      this.skillsState = visible ? 'visible' : 'hidden';

    });

    this.checkVisibility('.portfolio', (visible) => {
      this.portfolioState = visible ? 'visible' : 'hidden';

    });

    this.checkVisibility('.feedback', (visible) => {
      this.feedbackState = visible ? 'visible' : 'hidden';

    });

    this.checkVisibility('.contact', (visible) => {
      this.contactState = visible ? 'visible' : 'hidden';

    });
  }


  checkVisibility(selector: string, callback: (visible: boolean) => void) {
    const element = document.querySelector(selector);
    if (element) {
      const rect = element.getBoundingClientRect();
      callback(rect.top < window.innerHeight * 0.75);
    }
  }
}
