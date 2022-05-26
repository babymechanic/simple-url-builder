import SimpleUrlBuilder from '../src/simple-url-builder';
import { expect } from 'chai';
import { MissingRouteParamsError } from '../src/missing-route-params-error';

describe('SimpleUrlBuilder', () => {

  it('should be able to construct a url with different param types', function () {
    const date = new Date();
    const builder = new SimpleUrlBuilder('https://{host}/fruits')
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
    const builder = new SimpleUrlBuilder()
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
    const builder = new SimpleUrlBuilder('https://{host}/fruits');

    const expectedErrorMessage = 'Route still contains template params: https://{host}/fruits';
    expect(() => builder.build()).to.throw(MissingRouteParamsError, expectedErrorMessage);
  });

  it('should ignore null query params', function () {
    const builder = new SimpleUrlBuilder('https://test.domain/fruits')
      .addQueryParam('date', null)
      .addQueryParam('ids', [])
      .addQueryParam('query', null)
      .addQueryParam('isAvailable', undefined);

    const url = builder.build();

    expect(url).to.equal('https://test.domain/fruits');
  });


  it('should not append a ? if the base url already has a ?', function () {
    const builder = new SimpleUrlBuilder('https://test.domain/fruits?colour=red').addQueryParam('id', 1);

    const url = builder.build();

    expect(url).to.equal('https://test.domain/fruits?colour=red&id=1');
  });

  [
    {value: null, display: 'null'},
    {value: undefined, display: 'undefined'},
    {value: '', display: 'empty string'}
  ].forEach((testData) => {
    it(`should throw an error if ${testData.display} is passed as value for a route param`, function () {

      const builder = new SimpleUrlBuilder('https://{host}/fruits')
        .addRouteParam('host', testData.value);

      expect(() => builder.build()).to.throw('Route still contains template params: https://{host}/fruits');
    });
  });
});
