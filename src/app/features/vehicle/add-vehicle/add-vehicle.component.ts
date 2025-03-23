import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubmissionDataInterface } from './submission-data.interface';
import { Observable } from 'rxjs';
import { FormValidationErrorComponent } from '../../../shared/components/form-validation-error';
import { Store } from '@ngrx/store';
import { selectData, selectError, selectLoading, VehicleState } from '../../state/vehicle.feature';
import { vehicleActions } from '../../state/vehicle.action';
import { Vehicle } from '../types/vehicle.interface';

@Component({
  selector: 'dkv-add-vehicle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, FormValidationErrorComponent],
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.scss'
})
export class AddVehicleComponent {
  form = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      manufacturer: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      fuel: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      vin: new FormControl('', [Validators.required]),
      color: new FormControl(''),
      mileage: new FormControl('')
    }
  );

  error$!: Observable<string | null>;
  loading$!: Observable<boolean>
  constructor(
    private router: Router,
    private store: Store<{ vehicle: VehicleState }>,
    private route: ActivatedRoute) { }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: SubmissionDataInterface = {
      name: this.form.value.name || '',
      manufacturer: this.form.value.manufacturer || '',
      model: this.form.value.model || '',
      fuel: this.form.value.fuel || '',
      type: this.form.value.type || '',
      vin: this.form.value.vin || '',
      color: this.form.value.color || '',
      mileage: this.form.value.mileage || ''
    };
    this.store.dispatch(vehicleActions.create({ payload }));
    this.error$ = this.store.select(selectError);
    this.loading$ = this.store.select(selectLoading);
  }

  onBack() {
    this.router.navigate(['../list'], { relativeTo: this.route })
  }
}
