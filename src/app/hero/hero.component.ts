import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  email: string = 'maxiwagener@web.de';

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
