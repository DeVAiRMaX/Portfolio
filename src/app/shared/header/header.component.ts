import { Component, ElementRef, Renderer2, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @ViewChild('mobileMenu') mobileMenu!: ElementRef;

  isMenuOpen = false;
  language: 'EN' | 'DE' = 'EN';

  constructor(
    private renderer: Renderer2,
    private translate: TranslateService,
    private router: Router
  ) {
    this.translate.setDefaultLang(this.language.toLowerCase());
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const fragment = localStorage.getItem('scrollToSection');
        if (fragment) {
          setTimeout(() => this.scrollToElement(fragment, 100), 100);
          localStorage.removeItem('scrollToSection');
        }
      }
    });
  }

  toggleLanguage() {
    this.language = this.language === 'DE' ? 'EN' : 'DE';
    this.translate.use(this.language.toLowerCase());
  }

  showMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const mobileMenu = this.mobileMenu.nativeElement;

    if (this.isMenuOpen) {
      this.renderer.addClass(mobileMenu, 'show');
    } else {
      this.renderer.removeClass(mobileMenu, 'show');
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    const mobileMenu = this.mobileMenu.nativeElement;
    this.renderer.removeClass(mobileMenu, 'show');
  }

  navigateAndScroll(section: string) {
    if (this.router.url !== '/') {
      // Falls wir nicht auf "/" sind, speichere die Sektion und navigiere zuerst
      localStorage.setItem('scrollToSection', section);
      this.router.navigate(['/']);
    } else {
      // Falls wir schon auf "/", direkt scrollen
      this.scrollToElement(section, 100);
    }
  }

  scrollToElement(elementId: string, offset: number = 0): void {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}
