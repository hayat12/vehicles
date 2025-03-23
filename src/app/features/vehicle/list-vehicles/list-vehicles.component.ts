import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Vehicle } from '../types/vehicle.interface';
import { NoVehicleComponent } from '../../../shared/components/no-vehicle.component';
import { VehicleComponent } from './item/vehicle.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationComponent } from '../../../shared/components/pagination.component';
import { AppConstants } from '../../../shared/constants/app-constants';
import { ModalService } from '../../../shared/services/modal.service';
import { AddVehicleComponent } from '../add-vehicle/add-vehicle.component';
import { Store } from '@ngrx/store';
import { vehicleActions } from '../../state/vehicle.action';
import { selectData, selectError, selectLoading } from '../../state/vehicle.feature';

@Component({
  selector: 'dkv-list-vehicles',
  standalone: true,
  imports: [CommonModule, NoVehicleComponent, VehicleComponent, PaginationComponent, AddVehicleComponent],
  templateUrl: './list-vehicles.component.html',
  styleUrl: './list-vehicles.component.scss',
})
export class ListVehiclesComponent implements OnInit {
  vehicles$!: Observable<Vehicle[]>;
  error$!: Observable<string | null>;
  loading$!: Observable<boolean>;

  readonly limit: number = AppConstants.PAGE_LIMIT;
  sortList$ = of([
    { value: 'name', label: 'Name' },
    { value: 'model', label: 'Model' },
    { value: 'manufacturer', label: 'Manufacturer' }
  ]);

  constructor(
    private store: Store<{ vehicle: ValidityState }>,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.store.dispatch(vehicleActions.fetchAll({ payload: queryParams }));
    });

    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.vehicles$ = this.store.select(selectData);
  }


  sortVehicles(term: string): void {
    this.updateQueryParams({ sortBy: term });
  }

  navigateToPage(page: number): void {
    this.updateQueryParams({ page: page });
  }

  search(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.updateQueryParams({ search: value });
  }

  onSearch() {
    console.log("key enter works")
  }

  private updateQueryParams(params: any): void {
    let newQueryParams = { ...this.getParams, ...params, limit: AppConstants.PAGE_LIMIT };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: newQueryParams,
      queryParamsHandling: 'merge',
    });
  }


  get currentPage(): number {
    return this.getParams['page'] || 1;
  }

  get getSortBy(): string {
    return this.getParams['sortBy'];
  }
  get getSearch(): string {
    return this.getParams['search'] || "";
  }

  get getParams() {
    return this.route.snapshot.queryParams;
  }

  onNew() {
    this.router.navigate(['dkv/vehicle/create']);
  }

  openModal(modalTemplate: TemplateRef<any>) {
    this.modalService
      .open(modalTemplate, { size: 'lg', title: 'Foo' })
      .subscribe((action) => {
        console.log('modalAction', action);
      });
  }

}
