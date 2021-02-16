/*argilla.c.files*/
/*cookie*/
function ckread(coname){
  var name = coname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function ckwrite(coname, ckc){
  document.cookie = coname + "=" + ckc + ";" + "expires=Sun, 01 Jan 2023 12:00:00 UTC; path=/"; 
}
function ckdel(coname){
  document.cookie = coname + "=" + "" + ";" + "expires=Sun, 01 Jan 2023 12:00:00 UTC; path=/"; 
}
/*localstorage*/
function lsread(lsname){return localStorage.getItem(lsname);}
function lswrite(lsname, lsc){localStorage.setItem(lsname, lsc);}
function lsdel(lsname){localStorage.removeItem(lsname);}
/*zip
function zipi(global, dir, name, content){
  var global  = new JSZip();
  global.file(name, content);
}
function zipd(global){
  global.generateAsync({type:"blob"})
.then(function(content)) {
    saveAs(content, global);
  }
}
function zipu(){
}*/
/*ajax*/
function importajax(server,contin) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", server, true);
  xhr.send();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      contin(this);
    }
  };
}
/*json*/
function jsonparse(content){return JSON.parse(content);}
function jsonstring(content){return JSON.stringify(content);}
function importjson(server,contin) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", server, true);
  xhr.send();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var pre = jsonparse(this.responseText);
      contin(pre);
    }
  };
}
function exportjson(label,server){
}

function htmljson(id){
return htmlToJson(document.getElementById(id));
  function htmlToJson(div,obj){
   if(!obj){obj=[]}
   var tag = {};
   tag['tagName']=div.tagName;
   if (div.children.length>=1){tag['children'] = []}
   for(var i = 0; i< div.children.length;i++){
      tag['children'].push(htmlToJson(div.children[i]));
   }
   for(var i = 0; i< div.attributes.length;i++){
      var attr= div.attributes[i];
      tag[attr.name] = attr.value;
   }
   return tag;
  }
}
function jsonhtml() {
}