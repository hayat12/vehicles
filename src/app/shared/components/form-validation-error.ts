import { CommonModule } from "@angular/common";
import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Component(
  {
    selector: 'dkv-form-validation-error',
    standalone: true,
    template: `
    <span class="error-message" *ngIf="control && control.touched && control.invalid">
      {{ getErrorMessage() }}
    </span>
    `,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [
      `
      .error-message{
        font-size: 12px;
        font-family: 'sans-serif';
        color: red;
      }
      `
    ]

  }
)
export class FormValidationErrorComponent implements AfterViewChecked {
  @Input() control: AbstractControl | null = null;
  @Input() customErrors: { [key: string]: string } = {};

  constructor(private cdRef: ChangeDetectorRef) { }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }


  getErrorMessage(): string {
    if (!this.control?.errors) {
      return '';
    }

    const errorKeys = Object.keys(this.control.errors);
    if (errorKeys.length === 0) {
      return '';
    }

    const firstErrorKey = errorKeys[0];

    if (this.customErrors[firstErrorKey]) {
      return this.customErrors[firstErrorKey];
    }

    switch (firstErrorKey) {
      case 'required':
        return 'This field is required.';
      default:
        return 'Validation error.';
    }
  }
}
