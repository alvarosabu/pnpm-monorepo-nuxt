module.exports = function getViewportSize(win) {
	win = win || window
	if (typeof win.innerWidth != 'undefined') {
		return { width:win.innerWidth, height:win.innerHeight }
	} else if (typeof docEl != 'undefined') {
		var docEl = win.document.documentElement
		return { width:docEl.clientWidth, height:docEl.clientHeight }
	} else {
		var body = document.body
		return { width:body.clientWidth, height:body.clientHeight }
	}
}
