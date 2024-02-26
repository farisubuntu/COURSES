let _obj = {}

export const setGlobal = (obj) => {
    Object.assign(_obj, obj)
}
export const getGlobal = varName => {
   if(_obj[varName] !== undefined){
      return _obj[varName]
   }
   else {
      return null
   }
}

/*
component1.jsx

import React.....
import { setGlobal } from "./globals";
import.....

setGlobal({ title : "welcome" })

class comp.... {

   
   render{
      return(){
         <i onClick={()=>setGlobal({location: "House"})}>Cmponent1</i>
      }
   }
}
module exp...
Component2.jsx

import React.....
import { setGlobal, getGlobal } from "./globals";
import.....

setGlobal({ greet : "Hi"})

class comp.... {

   
   render{
      return(){
         <i>{getGlobal("greet")}, {getGlobal("title")} to our {getGlobal("location")}</i>
      }
   }
}
module exp...

*/