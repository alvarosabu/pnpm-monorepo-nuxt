var on = require('./on'),
  recall = require('std/recall')

module.exports = function waitForImage(img, callback) {
  if (!img || img.tagName != 'IMG') { return }
  // IE supports readyState - others support complete
  var hasReadyState = ('readyState' in img),
  imageIsLoading = (hasReadyState ? (img.readyState != 'complete') : ('complete' in img && img.complete != true))
  if (imageIsLoading) {
    if (!img.getAttribute('__loadingAttached__')) {
      img.setAttribute('__loadingAttached__', true)
      on(img, hasReadyState ? 'readystatechange' : 'load', recall(this, arguments))
    }
    return
  }
  callback()
}
