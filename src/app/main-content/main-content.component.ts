import { Component, HostListener } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { AboutmeComponent } from '../aboutme/aboutme.component';
import { SkillsComponent } from '../skills/skills.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { FeedbackComponent } from '../feedback/feedback.component';
import { ContactComponent } from '../contact/contact.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ImpressumComponent } from '../shared/impressum/impressum.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    AboutmeComponent,
    SkillsComponent,
    PortfolioComponent,
    FeedbackComponent,
    ContactComponent,
    ImpressumComponent
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
  animations: [
    trigger('scrollAnimation', [
      state('hidden', style({ opacity: 0, transform: 'scale(0.9)' })),  // Verkleinere das Element
      state('visible', style({ opacity: 1, transform: 'scale(1)' })),
      transition('hidden => visible', animate('0.6s ease-out'))
    ]),
    trigger('scrollAnimationRight', [
      state('hidden', style({ opacity: 0, transform: 'scale(0.9)' })),  // Verkleinere das Element
      state('visible', style({ opacity: 1, transform: 'scale(1)' })),
      transition('hidden => visible', animate('0.6s ease-out'))
    ])
  ]
})
export class MainContentComponent {

  aboutMeState = 'hidden';
  skillsState = 'hidden';
  portfolioState = 'hidden';
  feedbackState = 'hidden';
  contactState = 'hidden';

  ngOnInit() {
    if (window.innerWidth <= 450) {
      this.aboutMeState = 'visible';
      this.skillsState = 'visible';
      this.portfolioState = 'visible';
      this.feedbackState = 'visible';
      this.contactState = 'visible';
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (window.innerWidth > 450) {
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
  }

  checkVisibility(selector: string, callback: (visible: boolean) => void) {
    const element = document.querySelector(selector);
    if (element) {
      const rect = element.getBoundingClientRect();
      callback(rect.top < window.innerHeight * 0.75);
    }
  }
}