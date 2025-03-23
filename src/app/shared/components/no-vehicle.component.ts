import { Component, Input } from "@angular/core";

@Component({
  selector: "dkv-no-vehicle",
  standalone: true,
  template: `
    <div class="no-vehicle">
      <h1>No vehicle found</h1>
    </div>`,
  styles: [
    `
    .no-vehicle{
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-around;
      align-items: center;
    }
    `
  ],
})
export class NoVehicleComponent {
  @Input() message: string = "No vehicle found";
}
