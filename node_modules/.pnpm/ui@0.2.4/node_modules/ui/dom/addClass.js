module.exports = function(el, className) {
	if ((' ' + el.className + ' ').match(' ' + className + ' ')) { return }
	el.className += ' ' + className
}
