// Create or extend Rocket
var Rocket = (typeof Rocket === 'object') ? Rocket : {};
if (!Rocket.defaults) {
   Rocket.defaults = {};
}
Rocket.defaults.inject = {
   errors: true
};

// Interface
interface component {
   component: string;
   data: any;
   onDone: any;
   overwrite: boolean;
   to: string;
}
interface componentNew {
   className: string|boolean;
   id: string|boolean;
   html: any;
   name: string;
   onDone: any;
   overwrite: boolean;
}

// Rocket component
module RocketInjectComponent {
   // Variables
   let components:any = {};

   // Functions
   function componentGenerate (obj:component) {

   }
   function componentRegister (obj:componentNew) {
      // Catch
      if (typeof obj !== 'object' || obj.name == undefined) {
         if (Rocket.defaults.errors) {
				throw new Error('Injectplate: Please provide a valid component name.');
			}
			return false;
      }
      // Continue
      components[obj.name] = {
			className: (typeof obj.className === 'string') ? obj.className : false,
			id: (typeof obj.id === 'string') ? obj.id : false,
			html: flattenHTML(obj.html, obj.name),
			onDone: (typeof obj.onDone === 'function') ? obj.onDone : false,
			overwrite: (typeof obj.overwrite === 'boolean') ? obj.overwrite : false
		};
   }
   function flattenHTML (html:any, name:string) {
      let htmlFlat = '';
      switch (typeof html) {
         case 'object':
            for (let htmlItem of html) {
               htmlFlat += htmlItem;
            }
            return htmlFlat;
         case 'string':
            for (let htmlItem of html.split(/(?:\r\n|\n|\r)/)) {
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
   export let component = componentRegister;
   export let flatten = flattenHTML;
   export let list = components;
}

// Bind to Rocket object
Rocket.inject = RocketInjectComponent;
