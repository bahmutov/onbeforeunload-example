# onbeforeunload-example
![cypress version](https://img.shields.io/badge/cypress-9.5.0-brightgreen) [![ci status][ci image]][ci url] [![badges status][badges image]][badges url] [![renovate-app badge][renovate-badge]][renovate-app]
> Cypress test for a site that uses onbeforeunload and a confirmation prompt

Read [window.onbeforeunload and Cypress](https://glebbahmutov.com/blog/onbeforeunload/)

## Links

Original Cypress issue [#2118](https://github.com/cypress-io/cypress/issues/2118)

## Install and use

- `npm install`
- `npm run dev`
- click on the spec, play with the [cypress/integration tests](cypress/integration) and [the application code](./public).

## Debugger protocol

In DevTools console you can execute the following code, but I did not see it cleanly remove _all_ event listeners

```js
getEventListeners(window).beforeunload
  .forEach(({ type, listener, useCapture }) => {
    console.log('removing', type, listener, useCapture)
    window.removeEventListener(type, listener, useCapture)
  })
```

[Source](https://twitter.com/AndyDavies/status/1359167670873190405)

[ci image]: https://github.com/bahmutov/onbeforeunload-example/workflows/ci/badge.svg?branch=main
[ci url]: https://github.com/bahmutov/onbeforeunload-example/actions
[badges image]: https://github.com/bahmutov/onbeforeunload-example/workflows/badges/badge.svg?branch=main
[badges url]: https://github.com/bahmutov/onbeforeunload-example/actions
[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
