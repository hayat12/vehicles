import { Component, Input } from "@angular/core";
import { Vehicle } from "../../types/vehicle.interface";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "dkv-vehicle",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div *ngIf="vehicle" class="vehicle-item">
      <div class="card">
          <div class="car-body">
              <h2 class="car-title">{{vehicle.name}}</h2>
              <p class="car-manufacturer">{{vehicle.manufacturer}}</p>
              <p class="car-model">{{vehicle.model}}</p>
              <p class="car-type">{{vehicle.type}}</p>
          </div>
          <div class="card-footer">
            <a [routerLink]="viewPath">View</a>
          </div>
      </div>
    </div>
  `,
  styles: [
    `
    @import "../../../../shared/styles/variables.scss";
    @import "../../../../shared/styles/shared-style.scss";

    .card {
      display: grid;
      align-items: center;
      background-color: white;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      font-family: sans-serif;
      transition: transform 0.3s ease-in-out;

      & .car-body {
          flex-grow: 1;
      }

      & .car-title {
          margin: 0 0 5px 0;
          font-size: 1em;
      }

      & .car-.manufacturer, .car-model, .car-type {
          margin: 0;
          color: #666;
          font-size: 0.7em;
      }
      & .card-footer{
        @include btn-shared-style;
        border-radius: 20px;
        padding: 10px 15px;
        display: flex;
        align-items: center;
        margin-left: auto;
        & a{
          text-decoration: none;
          color: $primaryColor;
        }

      }

    &:hover{
      transform: scale(1.03);
      opacity: 0.8
    }
  }
    `,
  ],
})
export class VehicleComponent {
  @Input({ required: true }) vehicle!: Vehicle;

  get viewPath(): string {
    return '../view/' + this.vehicle.id;
  }
}
