import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Observable, of } from 'rxjs';
import { Vehicle } from '../types/vehicle.interface';
import { NoVehicleComponent } from '../../../shared/components/no-vehicle.component';
import { Store } from '@ngrx/store';
import { selectError, selectLoading, selectSelected, VehicleState } from '../../state/vehicle.feature';
import { vehicleActions } from '../../state/vehicle.action';

@Component({
  selector: 'dkv-view-vehicle',
  standalone: true,
  imports: [CommonModule, NoVehicleComponent],
  templateUrl: './view-vehicle.component.html',
  styleUrl: './view-vehicle.component.scss'
})
export class ViewVehicleComponent implements OnInit {
  vehicle$!: Observable<Vehicle | null>;
  error$!: Observable<string | null>;
  loading$!: Observable<boolean>;
  constructor(
    private store: Store<{ vehicle: VehicleState }>,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']
    if (!!id) {
      this.store.dispatch(vehicleActions.view({ payload: id }));
      this.vehicle$ = this.store.select(selectSelected);
      this.error$ = this.store.select(selectError)
      this.loading$ = this.store.select(selectLoading)
    } else {
      this.error$ = of("Invalid vehicle id or this vehicle not found")
    }
  }
  onBack(): void {
    this.router.navigate(['../../list'], { relativeTo: this.route })
  }

}
