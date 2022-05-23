module.exports = function removeClass(el, className) {
	var current = ' ' + el.className + ' ',
	  target = ' ' + className + ' ',
	  index = current.indexOf(target)

  if (index == -1) { return }
	el.className = current.replace(target, ' ')
}