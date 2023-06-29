export interface IWeather {
  date: string | Date;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
export function isWeather(obj: unknown): obj is IWeather {
  if (
    obj &&
    typeof obj === 'object' &&
    'date' in obj &&
    'temperatureC' in obj &&
    'temperatureF' in obj &&
    'summary' in obj
  ) {
    return true;
  } else {
    return false;
  }
}
