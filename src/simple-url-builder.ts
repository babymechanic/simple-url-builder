import { MissingRouteParamsError } from './missing-route-params-error';

const convertToString = (value: string | number | Date | boolean): string => {
  if (value instanceof Date) return encodeURIComponent(value.toISOString());
  return encodeURIComponent(value.toString());
}


type ParamValues = string | number | Date | undefined | null | boolean;

export default class SimpleUrlBuilder {
  private readonly routeParams: { [i: string]: string };
  private readonly queryParams: { [i: string]: string };
  private static readonly templateRegEx = /\{[a-zA-z\d]+\}/;


  constructor(private baseUrl: string = '') {
    this.routeParams = {};
    this.queryParams = {};
  }

  addQueryParam(key: string, value: ParamValues | ParamValues[]): SimpleUrlBuilder {
    if (value == null) return this;
    if (Array.isArray(value)) return this.addArrayValues(value, key);
    this.queryParams[key] = convertToString(value);
    return this;
  }

  private addArrayValues(value: ParamValues[], key: string): SimpleUrlBuilder {
    (value as ParamValues[]).forEach((item: ParamValues, index: number) => {
      if (item == null) return;
      this.queryParams[`${key}[${index}]`] = convertToString(item);
    });
    return this;
  }

  addRouteParam(key: string, value: ParamValues): SimpleUrlBuilder {
    if (value == null || value === '') return this;
    this.routeParams[key] = convertToString(value);
    return this;
  }

  build(): string {
    const route = this.populateRouteParams();
    const queryParams = this.getQueryParams();
    if (route === '') return queryParams;
    if (queryParams == null || queryParams === '') return route;
    if (route.indexOf('?') === -1) return `${route}?${queryParams}`;
    return `${route}&${queryParams}`;
  }

  private getQueryParams(): string {
    const keys = Object.keys(this.queryParams);
    return keys.reduce((acc: string[], key: string) => {
      return acc.concat(`${key}=${this.queryParams[key]}`);
    }, []).join('&');
  }

  private populateRouteParams(): string {
    const keys = Object.keys(this.routeParams);
    const route = keys.reduce((acc: string, key: string) => {
      return acc.replace(`{${key}}`, this.routeParams[key])
    }, this.baseUrl);
    if (SimpleUrlBuilder.templateRegEx.test(route)) {
      throw new MissingRouteParamsError(`Route still contains template params: ${route}`);
    }
    return route;
  }
}
