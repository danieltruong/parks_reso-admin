import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '../shared/utils/constants';
import { ApiService } from './api.service';
import { EventKeywords, EventObject, EventService } from './event.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class MetricService {
  constructor(
    private apiService: ApiService,
    private eventService: EventService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async fetchData(metric): Promise<any> {
    let errorSubject = '';

    try {
      return await this.apiService.get('metric', { type: metric });
    } catch (e) {
      this.toastService.addMessage(
        `An error has occured while getting ${errorSubject}.`,
        'Pass Service',
        Constants.ToastTypes.ERROR
      );
      this.eventService.setError(
        new EventObject(EventKeywords.ERROR, e as string, 'Metric Service')
      );
      this.router.navigate(['../', { relativeTo: this.route }]);
    }
  }
}
