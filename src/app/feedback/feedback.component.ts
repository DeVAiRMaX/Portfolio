import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent {

  feedbackState = {
    comment1: {
      text: "Anna hat das Team mit ihrer großartigen Vision und Führungsstärke motiviert. Ohne ihre klare Richtung wären wir nicht so erfolgreich gewesen.",
      author: "J. Müller - Projektleiter",
      image: './assets/img/usercomment1.png' 
    },
    comment2: {
      text: "Lukas hat das Team hervorragend durch schwierige Zeiten geführt. Seine unermüdliche Energie und Kommunikation waren der Schlüssel zu unserem Erfolg.",
      author: "M. Meyer - Senior Entwickler",
      image: './assets/img/usercomment2.png'  
    },
    comment3: {
      text: "Sophie hat das Team mit ihrer außergewöhnlichen Problemlösungsfähigkeit und ihrem Engagement zur Höchstleistung angespornt. Wir haben viel erreicht, dank ihrer Unterstützung.",
      author: "A. Schmidt - Marketing Expertin",
      image: './assets/img/usercomment3.png'
    },
  }

  currentIndex = 0;

  comments = Object.values(this.feedbackState);

  goToPreviousComment(): void {
    this.currentIndex = (this.currentIndex === 0) ? this.comments.length - 1 : this.currentIndex - 1;
  }

  goToNextComment(): void {
    this.currentIndex = (this.currentIndex === this.comments.length - 1) ? 0 : this.currentIndex + 1;
  }


}
