window.addEventListener('beforeunload', function (e) {
  console.log('app2 window beforeunload')
  console.log(e)
  // will pop up a confirmation dialog
  // asking the user before navigating away from the page
  // or even simply reloading
  e.preventDefault()
  e.returnValue = ''
  return
})
