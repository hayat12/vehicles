import { Component } from "@angular/core";

@Component({
  selector: "app-wrapper",
  template: `
    <div class="wrapper">
      <ng-content select="[selector]"></ng-content>
    </div>
  `,
  styles: [
    `
      .wrapper {
        display: flex;
        flex-direction: column;
        height: 100vh;
      }
    `, // Add styles here
  ],
})
export class WrapperComponent { }
