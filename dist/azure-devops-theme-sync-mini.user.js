// ==UserScript==
// @name         Azure DevOps Theme Sync
// @namespace    https://github.com/scaryrawr/userscripts
// @version      1.0.0
// @description  Syncs Azure DevOps theme with OS light/dark mode preference
// @author       Mike Wallio
// @match        https://dev.azure.com/*
// @match        https://*.visualstudio.com/*
// @grant        none
// ==/UserScript==
var B=()=>{let{hostname:f,pathname:j}=window.location;if(f==="dev.azure.com")return`/${j.split("/")[1]}/_apis/Settings/Entries/globalme`;return"/_apis/Settings/Entries/globalme"},D=()=>window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",x=()=>{if(document.body.classList.contains("ms-vss-web-vsts-theme-dark"))return"dark";if(document.body.classList.contains("ms-vss-web-vsts-theme"))return"light";return},E=(f)=>{let{body:j}=document;if(f==="dark")j.classList.remove("ms-vss-web-vsts-theme"),j.classList.add("ms-vss-web-vsts-theme-dark"),j.dataset.theme="ms.vss-web.vsts-theme-dark";else j.classList.remove("ms-vss-web-vsts-theme-dark"),j.classList.add("ms-vss-web-vsts-theme"),j.dataset.theme="ms.vss-web.vsts-theme"},G=async(f)=>{let j=f==="dark"?"ms.vss-web.vsts-theme-dark":"ms.vss-web.vsts-theme",q=await fetch(B(),{method:"PATCH",headers:{"Content-Type":"application/json",Accept:"application/json;api-version=4.1-preview.1"},body:JSON.stringify({"WebPlatform/Theme":j})});if(!q.ok)throw Error(`Failed to set theme: ${q.status}`)},z=async()=>{let f=D();if(x()===f)return;E(f);try{await G(f)}catch{}},H=()=>{if(x()){z();return}let f=new MutationObserver(()=>{if(x())f.disconnect(),z()});f.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["class"]})},J=()=>{H(),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>void z())};J();
