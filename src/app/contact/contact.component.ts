import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  http = inject(HttpClient);
  sanitizer = inject(DomSanitizer);
  translate = inject(TranslateService);
  router = inject(Router);

  contactData = {
    name: "",
    email: "",
    message: "",
  };

  isPolicyChecked: boolean = false;
  showFeedback = false;
  safeDatenschutz: SafeHtml = "";

  constructor() { }

  /**
   * Lifecycle hook that is called when the component is initialized.
   *
   * Subscribes to the language change event of the TranslateService and
   * updates the privacy policy text accordingly.
   */
  ngOnInit(): void {
    this.updateTranslation();

    this.translate.onLangChange.subscribe(() => {
      this.updateTranslation();
    });
  }

  /**
   * Subscribes to the language change event of the TranslateService and
   * updates the privacy policy text accordingly.
   *
   * It gets the translation of the 'contact.form.policyText' key and
   * bypasses the security trust of the DOM sanitizer to display the
   * translation as HTML.
   */
  updateTranslation(): void {
    this.translate.get('contact.form.policyText').subscribe((text: string) => {
      this.safeDatenschutz = this.sanitizer.bypassSecurityTrustHtml(text);
    });
  }

  /**
   * Handles form submission for the contact form.
   *
   * @param ngForm - The form object containing form controls and validation status.
   *
   * If the form is submitted, valid, and the policy is checked, sends a POST request
   * to the specified URL with the contact data. Displays a feedback message upon success
   * and resets the form after a timeout. Logs errors to the console if the request fails.
   */
  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && this.isPolicyChecked) {
      this.http.post('https://maximilian-wagener.de/sendMail.php', JSON.stringify(this.contactData))
        .subscribe({
          next: (response) => {
            this.showFeedback = true;
            setTimeout(() => {
              ngForm.resetForm();
              this.showFeedback = false;
            }, 2000);
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    }
  }

  /**
   * Scrolls the window to the top of the page with a smooth animation.
   *
   * @remarks
   * Use this method to scroll to the top of the page when the user clicks on
   * a link that should scroll to the top of the page.
   */
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Handles a click on a link with the class 'policy-link'.
   *
   * Prevents the default link behavior and navigates to the privacy policy page.
   *
   * @param event - The click event.
   */
  handlePolicyClick(event: Event): void {
    event.preventDefault();
    const target = event.target as HTMLElement;
    if (target.tagName === 'A' && target.classList.contains('policy-link')) {
      this.router.navigate(['/app-privacypolicy']);
    }
  }
}