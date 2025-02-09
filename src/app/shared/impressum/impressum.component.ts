import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-impressum',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.scss'],

})
export class ImpressumComponent {

}
