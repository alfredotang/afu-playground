"use strict";var t=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var s=Object.getOwnPropertyNames;var r=Object.prototype.hasOwnProperty;var d=(e,a)=>{for(var i in a)t(e,i,{get:a[i],enumerable:!0})},l=(e,a,i,o)=>{if(a&&typeof a=="object"||typeof a=="function")for(let n of s(a))!r.call(e,n)&&n!==i&&t(e,n,{get:()=>a[n],enumerable:!(o=p(a,n))||o.enumerable});return e};var m=e=>l(t({},"__esModule",{value:!0}),e);var v={};d(v,{MetadataTypeNameMap:()=>M});module.exports=m(v);var M=new Map([["user_profile","User Profile Metadata"],["event","Event Metadata"],["dimension","Dimension Table Metadata"],["dimension_mapping","Dimension Mapping"]]),g=[["user_profile","User Profile Metadata"],["event","Event Metadata"],["dimension","Dimension Table Metadata"],["dimension_mapping","Dimension Mapping"]],T=g.map(e=>[e[1],e[0]]);console.log(T);0&&(module.exports={MetadataTypeNameMap});
