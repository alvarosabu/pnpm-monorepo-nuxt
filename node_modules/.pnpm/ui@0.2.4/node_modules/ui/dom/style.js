var client = require('std/client'),
  each = require('std/each')

var style = module.exports = function(element, styleProps) {
  var elStyle = element.style
  each(styleProps, function(val, key) {
    if (key == 'float') { key = 'cssFloat' }
    else if (key == 'gradient') { return style.gradient.apply(style, [element].concat(val.split(' '))) }
    else if (key == 'opacity') { return style.opacity(element, val) }
    else if (style.prefixed[key]) { key = style.prefix + key }
    
    if (typeof val == 'number') { val = val + 'px' }
    if (val != null) { elStyle[key] = val } // catches null and undefined
  })
  return element
}

style.prefix = 
  client.isFirefox ? (client.version < 5 ? '-moz-' : '') :
  client.isWebKit ? '-webkit-' :
  ''

style.prefixed = {
  'boxShadow':true,
  'borderRadius':true,
  'transition':true
}

style.opacity = function(el, fraction) {
  if (client.isIE && client.version <= 8) {
    style.opacity = function(el, fraction) {
      el.style.filter = 'alpha(opacity=' + Math.round(fraction * 100) + ')'
    }
  } else {
    style.opacity = function(el, fraction) {
      el.style.opacity = fraction
      el.style.MozOpacity = fraction
      el.style.KhtmlOpacity = fraction
    }
  }
  style.opacity(el, fraction)
}

style.counterPos = { 'top':'bottom', 'bottom':'top', 'left':'right', 'right':'left' }
style.otherPos = { 'top':'left', 'bottom':'left', 'left':'top', 'right':'top' }
style.gradient = function(el, fromColor, toColor, pos) {
  pos = pos || 'top'
  var key = 'background',
    val
  if (client.isIE) {
    key = 'filter'
    val = "progid:DXImageTransform.Microsoft.gradient(startColorstr='"+fromColor+"', endColorstr='"+toColor+"')"
  } else if (client.isFirefox) {
    val = '-moz-linear-gradient('+pos+', '+fromColor+', '+toColor+')'
  } else if (client.isWebkit) {
    var otherPos = style.otherPos[pos]
	val = (otherPos == 'left')
      ? '-webkit-gradient(linear, left '+pos+', left '+style.counterPos[pos]+', from('+fromColor+'), to('+toColor+'))'
      : '-webkit-gradient(linear, '+pos+' '+otherPos+', '+style.counterPos[pos]+' '+otherPos+', from('+fromColor+'), to('+toColor+'))'
  } else {
    val = fromColor
  }
  el.style[key] = val
}
