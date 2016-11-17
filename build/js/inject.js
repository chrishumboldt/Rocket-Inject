var Rocket = (typeof Rocket === 'object') ? Rocket : {};
if (!Rocket.defaults) {
    Rocket.defaults = {};
}
Rocket.defaults.inject = {
    errors: true
};
var RocketInjectComponent;
(function (RocketInjectComponent) {
    var components = {};
    function componentGenerate(obj) {
    }
    function componentRegister(obj) {
        if (typeof obj !== 'object' || obj.name == undefined) {
            if (Rocket.defaults.errors) {
                throw new Error('Injectplate: Please provide a valid component name.');
            }
            return false;
        }
        components[obj.name] = {
            className: (typeof obj.className === 'string') ? obj.className : false,
            id: (typeof obj.id === 'string') ? obj.id : false,
            html: flattenHTML(obj.html, obj.name),
            onDone: (typeof obj.onDone === 'function') ? obj.onDone : false,
            overwrite: (typeof obj.overwrite === 'boolean') ? obj.overwrite : false
        };
    }
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
        if (Rocket.defaults.errors) {
            throw new Error('Injectplate: The HTML provided to create the component "' + name + '" is not valid.');
        }
    }
    RocketInjectComponent.component = componentRegister;
    RocketInjectComponent.flatten = flattenHTML;
    RocketInjectComponent.list = components;
})(RocketInjectComponent || (RocketInjectComponent = {}));
Rocket.inject = RocketInjectComponent;
