import{y as e,$ as r}from"./indexhtml-789f4551.js";const p={tagName:"vaadin-menu-bar",displayName:"MenuBar",elements:[{selector:"vaadin-menu-bar vaadin-menu-bar-button",displayName:"Buttons",properties:[{propertyName:"background-color",displayName:"Background color",editorType:e.color},{propertyName:"border-color",displayName:"Border color",editorType:e.color},{propertyName:"border-width",displayName:"Border width",editorType:e.range,presets:r.basicBorderSize,icon:"square"},{propertyName:"border-radius",displayName:"Border radius",editorType:e.range,presets:r.lumoBorderRadius,icon:"square"},{propertyName:"--lumo-button-size",displayName:"Size",editorType:e.range,presets:r.lumoSize,icon:"square"},{propertyName:"padding-inline",displayName:"Padding",editorType:e.range,presets:r.lumoSpace,icon:"square"}]},{selector:"vaadin-menu-bar vaadin-menu-bar-button vaadin-menu-bar-item",displayName:"Button labels",properties:[{propertyName:"color",displayName:"Text color",editorType:e.color,presets:r.lumoTextColor},{propertyName:"font-size",displayName:"Font size",editorType:e.range,presets:r.lumoFontSize,icon:"font"},{propertyName:"font-weight",displayName:"Bold",editorType:e.checkbox,checkedValue:"bold"}]},{selector:"vaadin-menu-bar-overlay::part(overlay)",displayName:"Menus",properties:[{propertyName:"background-color",displayName:"Background color",editorType:e.color},{propertyName:"border-color",displayName:"Border color",editorType:e.color},{propertyName:"border-width",displayName:"Border width",editorType:e.range,presets:r.basicBorderSize,icon:"square"},{propertyName:"border-radius",displayName:"Border radius",editorType:e.range,presets:r.lumoBorderRadius,icon:"square"},{propertyName:"padding",displayName:"Padding",editorType:e.range,presets:r.lumoSpace,icon:"square"}]},{selector:"vaadin-menu-bar-overlay vaadin-menu-bar-item",displayName:"Menu items",properties:[{propertyName:"color",displayName:"Text color",editorType:e.color,presets:r.lumoTextColor},{propertyName:"font-size",displayName:"Font size",editorType:e.range,presets:r.lumoFontSize,icon:"font"},{propertyName:"font-weight",displayName:"Bold",editorType:e.checkbox,checkedValue:"bold"}]}],async setupElement(o){o.overlayClass=o.getAttribute("class");const a=document.createElement("vaadin-menu-bar-item");o.items=[{component:a,children:[{text:"Sub item"}]}],o.querySelector("vaadin-menu-bar-button").click(),await new Promise(t=>setTimeout(t,10))},async cleanupElement(o){o._close()}};export{p as default};