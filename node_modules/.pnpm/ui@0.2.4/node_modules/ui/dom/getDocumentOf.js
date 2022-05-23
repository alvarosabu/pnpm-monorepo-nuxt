module.exports = function getDocumentOf(component) {
	if (component.getDocument) { return component.getDocument() }
	else if (component.ownerDocument) { return component.ownerDocument }
	else { return component }
}
