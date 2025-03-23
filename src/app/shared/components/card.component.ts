import { Component } from "@angular/core";

@Component({
  selector: "dkv-card",
  standalone: true,
  template: `
    <div class="card">
      <div class="card-header">
        <ng-content select="[card-header]"></ng-content>
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
      <div class="card-footer">
        <ng-content select="[card-footer]"></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      .card {
        background-color: white;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 16px;
      }
    `,
  ],
})
export class CardComponent { }
