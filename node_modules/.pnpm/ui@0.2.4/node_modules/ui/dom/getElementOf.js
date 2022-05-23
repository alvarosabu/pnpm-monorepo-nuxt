module.exports = function getElementOf(component) {
  if (component.getElement) { return component.getElement() }
	else { return component }
}