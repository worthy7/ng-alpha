import { Component, OnInit } from '@angular/core';
import { Papa, ParseResult } from 'ngx-papaparse';
import { DataStreamService } from '../data-stream.service';
import { TimedDataStream } from '../timed-data-stream';
import { Observable } from 'rxjs';
import { TimedDataPoint } from '../timed-data-point';
@Component({
  selector: 'app-data-stream-manager',
  templateUrl: './data-stream-manager.component.html',
  styleUrls: ['./data-stream-manager.component.css']
})
export class DataStreamManagerComponent implements OnInit {
  datastreams$: Observable<TimedDataStream[]>;

  constructor(
    private dsService: DataStreamService,
    private papa: Papa) {

    this.datastreams$ = this.dsService.datastreams$;
  }

  ngOnInit() {
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
            return {
              datetime: element[0],
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

}
