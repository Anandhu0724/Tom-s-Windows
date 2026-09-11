const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const windows=$("#windows"), startMenu=$("#startMenu"), tom=$("#tom"), tomLayer=$("#tomLayer"), bubble=$("#tomBubble");
let z=30, tomLocked=false, openApps=new Map(), paintColor="#0879f9", brush=5, tomSpeechTimer=0;

const appIcons={
  "This PC":"▣","My Documents":"📁","Microsoft Edge":"e","Recycle Bin":"♲",
  "Paint":"🎨","Notepad":"📝","VLC Media Player":"▰","Calculator":"⌗",
  "YouTube":"▶️","Solitaire":"🃏","Tom Control":"🐱","Outlook Express":"✉️"
};

const tomLines=[
  ["happy","Hehe! I found your mouse. 😼"],
  ["angry","HEY! Don't close my window! 😾"],
  ["sleepy","Five more minutes… zzz… 💤"],
  ["excited","PAINT TIME! 🎨🐾"],
  ["confused","Why did you click that?! 🤨"],
  ["proud","I fixed it. Probably. 😎"],
  ["sad","You closed my cat video… 😿"],
  ["chaos","Your productivity has been selected for deletion. 🐱"]
];

function showTom(line, customText, duration=3300){
  const found=tomLines.find(x=>x[0]===line)||tomLines[Math.floor(Math.random()*tomLines.length)];
  clearTimeout(tomSpeechTimer);
  bubble.textContent=customText||found[1]; bubble.classList.add("show");
  tom.dataset.mood=found[0];
  const moods={happy:"scale(1.02) rotate(-2deg)",angry:"scale(1.05) rotate(3deg)",sleepy:"scale(.94) rotate(-6deg)",excited:"scale(1.12) rotate(-5deg)",confused:"scale(1) rotate(5deg)",proud:"scale(1.04) rotate(2deg)",sad:"scale(.95) rotate(5deg)",chaos:"scale(1.1) rotate(-8deg)"};
  tom.style.transform=moods[found[0]];
  tomSpeechTimer=setTimeout(()=>bubble.classList.remove("show"),duration);
}

function moveTom(x,y){
  const maxX=Math.max(10,innerWidth-135), maxY=Math.max(60,innerHeight-205);
  tomLayer.style.left=Math.max(10,Math.min(maxX,x))+"px";
  tomLayer.style.top=Math.max(60,Math.min(maxY,y))+"px";
}
function randomTom(){moveTom(120+Math.random()*(innerWidth-320),80+Math.random()*(innerHeight-390));}
randomTom();

document.addEventListener("mousemove",e=>{
  const r=tomLayer.getBoundingClientRect(), dx=e.clientX-(r.left+r.width/2), dy=e.clientY-(r.top+r.height/2);
  if(Math.hypot(dx,dy)<220 && !tomLocked) tom.style.transform=`scale(1.03) rotate(${Math.max(-7,Math.min(7,dx/30))}deg)`;
});
setInterval(()=>{if(!tomLocked){randomTom(); if(Math.random()<.7)showTom();}},7000);

function toast(title,msg,action){
  const el=document.createElement("div");el.className="toast";
  el.innerHTML=`<button class="toast-x">×</button><b>${title}</b><small>${msg}</small>`;
  $("#toastStack").appendChild(el);
  el.querySelector(".toast-x").onclick=()=>el.remove();
  setTimeout(()=>el.remove(),6000);
}
function focusWin(w){w.style.zIndex=++z; $$(".task-btn").forEach(b=>b.classList.toggle("active",b.dataset.id===w.dataset.id))}
function addTask(title,id){
  const b=document.createElement("button");b.className="task-btn";b.dataset.id=id;b.textContent=(appIcons[title]||"▣")+" "+title;b.onclick=()=>{const w=document.querySelector(`[data-window-id="${id}"]`);if(w)focusWin(w)};$("#taskButtons").appendChild(b)
}
function closeApp(id,announce=true){
  const w=document.querySelector(`[data-window-id="${id}"]`), title=w?.querySelector(".titlebar b")?.textContent||"window";
  if(w)w.remove();document.querySelector(`.task-btn[data-id="${id}"]`)?.remove();openApps.delete(id);
  if(announce)showTom(title==="YouTube"?"sad":"proud",title==="YouTube"?"You closed my cat videos… 😿":`${title} is closed. Desktop tidy! 😎`);
}

