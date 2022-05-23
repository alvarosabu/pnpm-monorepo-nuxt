module.exports = function getWindowOf(element) {
  var doc = (element.ownerDocument || element)
  return ('defaultView' in doc ? doc.defaultView : doc.parentWindow)
}