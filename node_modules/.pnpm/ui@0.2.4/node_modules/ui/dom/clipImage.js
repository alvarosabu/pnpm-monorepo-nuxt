var style = require('./style'),
  extend = require('std/extend'),
  getDocumentOf = require('./getDocumentOf'),
  waitForImage = require('./waitForImage')

var defaultClipperStyles = {
  width:100,
  height:100,
  overflow:'hidden'
}

module.exports = function clipImage(src, clipperStyles, win) {
  clipperStyles = extend(clipperStyles, defaultClipperStyles)
  win = win || window
  var doc = win.document,
    clipper = doc.createElement('div'),
    img = doc.createElement('img')
  img.style.visibility = 'hidden'
  img.src = src
  style(clipper, clipperStyles)
  doc.body.appendChild(clipper)
  clipper.appendChild(img)
  waitForImage(img, function() {
    var width = img.offsetWidth,
      height = img.offsetHeight,
      clipWidth = clipperStyles.width,
      clipHeight = clipperStyles.height,
      newSize

    if (width <= clipWidth && height <= clipHeight) {
      newSize = { width:width, height:height }
    } else if (width < height) {
      newSize = { width:clipWidth, height:Math.round(height * (clipWidth / width)) }
    } else {
      newSize = { width:Math.round(width * (clipHeight / height)), height:clipHeight }
    }

    style(img, {
      width:newSize.width, marginLeft:Math.floor(clipWidth/2 - newSize.width/2),
      height:newSize.height, marginTop:Math.floor(clipHeight/2 - newSize.height/2),
      visibility:'visible' })
  })
  return clipper
}
