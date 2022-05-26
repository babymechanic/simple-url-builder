export class MissingRouteParamsError extends Error {

  constructor(message: string) {
    super(message);
    this.name = 'MissingRouteParamsError';
  }

}
