/**
@author Chris Humboldt
**/

// Rocket module extension
Rocket.defaults.inject = {
   errors: true
};

// Module container
module RockMod_Inject {

   // Variables
   let components:any = {};

   /*
   All methods pertaining to the components themselves exist here.
   This object acts as the methods namespace.
   */
   const componentMethods = {
      bind: (obj:componentBind) => {
         // Catch
         if (!validate.bind(obj)) {
            return false;
         };
         // Continue
         const listBindTo:any = (Rocket.is.string(obj.to)) ? Rocket.dom.select(obj.to) : Rocket.dom.select('#' + obj.component)[0];

         // Catch
         if (!Rocket.exists(listBindTo)) { return false; }

         // Continue
         const data = (Rocket.is.object(obj.data)) ? obj.data : '';
         const html = Mustache.render(components[obj.component].html, data);

         for (let bindTo of listBindTo) {
            // Overwrite or append
            if (obj.overwrite === true) {
               bindTo.innerHTML = html;
            } else {
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
      generate: (obj:component) => {
         // Catch
         if (!validate.generate(obj)) { return false; }

         // Continue
         let html = '';
         if (Rocket.is.object(obj.data)) {
            html = Mustache.render(components[obj.component].html, obj.data);
         }

         return html;
      },
      register: (obj:componentNew) => {
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
   const validate = {
      bind: (obj:componentBind) => {
         if (!Rocket.is.object(obj)) {
            return false;
         } else if (!Rocket.is.string(obj.component)) {
            return false;
         } else if (!Rocket.is.object(components[obj.component])) {
            return false;
         }

         return true;
      },
      generate: (obj:component) => {
         if (!Rocket.is.object(obj)) {
            return false;
         } else if (!Rocket.exists(obj.component)) {
            return false;
         }

         return true;
      },
      register: (obj:componentNew) => {
         if (!Rocket.is.object(obj)) {
            return false;
         } else if (!Rocket.exists(obj.name)) {
            return false;
         }

         return true;
      }
   };

   /*
   All templates are flattened for convenience and to make sure there are no
   unnecessary spaces.
   */
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
   export const bind = componentMethods.bind;
   export const component = componentMethods.register;
   export const flatten = flattenHTML;
   export const generate = componentMethods.generate;
   export const list = components;
}
