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

  ngOnInit(): void {
    this.updateTranslation();

    this.translate.onLangChange.subscribe(() => {
      this.updateTranslation();
    });
  }

  updateTranslation(): void {
    this.translate.get('contact.form.policyText').subscribe((text: string) => {
      this.safeDatenschutz = this.sanitizer.bypassSecurityTrustHtml(text);
    });
  }

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

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handlePolicyClick(event: Event): void {
    event.preventDefault();
    const target = event.target as HTMLElement;
    if (target.tagName === 'A' && target.classList.contains('policy-link')) {
      this.router.navigate(['/app-privacypolicy']);
    }
  }
}