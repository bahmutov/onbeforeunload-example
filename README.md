# onbeforeunload-example
> Cypress test for a site that uses onbeforeunload and a confirmation prompt

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
