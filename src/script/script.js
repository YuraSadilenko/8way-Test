//navigation scroll effect
(window.onscroll = function(){
  var html = document.documentElement;
  var body = document.body;

  var navigation = document.querySelector('.navigation__wrap');
  var anim = document.querySelector('.voyager__svg-animate'); 
  var animOpac = document.querySelectorAll('.opc-block');


  if( html.scrollTop > 0 || body.scrollTop > 0 ) { 
    navigation.style.transition = 'all .5s';
    navigation.style.transform = 'translateY(0)';
  } else {
    navigation.style.transform = 'translateY(-110%)';
  }

  //animate block with scroll
  if( html.scrollTop > 200 || body.scrollTop > 200 ) { 
    anim.classList.add('fadeInLeftBig', 'slower');

    for(var i = 0; i < animOpac.length; i++){
        animOpac[i].classList.add('fadeInUpBig', 'slower')
    }
  } else {
    anim.classList.remove('fadeInLeftBig')

        for(var i = 0; i < animOpac.length; i++){
            animOpac[i].classList.remove('fadeInUpBig')
        }
  }
})(); 

//voyager carousel
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
      factory(exports);
  } else {
      factory((root.dragscroll = {}));
  }
}(this, function (exports) {
  var _window = window;
  var _document = document;
  var mousemove = 'mousemove';
  var mouseup = 'mouseup';
  var mousedown = 'mousedown';
  var EventListener = 'EventListener';
  var addEventListener = 'add'+EventListener;
  var removeEventListener = 'remove'+EventListener;
  var newScrollX, newScrollY;

  var dragged = [];
  var reset = function(i, el) {
      for (i = 0; i < dragged.length;) {
          el = dragged[i++];
          el = el.container || el;
          el[removeEventListener](mousedown, el.md, 0);
          _window[removeEventListener](mouseup, el.mu, 0);
          _window[removeEventListener](mousemove, el.mm, 0);
      }

      // cloning into array since HTMLCollection is updated dynamically
      dragged = [].slice.call(_document.getElementsByClassName('dragscroll'));
      for (i = 0; i < dragged.length;) {
          (function(el, lastClientX, lastClientY, pushed, scroller, cont){
              (cont = el.container || el)[addEventListener](
                  mousedown,
                  cont.md = function(e) {
                      if (!el.hasAttribute('nochilddrag') ||
                          _document.elementFromPoint(
                              e.pageX, e.pageY
                          ) == cont
                      ) {
                          pushed = 1;
                          lastClientX = e.clientX;
                          lastClientY = e.clientY;

                          e.preventDefault();
                      }
                  }, 0
              );

          _window[addEventListener](
              mouseup, cont.mu = function() {pushed = 0;}, 0
          );

          _window[addEventListener](
              mousemove,
              cont.mm = function(e) {
                  if (pushed) {
                      (scroller = el.scroller||el).scrollLeft -=
                          newScrollX = (- lastClientX + (lastClientX=e.clientX));
                      scroller.scrollTop -=
                          newScrollY = (- lastClientY + (lastClientY=e.clientY));
                      if (el == _document.body) {
                          (scroller = _document.documentElement).scrollLeft -= newScrollX;
                          scroller.scrollTop -= newScrollY;
                      }
                  }
              }, 0
          );
          })(dragged[i++]);
  }
}

  
if (_document.readyState == 'complete') {
  reset();
} else {
  _window[addEventListener]('load', reset, 0);
}

exports.reset = reset;
}));


(() => {    
    var btnMenu = document.querySelector('.menu-btn');
    var menuToggle = document.querySelectorAll('.menu-btn span');

    btnMenu.onclick = function() {
        for( var i = 0; i < menuToggle.length; i++) {
            menuToggle[i].classList.toggle('active')
        }
    }

})();

