/*argilla.c.visual*/

/*$(window).scroll(function () {
    $upe = $(".bkg-prx_u");
    $upa = $upe.scrollTop();
    $upo = $upe.offset().top;
    $ups = $upa - $upo;
    $(".bkg-prx_u").css("background-position","center " + ($ups /-2 - ($(".bkg-prx_u").height()/2.5)) + "px");
});*/


/*(function(){

  var parallax = document.querySelectorAll(".parallax"),
      speed = 0.5;

  window.onscroll = function(){
    [].slice.call(parallax).forEach(function(el,i){

      var windowYOffset = window.pageYOffset,
          elBackgrounPos = "0 " + (windowYOffset * speed) + "px";
      
      el.style.backgroundPosition = elBackgrounPos;

    });
  };
}
*/

/*
$(window).scroll(function () {
    $(".bkg-prx_u").css("background-position","center " + ($(this).scrollTop() /-5) + "px");
});
$(window).scroll(function () {
    $(".bkg-prx_l").css("background-position",($(this).scrollTop() /-5) + "px");
});
$(window).scroll(function () {
    $(".bkg-prx_r").css("background-position",($(this).scrollTop() /3 - ($(".bkg-prx_r").width())/2) + "px");
});
$(window).scroll(function () {
    $(".bkg-prx_d").css("background-position","center " + ($(this).scrollTop() /5 - ($(".bkg-prx_d").height()/2)) + "px");
});*/

/*bkg-prx
$(document).ready(function () {
  var prxu = '.bkg-prx_u';
  var pp = $(prxu).offset().top;
  var vp = $(window).height();
  $(window).scroll(function (event) {
  var y = $(this).scrollTop();
  var v = 0.2;
  var tp = y - pp;
  $(prxu).css("background-position","center " + tp + "px");
  });
});
$(document).ready(function () {
  var prxd = '.bkg-prx_d';
  var pp = $(prxd).offset().top;
  var vp = $(window).height();
  $(window).scroll(function (event) {
  var y = $(this).scrollTop();
  var v = 0 - 0.2;
  var tp = y - pp;
  $(prxd).css("background-position","center " + tp + "px");
  });
});

$(document).ready(function () {
  var prxl = '.bkg-prx_l';
  var pp = $(prxl).offset().top;
  var vp = $(window).height();
  $(window).scroll(function (event) {
  var y = $(this).scrollTop();
  var v = 0.2;
  var tp = (pp - y) * (v);
  $(prxl).css("background-position", tp + "px" + " center");
  });
});

$(document).ready(function () {
  var prxr = '.bkg-prx_r';
  var pp = $(prxr).offset().top;
  var vp = $(window).height();
  $(window).scroll(function (event) {
  var y = $(this).scrollTop();
  var v = 0 - 0.2;
  var tp = (pp - y) * (v);
  $(prxr).css("background-position", tp + "px" + " center");
  });
});
*/
/*bkg-prx*/
window.onload = function(){parallax();};
document.onscroll = function(){parallax();};
function parallax(){
  prxu = document.getElementsByClassName('bkg-prx_u');
  prxd = document.getElementsByClassName('bkg-prx_d');
  prxl = document.getElementsByClassName('bkg-prx_l');
  prxr = document.getElementsByClassName('bkg-prx_r');
  var top = window.scrollY;
  var left = window.scrollX;
  var wh = window.innerHeight;
  var ww = window.innerWidth;
  for (var i = 0; i < prxu.length; i++) {
    var imagine = prxu[i].offsetTop;
    var real = top + wh - imagine;
    var final = -real*.3+"px";
    var pos = "center "+final;
    prxu[i].style.backgroundPosition = pos;
  }
  for (var i = 0; i < prxd.length; i++) {
    var imagine = prxd[i].offsetTop;
    var real = imagine - top;
    var final = real*.3+"px";
    var pos = "center "+final;
    prxd[i].style.backgroundPosition = pos;
  }
  for (var i = 0; i < prxl.length; i++) {
    var imagine = prxl[i].offsetTop;
    var real = top + wh - imagine;
    var final = -real*.3+"px";
    var pos = final+" center";
    prxl[i].style.backgroundPosition = pos;
  }
  for (var i = 0; i < prxr.length; i++) {
    var imagine = prxr[i].offsetTop;
    var real = top - wh - imagine;
    var final = real*.3+"px";
    var pos = final+" center";
    prxr[i].style.backgroundPosition = pos;
  }
}


/*sticky2
$(document).ready(function () {  
  var so = '.p-s';
  var sp = $(so).offset().top;
  var vp = $(window).height();
  var fp = sp - vp;
  $(window).scroll(function (event) {
    var y = $(this).scrollTop();
    if (y >= fp)
      $(so).addClass('up');
    else
      $(so).removeClass('up');
  });
});*/

window.onscroll = function() {sticky(); scrollani();}
/*sticky*/
function sticky() {
  var so = document.querySelectorAll('.p-s');
  var vp = window.innerHeight;
  window.onscroll = function() {
    for (i = 0; i < so.length; i++) {
      var y = so[i].scrollTop;
      var sp = so[i].offsetTop;
      var fp = sp - vp;
      if (y >= fp) {so[i].classList.add('up');}else{so[i].classList.remove('up');}
    }
  }
}
/*scrollani
$(document).ready(function () {
  var ao = '.a-s';
  var ap = $(ao).offset().top;
  var vp = $(window).height();
  var fp = ap - vp;
  $(ao).addClass('a-stop');
  $(window).scroll(function (event) {
    var y = $(this).scrollTop();
    if (y >= fp)
      $(ao).removeClass('a-stop');
    else
      $(ao).addClass('a-stop');
  });
});*/
/*scrollani*/
function scrollani() {
  var ao = document.querySelectorAll('.a-s');
  var vp = window.innerHeight;
  window.onscroll = function() {
    for (i = 0; i < ao.length; i++) {
      var y = ao[i].scrollTop;
      var ap = ao[i].offsetTop;
      var fp = ap - vp;
      if (y >= fp) {ao[i].classList.remove('a-stop');}else{ao[i].classList.add('a-stop');}
    }
  }
}
