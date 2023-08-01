import{_ as x}from"./logo-44f27a9b.js";import{f as N,h as b}from"./vendor-1e70d1e5.js";import{_ as y,P as A,c as D,g as S}from"./index-19bd79aa.js";import{P as C}from"./PersonOutline-a27731eb.js";import{L as I}from"./LockClosedOutline-aa141746.js";const R=n=>(Vue.pushScopeId("data-v-8fbf7274"),n=n(),Vue.popScopeId(),n),k={class:"view-account"},P=R(()=>Vue.createElementVNode("div",{class:"view-account-header"},null,-1)),z={class:"view-account-container"},T=Vue.createStaticVNode('<div class="view-account-top" data-v-8fbf7274><div class="view-account-top-logo" data-v-8fbf7274><img src="'+x+'" alt="" data-v-8fbf7274><h2 class="title" data-v-8fbf7274>Monibuca</h2></div><div class="view-account-top-desc" data-v-8fbf7274>流媒体在线管理</div></div>',1),U={class:"view-account-form"},q=Vue.createTextVNode(" 注册 "),M=Vue.defineComponent({__name:"index",setup(n){const d=Vue.ref(!1),f=Vue.ref("发送邮箱验证码"),l=Vue.ref(60),v=Vue.ref(),o=naive.useMessage(),V=Vue.ref(!1),B=A.BASE_REGISTER_NAME,e=Vue.reactive({password:"",mail:"",verifycode:""}),w={mail:{required:!0,message:"请输入邮箱",trigger:"blur"},password:{required:!0,message:"请输入密码",trigger:"blur"},verifycode:{required:!0,message:"请邮箱验证码",trigger:"blur"}},E=D(),_=N(),m=b(),F=c=>{c.preventDefault(),v.value.validate(async u=>{var a;if(u)o.error("请填写正确信息");else{const{verifycode:r,password:s,mail:i}=e;o.loading("注册中..."),V.value=!0;const p={verifycode:r,password:s,mail:i};try{const t=await E.register(p);if(o.destroyAll(),t.code==0){const g=decodeURIComponent(((a=m.query)==null?void 0:a.redirect)||"/");o.success("注册成功，即将进入系统"),m.name===B?_.replace("/"):_.replace(g)}else o.info(t.msg||"登录失败")}finally{V.value=!1}}})};function h(){if(!e.mail)o.info("请输入邮箱验证码");else{const c={mail:e.mail};S(c).then(()=>{o.info("验证码发送成功，请注意查收");const u=setInterval(()=>{d.value=!0,f.value=`(${l.value}秒)后重新发送`,l.value--,l.value<0&&(clearInterval(u),f.value="发送邮箱验证码",d.value=!1,l.value=10)},1e3)})}}return(c,u)=>{const a=Vue.resolveComponent("n-icon"),r=Vue.resolveComponent("n-input"),s=Vue.resolveComponent("n-form-item"),i=Vue.resolveComponent("n-button"),p=Vue.resolveComponent("n-form");return Vue.openBlock(),Vue.createElementBlock("div",k,[P,Vue.createElementVNode("div",z,[T,Vue.createElementVNode("div",U,[Vue.createVNode(p,{ref_key:"formRef",ref:v,"label-placement":"left",size:"large",model:e,rules:w},{default:Vue.withCtx(()=>[Vue.createVNode(s,{path:"mail"},{default:Vue.withCtx(()=>[Vue.createVNode(r,{value:e.mail,"onUpdate:value":u[0]||(u[0]=t=>e.mail=t),placeholder:"请输入邮箱帐号"},{prefix:Vue.withCtx(()=>[Vue.createVNode(a,{size:"18",color:"#808695"},{default:Vue.withCtx(()=>[Vue.createVNode(Vue.unref(C))]),_:1})]),_:1},8,["value"])]),_:1}),Vue.createVNode(s,{path:"verifycode"},{default:Vue.withCtx(()=>[Vue.createVNode(r,{value:e.verifycode,"onUpdate:value":u[1]||(u[1]=t=>e.verifycode=t),placeholder:"请输入邮箱验证码"},{prefix:Vue.withCtx(()=>[Vue.createVNode(a,{size:"18",color:"#808695"},{default:Vue.withCtx(()=>[Vue.createVNode(Vue.unref(C))]),_:1})]),_:1},8,["value"]),Vue.createVNode(i,{type:"success",onClick:h,disabled:d.value},{default:Vue.withCtx(()=>[Vue.createTextVNode(Vue.toDisplayString(f.value),1)]),_:1},8,["disabled"])]),_:1}),Vue.createVNode(s,{path:"password"},{default:Vue.withCtx(()=>[Vue.createVNode(r,{value:e.password,"onUpdate:value":u[2]||(u[2]=t=>e.password=t),type:"password",showPasswordOn:"click",placeholder:"请输入密码"},{prefix:Vue.withCtx(()=>[Vue.createVNode(a,{size:"18",color:"#808695"},{default:Vue.withCtx(()=>[Vue.createVNode(Vue.unref(I))]),_:1})]),_:1},8,["value"])]),_:1}),Vue.createVNode(s,null,{default:Vue.withCtx(()=>[Vue.createVNode(i,{type:"primary",onClick:F,size:"large",loading:V.value,block:""},{default:Vue.withCtx(()=>[q]),_:1},8,["loading"])]),_:1})]),_:1},8,["model"])])])])}}}),H=y(M,[["__scopeId","data-v-8fbf7274"]]);export{H as default};
