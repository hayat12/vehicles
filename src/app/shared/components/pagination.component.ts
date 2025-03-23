import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "dkv-pagination",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pagination">
      <button class="btn btn-prev" *ngIf="page > 1" (click)="onPage('prev')">Previous </button>
        <span>Page No _ {{page}} _ </span><button *ngIf="totalVehicles >= limit" class="btn btn-next" (click)="onPage('next')">Next</button>
    </div>
  `,
  styles: [
    `
    @import "../styles/variables";
    @import "../styles/shared-style.scss";
    .pagination {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
          align-items: center;
          gap: 8px;
        & .btn{
          @include btn-shared-style;
          background: white;
          & .custom-divider{
            height: 35px
          }
        }
      }`
  ],
})
export class PaginationComponent {
  @Input({ required: true }) totalVehicles!: number;
  @Input({ required: true }) page!: number;
  @Input({ required: true }) limit!: number;
  @Output() onChanges: EventEmitter<number> = new EventEmitter<number>();

  onPage(to: string): void {
    if (to === 'next') {
      this.page++;
    } else if (to === 'prev') {
      if (this.page > 1) {
        this.page--;
      }
    }
    this.onChanges.emit(this.page);
  }
}
