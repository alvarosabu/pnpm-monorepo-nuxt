module.exports = Class(UIComponent, function() {

	this._class = 'Button'
	
	this.init = function(label, click) {
		this._label = label
		this._clickHandler = click
	}

	this.renderContent = function() {
		this.append(
			this._button = BUTTON({
				click:this._clickHandler,
				touchstart:bind(this, this._onTouchStart),
				touchend:bind(this, this._onTouchEnd),
				touchcancel:bind(this, this._onTouchCancel),
				touchmove:bind(this, this._onTouchMove)
			}, this._label)
			// DIV({ style:{position:'absolute', top:0, left:'3.5%', width:'94%', 'borderRadius':8 } })
			// http://admindaily.com/glossy-buttons-without-images-using-only-css3.html
		)
	}
	
	this._onTouchStart = function(e) {
		e.cancel()
		log('touch start')
		this._button.addClass('active')
	}
	this._onTouchEnd = function(e) {
		log('touch end')
		this._button.removeClass('active')
	}
	this._onTouchCancel = function() {
		log('touch cancel')
		this._button.removeClass('active')
	}
	this._onTouchMove = function(e) {
		log('touch move ', e.target, ' ', this._button.getElement())
	}
})