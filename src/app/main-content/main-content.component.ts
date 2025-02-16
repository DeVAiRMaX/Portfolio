import { Component, HostListener } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { AboutmeComponent } from '../aboutme/aboutme.component';
import { SkillsComponent } from '../skills/skills.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { FeedbackComponent } from '../feedback/feedback.component';
import { ContactComponent } from '../contact/contact.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CommonModule } from '@angular/common';

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
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
  animations: [
    trigger('scrollAnimation', [
      state('hidden', style({ opacity: 0, transform: 'scale(0.9)' })),
      state('visible', style({ opacity: 1, transform: 'scale(1)' })),
      transition('hidden => visible', animate('0.6s ease-out'))
    ]),
    trigger('scrollAnimationRight', [
      state('hidden', style({ opacity: 0, transform: 'scale(0.9)' })),
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
  private resizeInterval: any;

  /**
   * Starts the resize listener and checks the screen size once.
   * The resize listener will check the screen size every 500ms.
   * If the screen size is smaller than 450px, all sections will be set to visible.
   */
  ngOnInit() {
    this.checkScreenSize();
    this.startResizeListener();
  }

  /**
   * Clears the resize interval when the component is destroyed.
   * This is necessary to prevent a memory leak.
   */
  ngOnDestroy() {
    if (this.resizeInterval) {
      clearInterval(this.resizeInterval);
    }
  }

  /**
   * Starts a resize listener that checks the screen size every 500ms.
   * If the screen size is smaller than 450px, all sections will be set to visible.
   * The interval will be cleared when the component is destroyed.
   */
  private startResizeListener(): void {
    this.resizeInterval = setInterval(() => {
      this.checkScreenSize();
    }, 500);
  }

  /**
   * Checks the screen size and sets all sections to visible if the screen size
   * is smaller than or equal to 450px.
   */
  private checkScreenSize(): void {
    if (window.innerWidth <= 450) {
      this.aboutMeState = 'visible';
      this.skillsState = 'visible';
      this.portfolioState = 'visible';
      this.feedbackState = 'visible';
      this.contactState = 'visible';
    }
  }

  @HostListener('window:scroll', ['$event'])
  
  /**
   * Checks the visibility of the sections and sets the state accordingly.
   * This method is called on window scroll.
   * If the screen size is smaller than or equal to 450px, all sections will be set to visible.
   */
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

  /**
   * Checks the visibility of a DOM element based on its selector.
   * Calls the provided callback with a boolean indicating whether the element is visible.
   * An element is considered visible if its top is within 75% of the window's height.
   *
   * @param selector - The CSS selector of the element to check.
   * @param callback - The callback function to execute with the visibility result.
   */
  checkVisibility(selector: string, callback: (visible: boolean) => void) {
    const element = document.querySelector(selector);
    if (element) {
      const rect = element.getBoundingClientRect();
      callback(rect.top < window.innerHeight * 0.75);
    }
  }
}