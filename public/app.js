// window.onbeforeunload = () => {
//   console.log('window on beforeunload')
//   return confirm("test")
// };

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
window.onbeforeunload = function (e) {
  console.log('app window.onbeforeunload')
  // will pop up a confirmation dialog
  // asking the user before navigating away from the page
  // or even simply reloading
  e.returnValue = 'ask user'
  return
}
