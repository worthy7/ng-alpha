import { Component, OnInit } from '@angular/core';
import { Papa, ParseResult } from 'ngx-papaparse';
import { DataStreamService } from '../data-stream.service';
import { TimedDataStream } from '../timed-data-stream';
import { Observable } from 'rxjs';
import { TimedDataPoint } from '../timed-data-point';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-data-stream-manager',
  templateUrl: './data-stream-manager.component.html',
  styleUrls: ['./data-stream-manager.component.css']
})
export class DataStreamManagerComponent implements OnInit {
  datastreams$: Observable<TimedDataStream[]>;
  datastreams: TimedDataStream[];

  // chart
  charttype = 'line';
  chartdata = {
    labels: [],
    datasets: [
      {
        label: '',
        data: [5]
      }
    ]
  };
  chartoptions = {
    responsive: true,
    maintainAspectRatio: false,
      scales: {
          xAxes: [{
              type: 'time',
          }]
      }
  };


  constructor(
    private dsService: DataStreamService,
    private papa: Papa) {
    this.dsService.datastreams$.subscribe(c => this.datastreams = c);
  }

  ngOnInit() {
    this.dsService.refresh();
  }

  refresh() {
    this.dsService.refresh();
  }
  delete(id: string) {
    this.dsService.delete(id);
  }

  loadFile(file: File) {

    const name = file.name;

    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {

      this.papa.parse(event.target.result, {
        header: false, // ignore the header so it doesn't mess with the array
        dynamicTyping: true,
        complete: (result: ParseResult) => {

          const newdatastream: TimedDataPoint[] = result.data.map((element, index, array) => {
            const pd = DateTime.fromISO(element[0]).toJSDate();
            return {
              datetime: pd,
              value: element[1]
            } as TimedDataPoint;
          });
          this.dsService.create(file.name, newdatastream);
          console.log(newdatastream);
        }
      });
    });
    reader.readAsText(file);
  }

  onFileChanged(imageInput: FileList) {

    Array.from(imageInput).forEach(file => {
      this.loadFile(file);
    });
  }

  chart(id: string) {
    const dat = this.dsService.get(id);
    this.chartdata = {
      labels: dat.data.map(d => d.datetime),
      datasets: [
        {
          label: dat.name,
          data: dat.data.map(d => d.value)
        }
      ]
    };
  }

}
