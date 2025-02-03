import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // Zustände für jedes Feld
  isNameFocused: boolean = false;
  isEmailFocused: boolean = false;
  isMessageFocused: boolean = false;

  nameValue: string = '';
  emailValue: string = '';
  messageValue: string = '';

  // Fokus- und Blur-Logik
  onFocus(field: string) {
    if (field === 'name') this.isNameFocused = true;
    if (field === 'email') this.isEmailFocused = true;
    if (field === 'message') this.isMessageFocused = true;
  }

  onBlur(field: string) {
    if (field === 'name') this.isNameFocused = false;
    if (field === 'email') this.isEmailFocused = false;
    if (field === 'message') this.isMessageFocused = false;
  }

  // Eingabe-Logik
  onInput(event: Event, field: string) {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    if (field === 'name') this.nameValue = target.value;
    if (field === 'email') this.emailValue = target.value;
    if (field === 'message') this.messageValue = target.value;
  }
}
