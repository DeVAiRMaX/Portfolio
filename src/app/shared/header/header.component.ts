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

  /**
   * Initialize the component.
   *
   * Set the language based on the saved value or set it to 'EN' as default.
   * Set the default language and the current language for the translate service.
   *
   * @param renderer The renderer to use for DOM manipulation.
   * @param translate The translate service to use for translation.
   * @param router The router to use for navigation events.
   */
  constructor(
    private renderer: Renderer2,
    private translate: TranslateService,
    private router: Router
  ) {
    const savedLanguage = localStorage.getItem('selectedLanguage') as 'EN' | 'DE' | null;
    if (savedLanguage) {
      this.language = savedLanguage;
    }
    this.translate.setDefaultLang(this.language.toLowerCase());
    this.translate.use(this.language.toLowerCase());
  }

  /**
   * Lifecycle hook: called after Angular has finished initializing the component.
   *
   * Listen to the navigation events and scroll to the section that was specified
   * in the fragment of the url when the url was changed.
   *
   * @remarks
   * We need to wait a short time until the url change is done and the fragment
   * is available. This is done by using setTimeout and waiting for 100ms.
   */
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

  /**
   * Toggles the language of the application between English and German.
   *
   * The new language is stored in local storage.
   */
  toggleLanguage() {
    this.language = this.language === 'DE' ? 'EN' : 'DE';
    this.translate.use(this.language.toLowerCase());
    localStorage.setItem('selectedLanguage', this.language);
  }


  /**
   * Toggles the visibility of the mobile menu.
   *
   * When the menu is opened, the 'show' class is added to the mobile menu and
   * the body is set to 'overflow: hidden' to prevent scrolling.
   * When the menu is closed, the 'show' class is removed from the mobile menu and
   * the body is set to 'overflow: auto' to allow scrolling again.
   */
  showMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const mobileMenu = this.mobileMenu.nativeElement;

    if (this.isMenuOpen) {
      this.renderer.addClass(mobileMenu, 'show');
      this.disableScroll();
    } else {
      this.renderer.removeClass(mobileMenu, 'show');
      this.enableScroll();
    }
  }

  /**
   * Closes the mobile menu by setting `isMenuOpen` to false.
   *
   * Removes the 'show' class from the mobile menu element and
   * enables scrolling by setting the document body overflow to 'auto'.
   */
  closeMenu() {
    this.isMenuOpen = false;
    const mobileMenu = this.mobileMenu.nativeElement;
    this.renderer.removeClass(mobileMenu, 'show');
    this.enableScroll();
  }

  /**
   * Disables page scrolling by setting the document body's overflow style to 'hidden'.
   */
  disableScroll() {
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  /**
   * Enables page scrolling by setting the document body's overflow style to 'auto'.
   */
  enableScroll() {
    this.renderer.setStyle(document.body, 'overflow', 'auto');
  }

  /**
   * Navigates to the main page and scrolls to the specified section.
   *
   * If the current route is not the main page, it stores the section to scroll to in local storage
   * and navigates to the main page. If the current route is the main page, it scrolls to the
   * specified section immediately.
   *
   * @param section The section to scroll to.
   */
  navigateAndScroll(section: string) {
    if (this.router.url !== '/') {
      localStorage.setItem('scrollToSection', section);
      this.router.navigate(['/']);
    } else {
      this.scrollToElement(section, 150);
    }
  }

  /**
   * Scrolls to the given HTML element id with an optional offset.
   *
   * The function first gets the element by its id and then calculates the
   * position of the element on the page. It then scrolls to the calculated
   * position with a smooth animation.
   *
   * @param elementId The id of the element to scroll to.
   * @param offset The offset to apply to the element position before scrolling to it.
   */
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