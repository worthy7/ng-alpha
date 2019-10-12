import { TimedDataPoint } from './timed-data-point';

export class TimedDataStream {
    id?: string;
    name: string;
    data: TimedDataPoint[];
}
