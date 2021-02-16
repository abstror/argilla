/*argilla.c.preloader*/
/*document.getElementsByTagName('html')[0].style.display = "none";*/

var js = ['jquery','w','f', 'd', 'v'];
for (i=0; i<js.length; i++){
  var jsap = document.createElement('script');
  jsap.type = 'text/javascript';
  jsap.src = 'https://abstror.neocities.org/argilla/c/'+js[i]+'.js';
  document.getElementsByTagName('body')[0].appendChild(jsap);
}
var jsad = document.createElement('script');
jsad.type = 'text/javascript';
jsad.src = 'c/a.js';
document.getElementsByTagName('body')[0].appendChild(jsad);

var cs = ['p','s','e','t','c','d','i','a','f'];
for (i=0; i<cs.length; i++){
  var csap = document.createElement('link');
  csap.rel = 'stylesheet';
  csap.href = 'https://abstror.neocities.org/argilla/s/'+cs[i]+'.css';
  document.getElementsByTagName('head')[0].appendChild(csap);
}
var csad = document.createElement('link');
csad.rel = 'stylesheet';
csad.href = 's/color.css';
document.getElementsByTagName('head')[0].appendChild(csad);
var csat = document.createElement('link');
csat.rel = 'stylesheet';
csat.href = 's/theme.css';
document.getElementsByTagName('head')[0].appendChild(csat);

/*document.getElementsByTagName('html')[0].style.display = none;*/
