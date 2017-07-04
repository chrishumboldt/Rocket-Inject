/**
@author Chris Humboldt
**/

/*
Rocket Node module

If used as a Node module then bind to the module exports. This is handled in
a similar fashion to underscore.
*/
var isNodeModule = false;

if (typeof exports !== 'undefined' && !exports.nodeType) {
   if (typeof module !== 'undefined' && !module.nodeType && module.exports) {
      var Mustache = require('mustache');
      var Rocket = require('rocket-tools');

      Rocket.defaults.inject = {
         errors: true
      };

      module.exports = RockMod_Inject;
      isNodeModule = true;
   }
}
if (!isNodeModule) {
   Rocket.defaults.inject = {
      errors: true
   };

   Rocket.inject = RockMod_Inject;
}
