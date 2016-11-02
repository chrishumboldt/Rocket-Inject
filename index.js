#!usr/bin/env node

/**
 * File: index.js
 * Type: Javascript index file
 * Author: Chris Humboldt
**/

var Mustache = require('mustache');

// Webplate tools module extension
var Web = (function (Web) {
	// Basic checks
	if (!Web.exists) {
		var exists = function (check) {
			return (check === null || check === false || typeof (check) === 'undefined') ? false : true;
		};
		Web.exists = exists;
	}
	if (!Web.has) {
		var has = {
			spaces: function (check) {
				return /\s/.test(check);
			},
			class: function (element, className) {
				return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
			}
		};
		Web.has = has;
	}
	// Classes
	if (!Web.class) {
		var classMethods = {
			add: function (element, className) {
				if (exists(element)) {
					if (typeof className === 'object') {
						for (var i = 0, len = className.length; i < len; i++) {
							classMethods.addExecute(element, className[i]);
						}
					} else if (has.spaces(className)) {
						var classes = className.split(' ');
						for (var i = 0, len = classes.length; i < len; i++) {
							classMethods.addExecute(element, classes[i]);
						}
					} else {
						classMethods.addExecute(element, className);
					}
				}
			},
			addExecute: function (element, className) {
				var crtClass = element.className;
				if (crtClass.match(new RegExp('\\b' + className + '\\b', 'g')) === null) {
					element.className = crtClass === '' ? className : crtClass + ' ' + className;
				}
			},
			clear: function (element) {
				if (exists(element)) {
					element.removeAttribute('class');
				}
			},
			remove: function (element, className) {
				if (exists(element)) {
					if (typeof className === 'object') {
						for (var i = className.length - 1; i >= 0; i--) {
							classMethods.removeExecute(element, className[i]);
						}
					} else if (has.spaces(className)) {
						var classes = className.split(' ');
						for (var i = 0, len = classes.length; i < len; i++) {
							classMethods.removeExecute(element, classes[i]);
						}
					} else {
						classMethods.removeExecute(element, className);
					}
				}
			},
			removeExecute: function (element, className) {
				if (element.className.indexOf(className) > -1) {
					element.className = element.className.split(' ').filter(function (val) {
						return val != className;
					}).toString().replace(/,/g, ' ');
					if (element.className === '') {
						classMethods.clear(element);
					}
				}
			}
		};
		Web.class = classMethods;
	}
	// DOM
	if (!Web.dom) {
		Web.dom = {};
	}
	if (!Web.dom.select) {
		Web.dom.select = function (selector) {
			if (selector.indexOf('.') > -1 || has.spaces(selector)) {
				var returnElements = document.querySelectorAll(selector);
				if (returnElements.length > 0) {
					return returnElements;
				}
				return false;
			} else {
				if (selector.indexOf('#') > -1) {
					return [document.getElementById(selector.substring(1))];
				} else {
					var returnElements = document.getElementsByTagName(selector);
					if (returnElements.length > 0) {
						return returnElements;
					}
					return false;
				}
			}
		}
	}

	return Web;
})(Web || {});

// Component container
var Injectplate = (function () {
	// Defaults
	var defaults = {
		errors: true
	};

	// Inner component
	var component = function () {
		// Variables
		var components = {};

		// Functions
		var bindComponent = function (obj) {
			// Catch
			if (typeof obj !== 'object' || obj.component === 'undefined') {
				return false;
			}
			/*
			Determine what the component needs to bind to in the DOM. If nothing in
			the DOM is found then kill the binding here and don't execute anything else
			unnecessarily so.
			*/
			var bindTo = (typeof obj.to !== 'undefined') ? Web.dom.select(obj.to) : Web.dom.select('#' + obj.component);
			if (!bindTo || bindTo.length < 1) {
				return false;
			}

			var html = Mustache.render(components[obj.component].html, (typeof obj.data !== 'undefined') ? obj.data : '');
			for (var i = 0, len = bindTo.length; i < len; i++) {
			   // Overwrite or append
				if (obj.overwrite === true) {
					bindTo[i].innerHTML = html;
				} else {
					bindTo[i].insertAdjacentHTML('beforeend', html);
				}
				bindTo[i].setAttribute('data-inject', 'true');
				// Set an id on the container (bindTo element)
				if (typeof components[obj.component].id === 'string') {
					bindTo[i].id = components[obj.components].id;
				}
				// Set a class on the container (bindTo element)
				if (typeof components[obj.component].className === 'string') {
					Web.class.add(bindTo[i], components[obj.component].className);
				}
				// Component onDone function
				if (typeof components[obj.component].onDone === 'function') {
					components[obj.component].onDone(bindTo[i]);
				}
				// Binding onDone function
				if (typeof obj.onDone === 'function') {
					obj.onDone(bindTo[i]);
				}
			}
		}
		var flattenHTML = function (html, name) {
			if (typeof html === 'object') {
				var htmlFlat = '';
				for (var i = 0, len = html.length; i < len; i++) {
					htmlFlat += html[i];
				}
				return htmlFlat;
			} else if (typeof html === 'string') {
				var htmlFlat = '';
				var htmlFlatSplit = html.split(/(?:\r\n|\n|\r)/);
				for (var i = 0, len = htmlFlatSplit.length; i < len; i++) {
					htmlFlat += htmlFlatSplit[i].trim();
				}
				return htmlFlat;
			} else {
				if (defaults.errors) {
					throw new Error('Injectplate: The HTML provided to create the component "' + name + '" is not valid.');
					return false;
				} else {
					return '';
				}
			}
		}
		var generateComponent = function (obj) {
			// Catch
			if (typeof obj !== 'object' || obj.component === 'undefined') {
				return false;
			}
			var html = Mustache.render(components[obj.component].html, (typeof obj.data) ? obj.data : '');
			if (typeof obj.onDone === 'function') {
				obj.onDone(html);
			}
			return html;
		}
		var registerComponent = function (obj) {
			// Catch
			if (typeof obj !== 'object' || obj.name === 'undefined') {
				if (defaults.errors) {
					throw new Error('Injectplate: Please provide a valid component name.');
				}
				return false;
			}
			// Register the new component
			components[obj.name] = {
				className: (typeof obj.className === 'string') ? obj.className : false,
				id: (typeof obj.id === 'string') ? obj.id : false,
				html: flattenHTML(obj.html, obj.name),
				onDone: (typeof obj.onDone === 'function') ? obj.onDone : false,
				overwrite: (typeof obj.overwrite === 'boolean') ? obj.overwrite : false
			};
		}

		// Return
		return {
			bind: bindComponent,
			component: registerComponent,
			flatten: flattenHTML,
			generate: generateComponent,
			list: components
		};
	};

	// Initiliser
	var init = function () {
		return new component();
	};

	// Return
	return {
		defaults: defaults,
		init: init
	};
})();

module.exports = Injectplate.init();
