import { Component } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [FooterComponent, NavComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
