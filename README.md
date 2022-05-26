![tests](https://github.com/babymechanic/url-builder/actions/workflows/run-tests.yml/badge.svg)

# url-builder

A type builder to build urls which handles.

- url encoding
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
```

