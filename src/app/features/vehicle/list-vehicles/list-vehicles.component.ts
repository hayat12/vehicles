import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Vehicle } from '../types/vehicle.interface';
import { NoVehicleComponent } from '../../../shared/components/no-vehicle.component';
import { VehicleComponent } from './item/vehicle.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationComponent } from '../../../shared/components/pagination.component';
import { AppConstants } from '../../../shared/constants/app-constants';
import { AddVehicleComponent } from '../add-vehicle/add-vehicle.component';
import { Store } from '@ngrx/store';
import { vehicleActions } from '../../state/vehicle.action';
import { selectData, selectError, selectLoading, selectTotalCount } from '../../state/vehicle.feature';
import { OrderTypes, SortDirection } from '../../../shared/enums/sort-direction.enum';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'dkv-list-vehicles',
  standalone: true,
  imports: [CommonModule, MatDialogModule, NoVehicleComponent, VehicleComponent, PaginationComponent, AddVehicleComponent],
  templateUrl: './list-vehicles.component.html',
  styleUrl: './list-vehicles.component.scss',
})
export class ListVehiclesComponent implements OnInit {
  vehicles$!: Observable<Vehicle[]>;
  error$!: Observable<string | null>;
  loading$!: Observable<boolean>;
  totalCount$: Observable<number> = of(0);

  // orderByName: SortDirection = SortDirection.DESC;
  defaultOrderBy: OrderTypes = "title";

  readonly limit: number = AppConstants.PAGE_LIMIT;
  sortList$ = of([
    { value: 'model', label: 'Model' },
    { value: 'manufacturer', label: 'Manufacturer' }
  ]);

  constructor(
    private dialog: MatDialog,
    private store: Store<{ vehicle: ValidityState }>,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.store.dispatch(vehicleActions.fetchAll({ payload: queryParams }));
    });

    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.vehicles$ = this.store.select(selectData);
    this.totalCount$ = this.store.select(selectTotalCount);
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
  get getOrder(): SortDirection {
    return this.getParams['order'] ?? 'desc';
  }
  get getSearch(): string {
    return this.getParams['search'] || "";
  }

  get getParams() {
    return this.route.snapshot.queryParams;
  }

  onNew() {
    this.dialog.open(AddVehicleComponent, {
      width: '60%'
    });
  }

  onOrderBy(): void {
    const order = this.getOrder === SortDirection.DESC ? SortDirection.ASC : this.getOrder == SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
    this.updateQueryParams({
      orderby: this.defaultOrderBy,
      order: order
    })
  }
}
