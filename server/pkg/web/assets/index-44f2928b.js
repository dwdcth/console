import{s as r}from"./index-19bd79aa.js";function $(t){return r({url:"/api/instance/list",method:"post",data:t})}function I(t){return r({url:"/api/instance/add",method:"post",data:t})}function P(t){return r({url:"/api/instance/update",method:"post",data:t})}function R(t){return r({url:"/api/instance/del",method:"post",data:t})}function m(t){return r({url:"/api/sysinfo",method:"post",headers:{m7sid:t}})}function L(t,e){return r({url:`/api/stream?streamPath=${e}`,method:"post",headers:{m7sid:t}})}function S(t,e){return r({url:`/api/closestream?streamPath=${e}`,method:"post",headers:{m7sid:t}})}function w(t,e,s=""){const a=new URLSearchParams({yaml:s,name:e});return r({url:`/api/getconfig?${a.toString()}`,method:"post",headers:{m7sid:t}})}async function y(t,e,s,a="http"){const n=await m(t),i=await r({url:"/api/instance/detail",method:"post",data:{id:t}}),u=n.LocalIP,d=i.RemoteIP,o=await r({url:"/api/getconfig",method:"post",headers:{m7sid:t}}),{publicaddr:p,publicaddrtls:c}=o.console,{listenaddr:l,listenaddrtls:h}=o.http;return`${a}${s?"s":""}://${e?u:(s?c:p)||d}${s?h:l}`}function U(t,e,s=""){return r({url:`/api/modifyconfig?${new URLSearchParams({name:s||"",yaml:"1"})}`,method:"post",headers:{m7sid:t},data:e})}function b(t){return r({url:"/api/plugins",method:"post",headers:{m7sid:t}})}function v(t){return r({url:"/gb28181/api/list",method:"post",headers:{m7sid:t}})}function k(t,e,s,a,n){return r({url:`/gb28181/api/invite?id=${e}&channel=${s}${a?"&startTime="+a:""}${n?"&endTime="+n:""}`,method:"post",headers:{m7sid:t}})}function F(t){return r({url:"/api/list/pull",method:"post",headers:{m7sid:t}})}function x(t){return r({url:"/api/list/push",method:"post",headers:{m7sid:t}})}function B(t,e,s,a,n=!1){return r({url:`/${e}/api/pull?streamPath=${s}&target=${encodeURI(a)}${n?"&save=1":""}`,method:"post",headers:{m7sid:t}})}function C(t,e){return r({url:`/api/stoppush?url=${encodeURI(e)}`,method:"post",headers:{m7sid:t}})}function j(t,e,s,a){return r({url:`/${e}/api/push?streamPath=${s}&target=${encodeURI(a)}`,method:"post",headers:{m7sid:t}})}function q(t){return r({url:"/logrotate/api/list",method:"post",headers:{m7sid:t}})}function z(t){return r({url:"/record/api/list",method:"post",headers:{m7sid:t}})}function A(t){return r({url:"/record/api/list/recording",method:"post",headers:{m7sid:t}})}function D(t,e){return r({url:"/record/api/stop?id="+e,method:"post",headers:{m7sid:t}})}function G(t,e,s){return r({url:"/record/api/start?"+new URLSearchParams({streamPath:e,type:s}),method:"post",headers:{m7sid:t}})}function H(t,e){return r({url:`/api/instance/getroompass?roomId=${e}`,method:"post",headers:{m7sid:t}})}function M(t,e,s){return r({url:"/monitor/api/list/stream?"+new URLSearchParams({streamPath:e,time:s}),method:"post",headers:{m7sid:t}})}function T(t,e){return r({url:"/monitor/api/list/track?"+new URLSearchParams({streamPath:e}),method:"post",headers:{m7sid:t}})}function E(t,e){return r({url:"/monitor/"+e,method:"post",headers:{m7sid:t}})}function J(t,e){return r({url:"/debug/pprof/"+(e||""),method:"post",headers:{m7sid:t}})}export{$ as A,R as B,w as a,y as b,L as c,b as d,I as e,F as f,m as g,x as h,j as i,C as j,q as k,z as l,U as m,D as n,A as o,B as p,G as q,k as r,S as s,v as t,P as u,H as v,M as w,E as x,T as y,J as z};
