import { Pipe, PipeTransform } from '@angular/core';
import { Vehicle } from '../../features/vehicle/types/vehicle.interface';
import { SortDirection } from '../enums/sort-direction.enum';

@Pipe({
  name: 'orderBy',
  standalone: true
})
export class OderByPipe implements PipeTransform {

  transform(value: Vehicle[], order: SortDirection = SortDirection.DESC): Vehicle[] {
    if (!value) {
      return [];
    }

    const sortedArray = [...value];
    return sortedArray.sort((a, b) => {
      if (order === SortDirection.ASC) {
        return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
      } else if (order === SortDirection.DESC) {
        return b.name > a.name ? 1 : b.name < a.name ? -1 : 0;
      }
      return 0;
    });
  }

}
