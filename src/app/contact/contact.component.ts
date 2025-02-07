import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  http = inject(HttpClient);

  contactData = {
    name: "",
    email: "",
    message: "",
  };
  isPolicyChecked: boolean = false;

  mailTest = true;

  post = {
    endPoint: 'https://maximilian-wagener.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && this.isPolicyChecked && !this.mailTest) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
// hier kann noch alles rein, was noch passieren soll z.B feedback an Nutzer das Mail gesendet wurde?
            ngForm.resetForm();
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.isPolicyChecked && this.mailTest) {
      console.log("Hat geklappt!");
      
      ngForm.resetForm();

    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
