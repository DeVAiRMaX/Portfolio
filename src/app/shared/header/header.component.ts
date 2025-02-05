import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @ViewChild('mobileMenu') mobileMenu!: ElementRef;

  isMenuOpen = false;

  language: 'EN' | 'DE' = 'EN';

  constructor(private renderer: Renderer2, private translate: TranslateService) {
    this.translate.setDefaultLang(this.language.toLowerCase());
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
