import UrlBuilder from '../src/url-builder';
import { expect } from 'chai';
import { MissingRouteParamsError } from '../src/missing-route-params-error';

describe('UrlBuilder', () => {

  it('should be able to construct a url with different param types', function () {
    const date = new Date();
    const builder = new UrlBuilder('https://{host}/fruits')
      .addRouteParam('host', 'test.domain')
      .addQueryParam('date', date)
      .addQueryParam('ids', [1, 2])
      .addQueryParam('query', 'red')
      .addQueryParam('isAvailable', true);

    const url = builder.build();

    const dateEncoded = encodeURIComponent(date.toISOString());
    expect(url).to.equal(`https://test.domain/fruits?date=${dateEncoded}&ids[0]=1&ids[1]=2&query=red&isAvailable=true`)
  });


  it('should be able to deal with not having a base url', function () {
    const date = new Date();
    const builder = new UrlBuilder()
      .addRouteParam('host', 'test.domain')
      .addQueryParam('date', date)
      .addQueryParam('ids', [1, 2])
      .addQueryParam('query', 'red')
      .addQueryParam('isAvailable', true);

    const url = builder.build();

    const dateEncoded = encodeURIComponent(date.toISOString());
    expect(url).to.equal(`date=${dateEncoded}&ids[0]=1&ids[1]=2&query=red&isAvailable=true`)
  });


  it('should throw an error if route params are missing', function () {
    const builder = new UrlBuilder('https://{host}/fruits');

    const expectedErrorMessage = 'Route still contains template params: https://{host}/fruits';
    expect(() => builder.build()).to.throw(MissingRouteParamsError, expectedErrorMessage);
  });


  [null, ''].forEach((testValue) => {

    it(`should throw an error if ${JSON.stringify(testValue)} is passed as value for a route param`, function () {
      const builder = new UrlBuilder('https://{host}/fruits').addRouteParam('host', testValue);

      const expectedErrorMessage = 'Route still contains template params: https://{host}/fruits';
      expect(() => builder.build()).to.throw(MissingRouteParamsError, expectedErrorMessage);
    });

  });

  it(`should throw an error if  is passed as value for a route param`, function () {
    const builder = new UrlBuilder('https://{host}/fruits').addRouteParam('host', null);

    const expectedErrorMessage = 'Route still contains template params: https://{host}/fruits';
    expect(() => {
      const url = builder.build();
      return url;
    }).to.throw(MissingRouteParamsError, expectedErrorMessage);
  });


  it('should ignore null query params', function () {
    const builder = new UrlBuilder('https://test.domain/fruits')
      .addQueryParam('date', null)
      .addQueryParam('ids', [])
      .addQueryParam('query', null)
      .addQueryParam('isAvailable', undefined);

    const url = builder.build();

    expect(url).to.equal('https://test.domain/fruits');
  });


  it('should not append a ? if the base url already has a ?', function () {
    const builder = new UrlBuilder('https://test.domain/fruits?colour=red').addQueryParam('id', 1);

    const url = builder.build();

    expect(url).to.equal('https://test.domain/fruits?colour=red&id=1');
  });


});