function closeUnnecessaryApps(){
  const keepId=[...document.querySelectorAll(".window")].sort((a,b)=>Number(b.style.zIndex)-Number(a.style.zIndex))[0]?.dataset.windowId;
  [...document.querySelectorAll(".window")].forEach(w=>{if(w.dataset.windowId!==keepId)closeApp(w.dataset.windowId,false)});
  if(keepId)showTom("proud","I closed the background apps. Only the useful window stays open. 😎");
}

function makeWindow(title,content,x,y){
  const id="w"+Date.now()+Math.random().toString(16).slice(2);
  const w=document.createElement("section");w.className="window";w.dataset.windowId=id;
  w.style.left=(x??Math.max(25,(innerWidth-600)/2)+Math.random()*80)+"px";w.style.top=(y??Math.max(60,(innerHeight-430)/2)+Math.random()*50)+"px";w.style.zIndex=++z;
  w.innerHTML=`<div class="titlebar"><span>${appIcons[title]||"▣"}</span><b>${title}</b><div class="win-controls"><button data-cmd="min">−</button><button data-cmd="max">□</button><button data-cmd="close">×</button></div></div><div class="window-content">${content}</div>`;
  windows.appendChild(w);addTask(title,id);openApps.set(title,id);
  w.addEventListener("mousedown",()=>focusWin(w));
  w.querySelector("[data-cmd=close]").onclick=()=>closeApp(id);
  w.querySelector("[data-cmd=min]").onclick=()=>{w.style.display="none";showTom("sleepy",`${title} is taking a little nap. Find it on the taskbar. 💤`)};
  w.querySelector("[data-cmd=max]").onclick=()=>{w.classList.toggle("maximized");if(w.classList.contains("maximized")){w.style.left="15px";w.style.top="15px";w.style.width="calc(100vw - 30px)";w.style.height="calc(100vh - 85px)";showTom("excited",`${title} is ready for serious work! ✨`)}else{w.style.width="600px";w.style.height="390px";showTom("happy",`${title} is back to its normal size.`)}};
  drag(w,w.querySelector(".titlebar"));
  return w;
}
function drag(w,bar){
  let sx,sy,ox,oy,m=false;
  bar.addEventListener("pointerdown",e=>{if(e.target.closest("button"))return;m=true;sx=e.clientX;sy=e.clientY;ox=w.offsetLeft;oy=w.offsetTop;bar.setPointerCapture(e.pointerId)});
  bar.addEventListener("pointermove",e=>{if(!m)return;w.style.left=Math.max(0,ox+e.clientX-sx)+"px";w.style.top=Math.max(0,oy+e.clientY-sy)+"px"});
  bar.addEventListener("pointerup",()=>m=false);
}

