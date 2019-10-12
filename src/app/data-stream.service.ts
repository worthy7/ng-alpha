import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { TimedDataStream } from './timed-data-stream';
import { TimedDataPoint } from './timed-data-point';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';


@Injectable({
  providedIn: 'root'
})
export class DataStreamService {

  datastreams$: Subject<TimedDataStream[]> = new Subject<TimedDataStream[]>();
  datastreams: TimedDataStream[] = [];

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) {
    this.loadLocalStorage();
  }

  create(name: string, data: TimedDataPoint[]) {
    const inp: TimedDataStream = {
      data,
      name
    };
    this.datastreams.push(inp);
    this.storage.set('data-streams', this.datastreams);
    this.datastreams$.next(this.datastreams);
  }

  public loadLocalStorage() {
    this.datastreams = this.storage.get('data-streams') || [];
    this.datastreams$.next(this.datastreams);
  }

  refresh(){
    this.datastreams$.next(this.datastreams);
  }
  
  delete(id: string) {
    this.datastreams.remove((c) => c.id === id);
    this.storage.set('data-streams', this.datastreams);
    this.datastreams$.next(this.datastreams);
  }
}
