![tests](https://github.com/babymechanic/url-builder/actions/workflows/run-tests.yml/badge.svg)

# url-builder

A url builder which handles.

- uri encoding
- remove params which are null, undefined, [] or ''
- check if mandatory route params are missing
- convert Array, Date types into route params

Example:

```typescript
import { UrlBuilder } from 'url-builder';

const url = new UrlBuilder('https://{host}/fruits')
  .addRouteParam('host', 'test.domain')
  .addQueryParam('date', new Date())
  .addQueryParam('ids', [1, 2])
  .addQueryParam('query', 'red')
  .addQueryParam('isAvailable', true)
  .build();

// https://test.domain/fruits?date=2022-05-26T12%3A25%3A56.743Z&ids[0]=1&ids[1]=2&query=red&isAvailable=true
console.log(url);
```

