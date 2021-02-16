/*argilla.c.interact*/
/*shortcut*/  /**
 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * Version : 2.01.B
 * By Binny V A
 * License : BSD
 */
shortcut = {
	'all_shortcuts':{},//All the shortcuts are stored in this array
	'add': function(shortcut_combination,callback,opt) {
		//Provide a set of default options
		var default_options = {
			'type':'keydown',
			'propagate':false,
			'disable_in_input':false,
			'target':document,
			'keycode':false
		}
		if(!opt) opt = default_options;
		else {
			for(var dfo in default_options) {
				if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
			}
		}

		var ele = opt.target;
		if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
		var ths = this;
		shortcut_combination = shortcut_combination.toLowerCase();

		//The function to be called at keypress
		var func = function(e) {
			e = e || window.event;
			
			if(opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields
				var element;
				if(e.target) element=e.target;
				else if(e.srcElement) element=e.srcElement;
				if(element.nodeType==3) element=element.parentNode;

				if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
			}
	
			//Find Which key is pressed
			if (e.keyCode) code = e.keyCode;
			else if (e.which) code = e.which;
			var character = String.fromCharCode(code).toLowerCase();
			
			if(code == 188) character=","; //If the user presses , when the type is onkeydown
			if(code == 190) character="."; //If the user presses , when the type is onkeydown

			var keys = shortcut_combination.split("+");
			//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
			var kp = 0;
			
			//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
			var shift_nums = {
				"`":"~",
				"1":"!",
				"2":"@",
				"3":"#",
				"4":"$",
				"5":"%",
				"6":"^",
				"7":"&",
				"8":"*",
				"9":"(",
				"0":")",
				"-":"_",
				"=":"+",
				";":":",
				"'":"\"",
				",":"<",
				".":">",
				"/":"?",
				"\\":"|"
			};
			//Special Keys - and their codes
			var special_keys = {
				'esc':27,
				'escape':27,
				'tab':9,
				'space':32,
				'return':13,
				'enter':13,
				'backspace':8,
	
				'scrolllock':145,
				'scroll_lock':145,
				'scroll':145,
				'capslock':20,
				'caps_lock':20,
				'caps':20,
				'numlock':144,
				'num_lock':144,
				'num':144,
				
				'pause':19,
				'break':19,
				
				'insert':45,
				'home':36,
				'delete':46,
				'end':35,
				
				'pageup':33,
				'page_up':33,
				'pu':33,
	
				'pagedown':34,
				'page_down':34,
				'pd':34,
	
				'left':37,
				'up':38,
				'right':39,
				'down':40,
	
				'f1':112,
				'f2':113,
				'f3':114,
				'f4':115,
				'f5':116,
				'f6':117,
				'f7':118,
				'f8':119,
				'f9':120,
				'f10':121,
				'f11':122,
				'f12':123,
				
				'super':91 /*modified*/
			};
	
			var modifiers = { 
				shift: { wanted:false, pressed:false},
				ctrl : { wanted:false, pressed:false},
				alt  : { wanted:false, pressed:false},
				meta : { wanted:false, pressed:false}	//Meta is Mac specific
			};
                        
			if(e.ctrlKey)	modifiers.ctrl.pressed = true;
			if(e.shiftKey)	modifiers.shift.pressed = true;
			if(e.altKey)	modifiers.alt.pressed = true;
			if(e.metaKey)   modifiers.meta.pressed = true;
                        
			for(var i=0; k=keys[i],i<keys.length; i++) {
				//Modifiers
				if(k == 'ctrl' || k == 'control') {
					kp++;
					modifiers.ctrl.wanted = true;

				} else if(k == 'shift') {
					kp++;
					modifiers.shift.wanted = true;

				} else if(k == 'alt') {
					kp++;
					modifiers.alt.wanted = true;
				} else if(k == 'meta') {
					kp++;
					modifiers.meta.wanted = true;
				} else if(k.length > 1) { //If it is a special key
					if(special_keys[k] == code) kp++;
					
				} else if(opt['keycode']) {
					if(opt['keycode'] == code) kp++;

				} else { //The special keys did not match
					if(character == k) kp++;
					else {
						if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
							character = shift_nums[character]; 
							if(character == k) kp++;
						}
					}
				}
			}
			
			if(kp == keys.length && 
						modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
						modifiers.shift.pressed == modifiers.shift.wanted &&
						modifiers.alt.pressed == modifiers.alt.wanted &&
						modifiers.meta.pressed == modifiers.meta.wanted) {
				callback(e);
	
				if(!opt['propagate']) { //Stop the event
					//e.cancelBubble is supported by IE - this will kill the bubbling process.
					e.cancelBubble = true;
					e.returnValue = false;
	
					//e.stopPropagation works in Firefox.
					if (e.stopPropagation) {
						e.stopPropagation();
						e.preventDefault();
					}
					return false;
				}
			}
		}
		this.all_shortcuts[shortcut_combination] = {
			'callback':func, 
			'target':ele, 
			'event': opt['type']
		};
		//Attach the function with the event
		if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
		else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
		else ele['on'+opt['type']] = func;
	},

	//Remove the shortcut - just specify the shortcut and I will remove the binding
	'remove':function(shortcut_combination) {
		shortcut_combination = shortcut_combination.toLowerCase();
		var binding = this.all_shortcuts[shortcut_combination];
		delete(this.all_shortcuts[shortcut_combination])
		if(!binding) return;
		var type = binding['event'];
		var ele = binding['target'];
		var callback = binding['callback'];

		if(ele.detachEvent) ele.detachEvent('on'+type, callback);
		else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
		else ele['on'+type] = false;
	}
}
function hotkey(keys,fun){shortcut.add(keys,fun);}
function coldkey(keys){shortcut.remove(keys);}
/*timer*/
function timer(fun,num){setTimeout(fun,num*1000);}
/*time*/
function jdate() {
  var adt = new Date;
  var jdates = document.querySelectorAll('.realtime');
  for (i = 0; i < jdates.length; i++) {jdates[i].innerHTML = adt.toString();}
}
function wdate(){
  var adt = new Date;
  var w = adt.getDate();
  var month = new Array();
  month[0] = "Enero";
  month[1] = "Febrero";
  month[2] = "Marzo";
  month[3] = "Abril";
  month[4] = "Mayo";
  month[5] = "Junio";
  month[6] = "Julio";
  month[7] = "Agosto";
  month[8] = "Septiembre";
  month[9] = "Octubre";
  month[10] = "Noviembre";
  month[11] = "Diciembre";
  var m = month[adt.getMonth()];
  var weekday = new Array(7);
  weekday[0] = "Domingo";
  weekday[1] = "Lunes";
  weekday[2] = "Martes";
  weekday[3] = "Miércoles";/*Ã©*/
  weekday[4] = "Jueves";
  weekday[5] = "Viernes";
  weekday[6] = "Sábado";/*Ã¡*/
  var d = weekday[adt.getDay()];
  var y = adt.getFullYear();
  var wdates = document.querySelectorAll('.today');
  for (var i = 0; i < wdates.length; i++){wdates[i].innerHTML = d + ", " + w + " de " + m + " del " + y;}
}
function ydate(){
  setTimeout
  var adt = new Date;
  var w = adt.getDate();
  var month = new Array();
  month[0] = "Enero";
  month[1] = "Febrero";
  month[2] = "Marzo";
  month[3] = "Abril";
  month[4] = "Mayo";
  month[5] = "Junio";
  month[6] = "Julio";
  month[7] = "Agosto";
  month[8] = "Septiembre";
  month[9] = "Octubre";
  month[10] = "Noviembre";
  month[11] = "Diciembre";
  var m = month[adt.getMonth()];
  var weekday = new Array(7);
  weekday[0] = "Domingo";
  weekday[1] = "Lunes";
  weekday[2] = "Martes";
  weekday[3] = "Miércoles";
  weekday[4] = "Jueves";
  weekday[5] = "Viernes";
  weekday[6] = "Sábado";
  var d = weekday[adt.getDay()];
  var ydates = document.querySelectorAll('.day');
  for (var i = 0; i < ydates.length; i++){ydates[i].innerHTML = d + ", " + w + " de " + m;}
}
function nyear() {
  var adt = new Date;
  var y = adt.getFullYear();
  var nyears = document.querySelectorAll('.year');
  for (var i = 0; i < nyears.length; i++){nyears[i].innerHTML = y;}
}
function ndate() {
  var adt = new Date;
  var d = adt.getDate();
  var m = adt.getMonth() + 1;
  var y = adt.getFullYear() - 2000;
  var ndates = document.querySelectorAll('.date');
  if (d < 10) {d = "0" + d;}
  if (m < 10) {m = "0" + m;}
  for (var i = 0; i < ndates.length; i++){ndates[i].innerHTML = d + "/" + m + "/" + y;}
}
function whour() {
  var adt = new Date;
  var h = adt.getHours();
  var m = adt.getMinutes();
  var whours = document.querySelectorAll('.hour');
  if (h < 10) {h = "0" + h;}
  if (m < 10) {m = "0" + m;}
  for (var i = 0; i < whours.length; i++){whours[i].innerHTML = h + ":" + m;}
}
function whsec() {
  var adt = new Date;
  var h = adt.getHours();
  var m = adt.getMinutes();
  var s = adt.getSeconds();
  if (h < 10) {h = "0" + h;}
  if (m < 10) {m = "0" + m;}
  if (s < 10) {s = "0" + s;}
  var whsecs = document.querySelectorAll('.seconds');
  for (i = 0; i < whsecs.length; i++) {whsecs[i].innerHTML = h + ":" + m + ":" + s;}
}
function wcron() {
  var adt = new Date;
  var s = adt.getSeconds();
  var l = adt.getMilliseconds();
  if (s < 10) {s = "0" + s;}
  if (l < 10) {l = "0" + l;}
  var wcrons = document.querySelectorAll('.mseconds');
  for (i = 0; i < wcrons.length; i++) {wcrons[i].innerHTML = s + ":" + l;}
}
var jdatet = setInterval(jdate, 500);
var wdatet = setInterval(wdate, 1000);
var ydatet = setInterval(ydate, 1000);
var nyeart = setInterval(nyear, 1000);
var ndatet = setInterval(ndate, 1000);
var whourt = setInterval(whour, 1000);
var whsect = setInterval(whsec, 500);
var whcront = setInterval(wcron, 10);
/*display*/
function show(shows){document.getElementById(shows).classList.remove('s-neg');}
function tmhide(tm,hides){setTimeout ("hide(hides);", tm*1000);}
function hide(hides){document.getElementById(hides).classList.add('s-neg');}
function toggle(toggles){document.getElementById(toggles).classList.toggle('s-neg');}

