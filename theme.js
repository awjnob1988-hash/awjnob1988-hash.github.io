/* Vision / Ruya: shared accessible day-night preferences. */
(function(){
 "use strict";
 const key="ruyaTheme";
 const root=document.documentElement;
 const system=window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)"):null;
 function saved(){
  try{const s=localStorage.getItem(key);return s==="dark"||s==="light"?s:null}
  catch(_){return null}
 }
 function preferred(){return system&&system.matches?"dark":"light"}
 function setTheme(mode,persist){
  const theme=mode==="dark"?"dark":"light";
  root.setAttribute("data-theme",theme);
  root.style.colorScheme=theme;
  const meta=document.querySelector('meta[name="theme-color"]');
  if(meta)meta.setAttribute("content",theme==="dark"?"#0d1816":"#e9eee9");
  document.querySelectorAll("[data-theme-toggle]").forEach(button=>{
   const next=theme==="dark"?"الوضع النهاري":"الوضع الليلي";
   button.setAttribute("aria-label","تفعيل "+next);
   button.setAttribute("title","تفعيل "+next);
   button.setAttribute("aria-pressed",theme==="dark"?"true":"false");
   const icon=button.querySelector("[data-theme-icon]");
   if(icon)icon.textContent=theme==="dark"?"☀":"☾";
   const label=button.querySelector("[data-theme-label]");
   if(label)label.textContent=theme==="dark"?"نهاري":"ليلي";
  });
  if(persist){try{localStorage.setItem(key,theme)}catch(_){}}
 }
 function ready(){
  setTheme(saved()||preferred(),false);
  document.querySelectorAll("[data-theme-toggle]").forEach(button=>{
   button.addEventListener("click",()=>setTheme(root.getAttribute("data-theme")==="dark"?"light":"dark",true));
  });
  if(system){
   const update=()=>{if(!saved())setTheme(preferred(),false)};
   if(system.addEventListener)system.addEventListener("change",update);
   else if(system.addListener)system.addListener(update);
  }
  window.addEventListener("storage",event=>{if(event.key===key)setTheme(saved()||preferred(),false)});
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",ready,{once:true});
 else ready();
})();