/**
@author Chris Humboldt
**/

declare namespace Mustache {
   function render(html: any, data: any): any;
}

// Interfaces
declare interface component {
   component:string;
   data:any;
   onDone:any;
   overwrite:boolean;
   to:string;
}
declare interface componentBind {
   component:string;
   data:any;
   to:string;
   onDone:any;
   overwrite:boolean;
}
declare interface componentNew {
   className: string|boolean;
   id: string|boolean;
   html: any;
   name: string;
   onDone: any;
   overwrite: boolean;
}
