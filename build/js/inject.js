/*
Author: Chris Humboldt
*/
// Rocket module extension
Rocket.defaults.inject = {
    errors: true
};
// Module container
var RockMod_Inject;
(function (RockMod_Inject) {
    // Variables
    var components = {};
    /*
    All methods pertaining to the components themselves exist here.
    This object acts as the methods namespace.
    */
    var componentMethods = {
        bind: function (obj) {
            // Catch
            if (!validate.bind(obj)) {
                return false;
            }
            ;
            // Continue
            var listBindTo = (Rocket.is.string(obj.to)) ? Rocket.dom.select(obj.to) : Rocket.dom.select('#' + obj.component)[0];
            // Catch
            if (!Rocket.exists(listBindTo)) {
                return false;
            }
            // Continue
            var data = (Rocket.is.object(obj.data)) ? obj.data : '';
            var html = Mustache.render(components[obj.component].html, data);
            for (var _i = 0, listBindTo_1 = listBindTo; _i < listBindTo_1.length; _i++) {
                var bindTo = listBindTo_1[_i];
                // Overwrite or append
                if (obj.overwrite === true) {
                    bindTo.innerHTML = html;
                }
                else {
                    bindTo.insertAdjacentHTML('beforeend', html);
                }
                bindTo.setAttribute('data-inject', 'true');
                // Set an id on the container (bindTo element)
                if (Rocket.is.string(components[obj.component].id)) {
                    bindTo.id = components[obj.component].id;
                }
                // Set a class on the container (bindTo element)
                if (Rocket.is.string(components[obj.component].className)) {
                    Rocket.classes.add(bindTo, components[obj.component].className);
                }
                // Component onDone function
                if (Rocket.is.function(components[obj.component].onDone)) {
                    components[obj.component].onDone(bindTo);
                }
                // Binding onDone function
                if (Rocket.is.function(obj.onDone)) {
                    obj.onDone(bindTo);
                }
            }
        },
        generate: function (obj) {
            // Catch
            if (!validate.generate(obj)) {
                return false;
            }
            // Continue
            var html = '';
            if (Rocket.is.object(obj.data)) {
                html = Mustache.render(components[obj.component].html, obj.data);
            }
            return html;
        },
        register: function (obj) {
            // Catch
            if (!validate.register(obj)) {
                if (Rocket.defaults.errors) {
                    throw new Error('Injectplate: Please provide a valid component name.');
                }
                return false;
            }
            // Continue
            components[obj.name] = {
                className: (Rocket.is.string(obj.className)) ? obj.className : false,
                id: (Rocket.is.string(obj.id)) ? obj.id : false,
                html: flattenHTML(obj.html, obj.name),
                onDone: (Rocket.is.function(obj.onDone)) ? obj.onDone : false,
                overwrite: (Rocket.is.boolean(obj.overwrite)) ? obj.overwrite : false
            };
        }
    };
    /*
    Validation methods are used to check all incoming data.
    */
    var validate = {
        bind: function (obj) {
            if (!Rocket.is.object(obj)) {
                return false;
            }
            else if (!Rocket.is.string(obj.component)) {
                return false;
            }
            else if (!Rocket.is.object(components[obj.component])) {
                return false;
            }
            return true;
        },
        generate: function (obj) {
            if (!Rocket.is.object(obj)) {
                return false;
            }
            else if (!Rocket.exists(obj.component)) {
                return false;
            }
            return true;
        },
        register: function (obj) {
            if (!Rocket.is.object(obj)) {
                return false;
            }
            else if (!Rocket.exists(obj.name)) {
                return false;
            }
            return true;
        }
    };
    /*
    All templates are flattened for convenience and to make sure there are no
    unnecessary spaces.
    */
    function flattenHTML(html, name) {
        var htmlFlat = '';
        switch (typeof html) {
            case 'object':
                for (var _i = 0, html_1 = html; _i < html_1.length; _i++) {
                    var htmlItem = html_1[_i];
                    htmlFlat += htmlItem;
                }
                return htmlFlat;
            case 'string':
                for (var _a = 0, _b = html.split(/(?:\r\n|\n|\r)/); _a < _b.length; _a++) {
                    var htmlItem = _b[_a];
                    htmlFlat += htmlItem.trim();
                }
                return htmlFlat;
        }
        // Type check was unsuccessful
        if (Rocket.defaults.errors) {
            throw new Error('Injectplate: The HTML provided to create the component "' + name + '" is not valid.');
        }
    }
    // Exports
    RockMod_Inject.bind = componentMethods.bind;
    RockMod_Inject.component = componentMethods.register;
    RockMod_Inject.flatten = flattenHTML;
    RockMod_Inject.generate = componentMethods.generate;
    RockMod_Inject.list = components;
})(RockMod_Inject || (RockMod_Inject = {}));
