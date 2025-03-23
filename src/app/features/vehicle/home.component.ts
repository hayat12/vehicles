import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "dkv-home",
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <div class="wrapper">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .wrapper {
        display: flex;
        flex-direction: column;
        height: 100vh;
      }
    `,
  ],
})
export class HomeComponent { }