function openApp(name,fromTom=false){
  if(name==="Log Off"||name==="Turn Off Computer"||name==="Lock"){lockScreen();return}
  if(openApps.has(name)){const w=document.querySelector(`[data-window-id="${openApps.get(name)}"]`);if(w){w.style.display="block";focusWin(w);showTom("happy",`${name} is already open. I brought it to the front.`)};return}
  let content="";
  if(name==="VLC Media Player"){
    content=`<div class="vlc-player"><video class="vlc-video" src="pecos.mp4" preload="metadata" controls></video><div class="vlc-controls"><button data-vlc="play">▶ Play</button><button data-vlc="pause">⏸ Pause</button><button data-vlc="mute">🔇 Mute</button><span>PECOS video • local media</span></div></div>`;
  }else if(name==="Microsoft Edge"||name==="YouTube"){
    content=`<div class="fake-browser"><div class="browser-bar">🔒 https://${name==="YouTube"?"youtube.com":"microsoft.com"}</div><div class="browser-page"><div><h2>${name==="YouTube"?"Cat Video Time 🐱":"Microsoft Edge"}</h2><p>${name==="YouTube"?"Tom redirected you here because work looked boring.":"A modern browser window inside Tom's desktop."}</p><button onclick="showTom('happy')">${name==="YouTube"?"Watch Tom's recommendation":"Let Tom choose a page"}</button></div></div></div>`;
  }else if(name==="Paint"){
    content=`<div class="paint-wrap"><div class="paint-toolbar"><button class="active" data-color="#0879f9">🔵</button><button data-color="#ef4444">🔴</button><button data-color="#22c55e">🟢</button><button data-color="#f59e0b">🟡</button><button data-color="#111827">⚫</button><button data-size="2">Thin</button><button data-size="10">Thick</button><button id="clearPaint">Clear</button></div><canvas class="paint-canvas"></canvas></div>`;
  }else if(name==="Notepad"){
    content=`<textarea class="note-area" placeholder="Tom left this note here…"></textarea>`;
  }else if(name==="Calculator"){
    content=`<div class="calc"><div class="calc-display">0</div>${["7","8","9","÷","4","5","6","×","1","2","3","−","0",".","=","+"].map(x=>`<button>${x}</button>`).join("")}</div>`;
  }else if(name==="Tom Control"){
    content=`<h3>🐱 Tom Control Center</h3><p>Tom's website-only powers:</p><label><input id="interruptToggle" type="checkbox" checked> Random interruptions</label><br><label><input id="unwantedToggle" type="checkbox" checked> Surprise apps</label><br><label><input id="mouseToggle" type="checkbox"> Temporary mouse capture</label><p style="color:#64748b">These effects only affect this webpage. Browser and operating-system permissions cannot be bypassed by JavaScript.</p>`;
  }else{
    content=`<h2>${name}</h2><p>This is a Windows 11-style simulated app. Tom may decide to open it when he gets bored.</p><button class="primary" onclick="showTom('proud')">Ask Tom</button>`;
  }
  const w=makeWindow(name,content);
  if(name==="Paint")initPaint(w);
  if(name==="Calculator")initCalc(w);
  if(name==="VLC Media Player")initVLC(w);
  showTom(fromTom?"chaos":"happy",fromTom?`I opened ${name}. Try to keep up! 🐾`:`${name} is open and ready.`);
  return w;
}

function initVLC(w){
  const video=w.querySelector(".vlc-video");
  w.querySelector('[data-vlc="play"]').onclick=()=>video.play().catch(()=>{});
  w.querySelector('[data-vlc="pause"]').onclick=()=>video.pause();
  w.querySelector('[data-vlc="mute"]').onclick=e=>{video.muted=!video.muted;e.currentTarget.textContent=video.muted?"🔊 Unmute":"🔇 Mute"};
}

function initPaint(w){
  const c=w.querySelector("canvas"),ctx=c.getContext("2d");
  const resize=()=>{const r=c.getBoundingClientRect(),d=window.devicePixelRatio||1;c.width=r.width*d;c.height=r.height*d;ctx.scale(d,d);ctx.lineCap="round";ctx.lineJoin="round"};
  setTimeout(resize,0);
  let drawing=false;
  c.addEventListener("pointerdown",e=>{drawing=true;ctx.beginPath();ctx.moveTo(e.offsetX,e.offsetY)});
  c.addEventListener("pointermove",e=>{if(!drawing)return;ctx.strokeStyle=paintColor;ctx.lineWidth=brush;ctx.lineTo(e.offsetX,e.offsetY);ctx.stroke()});
  c.addEventListener("pointerup",()=>drawing=false);c.addEventListener("pointerleave",()=>drawing=false);
  w.querySelectorAll("[data-color]").forEach(b=>b.onclick=()=>{paintColor=b.dataset.color;w.querySelectorAll("[data-color]").forEach(x=>x.classList.remove("active"));b.classList.add("active")});
  w.querySelectorAll("[data-size]").forEach(b=>b.onclick=()=>brush=+b.dataset.size);
  w.querySelector("#clearPaint").onclick=()=>ctx.clearRect(0,0,c.width,c.height);
}
function initCalc(w){
  const d=w.querySelector(".calc-display");let value="";
  w.querySelectorAll(".calc button").forEach(b=>b.onclick=()=>{const x=b.textContent;if(x==="="){try{value=String(Function("return "+value.replaceAll("×","*").replaceAll("÷","/"))())}catch{value="Error"}}else if(x==="−"||"+ "){value+=x}else value+=x;d.textContent=value||"0"});
}

