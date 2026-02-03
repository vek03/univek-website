import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ɵɵRouterLink } from "@angular/router/testing";

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, ɵɵRouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}
