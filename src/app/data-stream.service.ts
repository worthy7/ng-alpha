import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TimedDataStream } from './timed-data-stream';
import { TimedDataPoint } from './timed-data-point';

@Injectable({
  providedIn: 'root'
})
export class DataStreamService {

  datastreams$: Subject<TimedDataStream[]> = new Subject<TimedDataStream[]>();
  datastreams: TimedDataStream[] = [];

  constructor() { }

  create(name: string, data: TimedDataPoint[]) {
    const inp: TimedDataStream = {
      data,
      name
    };
    this.datastreams.push(inp);
    this.datastreams$.next(this.datastreams);
  }

}
