import{u as n}from"./pluginConfig-9977edb4.js";import{h as a}from"./vendor-1e70d1e5.js";const s=Vue.defineComponent({__name:"check",props:{name:null,value:{type:Boolean}},emits:["update:value"],setup(e,{emit:t}){const u=e;return n().getConfig(a().params.id,u.name).catch(()=>t("update:value",!0)),(c,l)=>{const o=Vue.resolveComponent("n-alert");return e.value?(Vue.openBlock(),Vue.createBlock(o,{key:0,title:"当前功能受限",type:"error"},{default:Vue.withCtx(()=>[Vue.createTextVNode(" 当前实例未安装插件:"+Vue.toDisplayString(e.name),1)]),_:1})):Vue.createCommentVNode("",!0)}}});export{s as _};