/*dinamic tabs*/
/*retro*/
function tab(evt, patab, tabs) {
  var i, patab, tabs, alltabs, allbuts;
  alltabs = document.getElementById(patab).children;
  for (i = 0; i < alltabs.length; i++) {
    alltabs[i].classList.add('s-neg');
  }
  allbuts = evt.currentTarget.parentElement.children;
  for (i = 0; i < allbuts.length; i++) {
    allbuts[i].blur();
  }
  document.getElementById(tabs).classList.remove('s-neg');
  evt.currentTarget.focus();
}
function itab(evt, patab, tabs) {
  var i, patab, tabs, alltabs, allbuts;
  alltabs = document.getElementById(patab).children;
  for (i = 0; i < alltabs.length; i++) {
    alltabs[i].classList.add('s-neg');
  }
  allbuts = evt.currentTarget.parentElement.children;
  for (i = 0; i < allbuts.length; i++) {
    allbuts[i].classList.remove('s-act');
  }
  document.getElementById(tabs).classList.remove('s-neg');
  evt.currentTarget.classList.add('s-act');
}
/*new*/
function index(act){
  var allx = document.getElementById(act).parentElement.children;
  for (var i = 0; i < allx.length; i++) {allx[i].classList.add('s-neg');}
  document.getElementById(act).classList.remove('s-neg');
}
function tabs(it,act){
  var allf = document.getElementById(it).parentElement.children;
  var allx = document.getElementById(act).parentElement.children;
  for (var i = 0; i < allx.length; i++) {allx[i].classList.add('s-neg');}
  for (var i = 0; i < allf.length; i++) {allf[i].classList.remove('s-act');}
  document.getElementById(act).classList.remove('s-neg');
  document.getElementById(it).classList.add('s-act');
}
/*classes*/
function addclass(adder,addcls) {document.getElementById(adder).classList.add(addcls);}
function remclass(remer,remcls) {document.getElementById(remer).classList.remove(remcls);}
function togclass(toger,togcls) {document.getElementById(toger).classList.toggle(togcls);}
/*fullscreen*/
function fullscreen(id) {
  if(id){}else{id="";}
  if(id === ""){elem = document.getElementsByTagName('body')[0];}else{elem = document.getElementById(id);}
  if (elem.requestFullscreen) {elem.requestFullscreen();} else if (elem.webkitRequestFullscreen) {elem.webkitRequestFullscreen();} else if (elem.msRequestFullscreen) {elem.msRequestFullscreen();}
}
/*DOM*/
function header(type,id,content) {
  switch(type) {
    case "css":
      var newe = document.createElement('style');
      newe.id = id;
      newe.type = "text/css";
      newe.appendChild(document.createTextNode(content));
      document.head.appendChild(newe);
    break;
  }
}
function bodier(type,id,content) {
  switch(type) {
    case "css":
      var newe = document.createElement('style');
      newe.id = id;
      newe.type = "text/css";
      newe.appendChild(document.createTextNode(content));
      document.body.appendChild(newe);
    break;
  }
}
/*location*/
function path(){return location.pathname;}
function anchor(id){document.getElementById(id).scrollIntoView();}
function tohash(id){location.hash = id;}
function hash(){return location.hash;}
function quest(sea){location.search = sea;}
function query(){return location.search;}
function hostname(){return location.hostname;}
function url(uri){location.replace(uri);}
/*math*/
function random(a,b){return Math.round(Math.random()*(b-a)+parseInt(a));}
function fibonacci(n){
  result=0;
  choya=0;
  tail=1;
  for(i=0;i<n-1;i++){
    result=choya+tail;
    tail=choya;
    choya=result;
  }
  return result;
}
