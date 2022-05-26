![tests](https://github.com/babymechanic/url-builder/actions/workflows/run-tests.yml/badge.svg)

# simple-url-builder

A simple url builder which handles.

- uri encoding
- remove params which are null, undefined, [] or ''
- check if mandatory route params are missing
- convert Array, Date types into route params

Example:

```typescript
import { SimpleUrlBuilder } from 'simple-url-builder';

const url = new SimpleUrlBuilder('https://{host}/fruits')
  .addRouteParam('host', 'test.domain')
  .addQueryParam('date', new Date())
  .addQueryParam('ids', [1, 2])
  .addQueryParam('query', 'red')
  .addQueryParam('isAvailable', true)
  .build();

// https://test.domain/fruits?date=2022-05-26T12%3A25%3A56.743Z&ids[0]=1&ids[1]=2&query=red&isAvailable=true
console.log(url);
```

# License

MIT License

Copyright (c) 2022 Mohnish Chowdhury

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