//Menu animation 
(() => {
    var btnMenu = document.querySelector('.menu-btn');
    var menu = document.querySelector('.menu');
    var secBlock = document.querySelector('.menu__sub');

    var menuLinkFirst = document.querySelectorAll('.menu__list-general .menu__list-item a, .menu__list-general .menu__list-item span');
    var menuLinkSecond = document.querySelectorAll('.menu__list-blocks .menu__list-item a, .menu__list-blocks .menu__list-item span');
    var menuLinkThird = document.querySelectorAll('.menu__list-languages .menu__list-item a, .menu__list-languages .menu__list-item span');

    var bgText = document.querySelector('.menu__bg-text');

    var handler = function() {
        menu.classList.remove('fa-enter-active');
        secBlock.classList.remove('fa-transform-sub', 'fa-links-active');
        bgText.classList.remove('fa-links-active-slow', 'fa-transform-none');

        for( var i = 0; i < menuLinkFirst.length; i++ ) {
            menuLinkFirst[i].classList.remove('fa-links-active');
        }

        for( var i = 0; i < menuLinkSecond.length; i++ ) {
            menuLinkSecond[i].classList.remove('fa-links-active');
        }

        for( var i = 0; i < menuLinkThird.length; i++ ) {
            menuLinkThird[i].classList.remove('fa-links-active');
        }
        menu.removeEventListener('transitionend', handler);
    }

    btnMenu.addEventListener('click', function() {

        if(menu.style.display === 'block') {
            handler();

            raf(function() {
                menu.classList.add('fa-enter-active');
                menu.classList.remove('fa-transform-active');

                if(menu.style.transform === 'translateX(100%)') {
                    menu.style.transform = 'translateX(0)';

                    for( var i = 0; i < menuLinkFirst.length; i++ ) {
                        menuLinkFirst[i].classList.remove('fa-links-active');
                    }
                    for( var i = 0; i < menuLinkSecond.length; i++ ) {
                        menuLinkSecond[i].classList.remove('fa-links-active');
                    }
                    for( var i = 0; i < menuLinkThird.length; i++ ) {
                        menuLinkThird[i].classList.remove('fa-links-active');
                    }
                } else {
                    menu.style.transform = 'translateX(100%)';
                }
            });


        }
        else {
            menu.style.display = 'block';
            menu.classList.add('fa-enter', 'fa-transform');
            bgText.classList.remove('fa-links-active-slow')

            handler();


            menu.addEventListener('transitionend', function() {
                secBlock.classList.add('fa-links-active', 'fa-transform-sub');
                bgText.classList.add('fa-links-active-slow', 'fa-transform-none');

                for(var i = 0; i < menuLinkFirst.length; i++) {
                    menuLinkFirst[i].style.transform = 'translateY(0)';
                    menuLinkFirst[i].classList.add('fa-links-active');

                    menuLinkFirst[i].addEventListener('transitionend', function() {
                        for(var i = 0; i < menuLinkSecond.length; i++) {
                            menuLinkSecond[i].style.transform = 'translateY(0)';
                            menuLinkSecond[i].classList.add('fa-links-active');

                            menuLinkSecond[i].addEventListener('transitionend', function() {
                                for(var i = 0; i < menuLinkThird.length; i++) {
                                    menuLinkThird[i].style.transform = 'translateY(0)';
                                    menuLinkThird[i].classList.add('fa-links-active');
                                }
                            })
                        }
                    })
                }
            });

            raf(function() {
                menu.classList.add('fa-enter-active');
                menu.classList.remove('fa-transform-active', 'fa-enter', 'fa-transform');
                secBlock.classList.remove('fa-links-active', 'fa-transform-sub');
                bgText.classList.remove('fa-links-active-slow')
    
                for( var i = 0; i < menuLinkFirst.length; i++ ) {
                    menuLinkFirst[i].classList.remove('fa-links-active');
                    menuLinkFirst[i].style.transform = 'translateY(100%)';
                }

                for( var i = 0; i < menuLinkSecond.length; i++ ) {
                    menuLinkSecond[i].classList.remove('fa-links-active');
                    menuLinkSecond[i].style.transform = 'translateY(100%)';
                }

                for( var i = 0; i < menuLinkThird.length; i++ ) {
                    menuLinkThird[i].classList.remove('fa-links-active');
                    menuLinkThird[i].style.transform = 'translateY(100%)';
                }
            });

            menu.addEventListener('transitionend', handler)
         }


        raf(function() {
            menu.classList.add('fa-enter-active');
            menu.classList.remove('fa-transform-active', 'fa-enter', 'fa-transform');

            secBlock.classList.remove('fa-links-active', 'fa-transform-sub');

            bgText.classList.remove('fa-links-active-slow')

            for( var i = 0; i < menuLinkFirst.length; i++ ) {
                menuLinkFirst[i].classList.remove('fa-links-active');
                menuLinkFirst[i].style.transform = 'translateY(100%)';
            }

            for( var i = 0; i < menuLinkSecond.length; i++ ) {
                menuLinkSecond[i].classList.remove('fa-links-active');
                menuLinkSecond[i].style.transform = 'translateY(100%)';
            }

            for( var i = 0; i < menuLinkThird.length; i++ ) {
                menuLinkThird[i].classList.remove('fa-links-active');
                menuLinkThird[i].style.transform = 'translateY(100%)';
            }

        });

    })
   
})();

function raf(fn) {
    window.requestAnimationFrame(function() {
        window.requestAnimationFrame(function() {
            fn();
        })
    })
}