$$("[data-app]").forEach(el=>el.addEventListener("dblclick",()=>openApp(el.dataset.app)));

$("#startButton").onclick=()=>startMenu.classList.toggle("hidden");
document.addEventListener("click",e=>{
  if(!e.target.closest("#startMenu,#startButton"))startMenu.classList.add("hidden");
});
$("#enterFullscreen").onclick=async()=>{
  try{await document.documentElement.requestFullscreen()}catch{}
  $("#boot").remove();showTom("excited");toast("Tom is online","He has permission to interrupt this website. 😼","");setTimeout(()=>openApp("Notepad",true),1700);
};

document.addEventListener("contextmenu",e=>{e.preventDefault();const m=$("#contextMenu");m.classList.remove("hidden");m.style.left=Math.min(e.clientX,innerWidth-220)+"px";m.style.top=Math.min(e.clientY,innerHeight-260)+"px"});
document.addEventListener("click",()=>$("#contextMenu").classList.add("hidden"));
$("#contextMenu").onclick=e=>{const a=e.target.closest("button")?.dataset.action;if(!a)return;if(a==="paint")openApp("Paint",true);if(a==="tom")showTom();if(a==="refresh"){showTom("chaos");toast("Refresh denied","Tom is currently using the desktop.");}};

function lockScreen(){
  if(document.querySelector(".lock-overlay"))return;
  const now=new Date();
  const time=now.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
  const date=now.toLocaleDateString([], {weekday:"long",month:"long",day:"numeric"});
  const o=document.createElement("div");o.className="lock-overlay";o.innerHTML=`<div class="lock-card"><div class="lock-time">${time}</div><div class="lock-date">${date}</div><img src="tom.png" alt="Tom"><h2>Tom has taken over</h2><p>Desktop locked</p><button>Sign in</button></div>`;
  document.body.appendChild(o);tomLocked=true;showTom("chaos","Desktop locked. Tom is in charge now. 🔒",5000);
  o.querySelector("button").onclick=()=>{o.remove();tomLocked=false;randomTom();showTom("happy","Welcome back. I kept everything exactly where I found it. 😼");toast("Desktop unlocked","Tom promises nothing.","")};
}
$("#lockTom").onclick=lockScreen;

document.addEventListener("keydown",e=>{
  if(e.key==="Escape"&&tomLocked){document.querySelector(".lock-overlay")?.remove();tomLocked=false;showTom("happy","Emergency exit accepted. The desktop is yours again.")}
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="p"){e.preventDefault();openApp("Paint",true);showTom("excited")}
  if(e.key==="F2"){showTom("confused")}
});

let interruptions=true,surprises=true;
setInterval(()=>{
  if(!interruptions||tomLocked||document.querySelector(".boot"))return;
  const n=Math.random();
  if(n<.28&&!bubble.classList.contains("show")){showTom(["happy","angry","sleepy","excited","confused","proud","sad","chaos"][Math.floor(Math.random()*8)]);toast("Tom says",["Time for a break!","Stop closing my windows.","I opened Paint for you.","Your mouse looks suspicious.","Cat video recommended."][Math.floor(Math.random()*5)],"")}
  if(surprises&&n>.82){closeUnnecessaryApps();const apps=["Paint","Notepad","Calculator","YouTube"];openApp(apps[Math.floor(Math.random()*apps.length)],true);showTom("chaos")}
},12000);

$("#clock")?.replaceChildren();
function clock(){const d=new Date();$("#clock").textContent=d.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});$("#date").textContent=d.toLocaleDateString([], {day:"2-digit",month:"2-digit",year:"numeric"})}
setInterval(clock,1000);clock();

document.addEventListener("change",e=>{
  if(e.target.id==="interruptToggle")interruptions=e.target.checked;
  if(e.target.id==="unwantedToggle")surprises=e.target.checked;
  if(e.target.id==="mouseToggle"&&e.target.checked){
    if(document.pointerLockElement!==document.body)document.body.requestPointerLock?.();
    toast("Mouse captured","Tom is borrowing the pointer briefly. Press Esc to release.","");
    setTimeout(()=>document.exitPointerLock?.(),3500);
  }
});
