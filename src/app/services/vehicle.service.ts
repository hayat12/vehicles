import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from '../features/vehicle/types/vehicle.interface';
import { Params } from '@angular/router';
import { AppConstants } from '../shared/constants/app-constants';
import { SubmissionDataInterface } from '../features/vehicle/add-vehicle/submission-data.interface';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  readonly basedUrl = 'https://67d4273b8bca322cc26c5b38.mockapi.io';
  constructor(private http: HttpClient) { }

  get_vehicle(params: Params): Observable<Vehicle[]> {
    if (!params['page']) {
      params = { ...params, page: 1, limit: AppConstants.PAGE_LIMIT }
    }
    if (!params['order'] || !params['orderby']) {
      params = { ...params, order: "desc", orderby: 'name' }
    }
    return this.http.get<Vehicle[]>(`${this.basedUrl}/vehicles`, { params });
  }

  view_vehicle(id: Vehicle['id']): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.basedUrl}/vehicles/${id}`);
  }

  create_vehicle(payload: SubmissionDataInterface): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.basedUrl}/vehicles`, payload)
  }
}
