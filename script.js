function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });



  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
loco();

function img() {
  let image = document.querySelector('#page2 .image img');
  let images = [
    'image/page2/image1.webp',
    'image/page2/image2.webp',
    'image/page2/image3.webp'
  ];

  setInterval(function () {
    let random = Math.floor(Math.random() * 3);
    let newImage = new Image();
    newImage.src = images[random];
    newImage.onload = function () {
      image.classList.add('fade-out');
      setTimeout(function () {
        image.src = newImage.src;
        image.classList.remove('fade-out');
      }, 1000);
    };
  }, 3000);
}
img();

function mouse() {
  var cursor = document.querySelector('.cursor');

  window.addEventListener('mousemove', function (dets) {
    cursor.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;
  });
}
mouse();

function cursor() {
  var video = document.querySelectorAll('#page1>.video');
  var cursor = document.querySelector('.cursor');

  window.addEventListener('mousemove', function (dets) {
    cursor.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;
  });

  //video
  var video = document.querySelectorAll('#page1>.video>video');
  var cursor = document.querySelector('.cursor');

  video.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
      var vid = elem.getAttribute('data-text');
      cursor.innerHTML = vid;
      cursor.style.width = '80px';
      cursor.style.left = '-50px';
      cursor.style.padding = "5px 15px";
      cursor.style.borderRadius = "50px";
      cursor.style.mixBlendMode = "difference";
      cursor.style.backgroundColor = "#edbfff";
      cursor.style.textTransform = "capitalize";
    });

    elem.addEventListener("mouseleave", function () {
      cursor.innerHTML = "";
      cursor.style.width = "";
      cursor.style.left = "";
      cursor.style.padding = "";
      cursor.style.borderRadius = "";
      cursor.style.mixBlendMode = "";
      cursor.style.backgroundColor = "";
      cursor.style.textTransform = "";
    });
  });


  var vido = document.querySelector('#page1>.video>video');
  var videoText = document.querySelector("#page1>.video>h4")
  vido.onclick = function () {
    if (vido.muted) {
      cursor.innerHTML = 'sound off';
      vido.muted = false;
      videoText.style.display = 'none';
    }
    else {
      var vid = vido.getAttribute('data-text');
      cursor.innerHTML = vid;
      vido.muted = true;
      videoText.style.display = 'block';
    }
  }


  //cursor pointer follower
  var box = document.querySelectorAll('#page2 .box, button, a');
  var cursor = document.querySelector('.cursor');

  box.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
      cursor.style.width = '30px';
      cursor.style.height = '30px';
      cursor.style.left = '-10px';
      cursor.style.top = '-15px';

    });

    elem.addEventListener("mouseleave", function () {
      cursor.style.width = "";
      cursor.style.height = "";
      cursor.style.left = '';
      cursor.style.top = '';
    });
  });


  //page3 video and img
  //video
  var videoes = document.querySelectorAll('#page3 video, #page3 img');
  var cursor = document.querySelector('.cursor');

  videoes.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
      var vid = elem.getAttribute('data-text');
      cursor.innerHTML = vid;
      cursor.style.width = '40px';
      cursor.style.left = '-30px';
      cursor.style.top = '-15px'
      cursor.style.padding = "5px 15px";
      cursor.style.borderRadius = "50px";
      cursor.style.mixBlendMode = "difference";
      cursor.style.backgroundColor = "#edbfff";
      cursor.style.textTransform = "capitalize";
    });

    elem.addEventListener("mouseleave", function () {
      cursor.innerHTML = "";
      cursor.style.width = "";
      cursor.style.left = "";
      cursor.style.top = ''
      cursor.style.padding = "";
      cursor.style.borderRadius = "";
      cursor.style.mixBlendMode = "";
      cursor.style.backgroundColor = "";
      cursor.style.textTransform = "";
    });
  });

  //cursor pointer follower
  var magneticBtn = document.querySelectorAll('#page4>.top>.magnetic-btn, #page5 .bottom1 button, nav .circle');
  var cursor = document.querySelector('.cursor');

  magneticBtn.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
      cursor.style.width = '0px';
      cursor.style.height = '0px';

    });

    elem.addEventListener("mouseleave", function () {
      cursor.style.width = "";
      cursor.style.height = "";
    });
  });

  //image cursor
  var img = document.querySelectorAll('#page5>.bottom li, #page5>.bottom1 li');
  var cursor = document.querySelector('.cursor');
  var nav = document.querySelector('nav')
  img.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
      var attr = elem.getAttribute('data-image');
      cursor.style.backgroundImage = `url(${attr})`
      cursor.style.width = '350px';
      cursor.style.height = '300px';
      cursor.style.borderRadius = '0';
      cursor.style.backgroundSize = '100% 100%';
      cursor.style.zIndex = '100';
      nav.style.mixBlendMode = 'normal';
      cursor.style.left = '-175px';
      cursor.style.top = '-150px';
    });

    elem.addEventListener("mouseleave", function () {
      cursor.style.width = "";
      cursor.style.height = "";
      cursor.style.backgroundImage = `url()`
      cursor.style.borderRadius = '';
      cursor.style.backgroundSize = '';
      cursor.style.zIndex = '';
      nav.style.mixBlendMode = '';
      cursor.style.left = '';
      cursor.style.top = '';
    });
  });
}
cursor();

function page1() {
  //timeline
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#page1>.text",
      scroller: "#main",
      // markers:true,
      start: "top 0%",
      end: "top -50%",
      scrub: 3,
    }
  });

  tl.to("#page1>.text>.h1:nth-child(1)>h1", {
    x: -150,
    filter: "blur(10px)",
    opacity: 0,
  }, "page1");

  tl.to("#page1>.text>.h1:nth-child(2)>h1", {
    x: 150,
    filter: "blur(10px)",
    opacity: 0,
  }, "page1");

  tl.to("#page1>.text>p", {
    filter: "blur(10px)",
    opacity: 0
  }, "page1");


  gsap.to("#page1>.video", {
    width: "90%",
    scrollTrigger: {
      trigger: "#page1>.video",
      scroller: "#main",
      // markers:true,
      start: "top 60%",
      end: "top 15%",
      scrub: 3,
    }
  }, "page1");


  gsap.to("#page1>.text>.h1", {
    overflow: 'hidden',
    height: 'auto',
    zIndex: 9,
  })
  gsap.to("#page1>.text>.h1>h1", {
    position: "relative",
    textAlign: "center",
    fontSize: "7vw",
    fontWeight: 400,
    duration: .1
  });

  gsap.to("#page1>.text>p", {
    position: 'relative',
    textAlign: 'center',
    width: '35%',
    top: '2vh',
    left: '30%',
    fontWeight: 400,
    lineHeight: 1.5,
    opacity: 0,
    duration: 0.1
  });
  gsap.to("#page1>.text>p", {
    opacity: 1,
    duration: 1,
    delay: 2
  });

  gsap.from("#page1>.text>.h1>h1", {
    rotate: 45,
    transformOrigin: "top left",
    y: 20,
    duration: 1.5,
    stagger: .1
  });

  gsap.from("#page1>.text>p", {
    opacity: 1,
    duration: 1,
    delay: 1.5
  })

  gsap.to('#page1>.text', {
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      start: 'top top',
      pin: "#page1>.text",
      pinSpacing: false
    }
  });
}
page1();

function page2() {
  gsap.to("#main", {
    backgroundColor: '#fefcff',
    scrollTrigger: {
      trigger: "#page2",
      scroller: "#main",
      // markers:true,
      start: "top 50%",
      end: "top 100%",
      scrub: 3,
    }
  });


  gsap.to("#page2 #center-hr",
    {
      scaleX: 1,
      scrollTrigger: {
        trigger: "#page2 .wrapper>button",
        scroller: '#main',
        start: "top 80%",
        end: "top 50%",
        // markers: true,
      }
    });


  gsap.from('#page2>h1', {
    y: 100,
    opacity: 0,
    stagger: 0.5,
    scrollTrigger: {
      trigger: "#page2>h1",
      scroller: '#main',
      start: "top 90%",
      end: "top 60%",
      // markers: true,
    }
  })

  gsap.from("#page2 .wrapper>.box", {
    y: 100,
    opacity: 0,
    stagger: 0.5,
    scrollTrigger: {
      trigger: "#page2 .wrapper>.box",
      scroller: '#main',
      start: "top 90%",
      end: "top 60%",
      // markers: true,
    }
  })
  gsap.from("#page2 .wrapper>button", {
    y: 100,
    opacity: 0,
    scrollTrigger: {
      trigger: "#page2 .wrapper>button",
      scroller: '#main',
      start: "top 90%",
      end: "top 80%",
      // markers: true,
    }
  })
}
page2();

function page3() {

  gsap.from("#page3>.left>h1", {
    rotate: 45,
    transformOrigin: "top left",
    y: 20,
    opacity: 0,
    scrollTrigger: {
      trigger: "#page3",
      scroller: "#main",
      // markers:true,     
      start: "top 90%",
      end: "top 70%",
      // scrub:true
    }
  });


  gsap.to("#page3 .left .img>.image>img", {
    y: '5vh',
    transformOrigin: 'center center',
    scrollTrigger: {
      trigger: "#page3 .left .img>.image",
      scroller: "#main",
      // markers: true,     
      start: 'top 100%',
      end: 'top 40%',
      scrub: true
    }
  });

  var page3 = document.querySelector('#page3 .left .img>.image>img');
  page3.onmouseenter = function () {
    page3.style.scale = '1.1'
  }
  page3.onmouseleave = function () {
    page3.style.scale = ''
  }

  gsap.from("#page3 .left .img>.image, #page3 .img>h2, #page3 .img p", {
    y: 200,
    opacity: 0,
    stagger: .2,
    duration: 1,
    scrollTrigger: {
      trigger: "#page3>.left .img",
      scroller: "#main",
      // markers:true,     
      start: 'top 100%',
      end: 'top 60%',
      // scrub:true
    }
  });

  gsap.from("#page3 .left .img-wrapper, #page3 .img-wrapper h2, #page3 .img-wrapper p", {
    y: 200,
    opacity: 0,
    stagger: .2,
    duration: 1,
    scrollTrigger: {
      trigger: "#page3>.left video",
      scroller: "#main",
      // markers:true,     
      start: 'top 100%',
      end: 'top 60%',
      // scrub:true
    }
  });

  gsap.from("#page3 .right .imag", {
    y: 200,
    opacity: 0,
    stagger: .2,
    duration: 1,
    scrollTrigger: {
      trigger: "#page3>.right .imag",
      scroller: "#main",
      // markers:true,     
      start: 'top 100%',
      end: 'top 60%',
      // scrub:true
    }
  });

  gsap.to("#page3 .right>.imag1>img", {
    y: '5vh',
    transformOrigin: 'center center',
    scrollTrigger: {
      trigger: "#page3 .right>.imag1>img",
      scroller: "#main",
      // markers: true,     
      start: 'top 100%',
      end: 'top 0%',
      scrub: true
    }
  });

  var page3img = document.querySelector('#page3 .right>.imag1>img');
  page3img.onmouseenter = function () {
    page3img.style.scale = '1.1'
  }
  page3img.onmouseleave = function () {
    page3img.style.scale = ''
  }

  gsap.from("#page3 .right>.imag1", {
    y: 200,
    opacity: 0,
    stagger: .2,
    duration: 1,
    scrollTrigger: {
      trigger: "#page3>.right>.imag1",
      scroller: "#main",
      // markers:true,     
      start: 'top 100%',
      end: 'top 80%',
      // scrub:true
    }
  });

  gsap.from("#page3 .right>.bottom>p, #page3 .right>.bottom>button ", {
    y: 200,
    opacity: 0,
    stagger: .1,
    duration: 1,
    scrollTrigger: {
      trigger: "#page3 .right>.bottom",
      scroller: "#main",
      // markers:true,     
      start: 'top 100%',
      end: 'top 80%',
      // scrub:true
    }
  });

  gsap.to("#page3 #center-hr",
    {
      scaleX: 1,
      scrollTrigger: {
        trigger: "#page3 .right>.bottom",
        scroller: '#main',
        start: "top 80%",
        end: "top 50%",
        // markers: true,
      }
    });
}
page3();

function page4() {
  var tl4 = gsap.timeline({
    scrollTrigger: {
      trigger: "#page4",
      scroller: "#main",
      // markers:true,
      start: "top 80%",
      end: "top 70%",
      scrub: 3
    }
  });

  tl4.to("#main", {
    backgroundColor: "#0F0D0D",
    color: '#fefcff',
  })
    .to("#center-hr", {
      backgroundColor: "#fefcff"
    }, "-=3");


  const btns = document.querySelectorAll(".magnetic-btn");

  btns.forEach((btn) => {
    let timeoutId;
  
    btn.addEventListener("mousemove", function (e) {
      const position = btn.getBoundingClientRect();
      const x = e.pageX - position.left - position.width / 2;
      const y = e.pageY - position.top - position.height / 2;
  
      btn.style.transform = "translate(" + x * 1 + "px, " + y * 1 + "px)";
      btn.querySelector("span").style.transform = "translate(" + x * 0.2 + "px, " + y * 0.2 + "px)";
    });
  
    btn.addEventListener("mouseleave", function (e) {
      const position = btn.getBoundingClientRect();
      const x = e.pageX - position.left - position.width / 2;
      const y = e.pageY - position.top - position.height / 2;
  
      btn.style.transform = "translate(" + (-x * .5) + "px, " + (-y * .5) + "px)";
      btn.querySelector("span").style.transform = "translate(" + (-x * 0.1) + "px, " + (-y * 0.1) + "px)";
  
      // Set a timeout of 500ms before resetting the transform properties
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        btn.style.transform = "translate(0,0)";
        btn.querySelector("span").style.transform = "translate(0,0)";
      }, 150);
    });
  });


  gsap.registerPlugin(ScrollTrigger);

  let sections = gsap.utils.toArray(".panel");

  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: "#page4",
      scroller: '#main',
      pin: true,
      scrub: true,
      snap: 1 / (sections.length - 1),
      // base vertical scrolling on how wide the container is so it feels more natural.
      end: () => "+=" + document.querySelector("#page4 .bottom").offsetWidth
    }
  });


  gsap.to(".pn2", {
    opacity: 1,
    scrollTrigger: {
      trigger: ".pn2",
      scroller: '#main',
      start: 'top top',
      end: 'top -200%',
      // markers:true,
      scrub: true,
    }
  });
  gsap.to(".pn3", {
    opacity: 1,
    scrollTrigger: {
      trigger: ".pn3",
      scroller: '#main',
      start: 'top -200%',
      end: 'top -600%',
      // markers:true,
      scrub: true,
    }
  });

  gsap.to(".pn4", {
    opacity: 1,
    scrollTrigger: {
      trigger: ".pn4",
      scroller: '#main',
      start: 'top -350%',
      end: 'top -800%',
      // markers:true,
      scrub: true,
    }
  });

  gsap.registerPlugin(ScrollTrigger);
  gsap.to('#page4 progress', {
    value: 100,
    ease: 'none',
    overflow: 'hidden',
    scrollTrigger: {
      trigger: "#page4",
      scroller: '#main',
      scrub: true,
      start: 'top top',
      // base vertical scrolling on how wide the container is so it feels more natural.
      end: '35000vh bottom',
      markers: true
    }
  });


  gsap.to("#page4 progress", {
    x: 0,
    scrollTrigger: {
      trigger: "#page4",
      scroller: '#main',
      scrub: true,
      start: 'top top',
      // base vertical scrolling on how wide the container is so it feels more natural.
      end: '250px'
    }


  })







}
page4();

function page5() {
  gsap.from('#page5>.bottom ul', {
    y: 100,
    ease: 'power4.out',
    duration: .5,
    opacity: 0,
    scrollTrigger: {
      trigger: "#page5",
      scroller: "#main",
      scrub: true,
      marker: true
    }
  })


  function toggleAnimation(clientId, mentionId) {
    const timeline = gsap.timeline();
  
    if (!isOpen) {
      timeline.to(mentionId, {
        y: '0px',
        duration: .5,
        ease: "elastic.out(1, 0.3)"
      })
      .to(clientId, {
        y: '-40px',
        duration: .5,
        ease: "elastic.out(1, 0.3)"
      }, "-=.5")
      .to('.mentionClient b', {
        y: -30,
        duration: .5,
        ease: "elastic.out(1, 0.3)"
      }, "-=.5")
      .to('.mentionClient', {
        y: 0,
        duration: .5,
        ease: "elastic.out(1, 0.3)"
      }, "-=.5")
      .to('.mentionClient span', {
        y: -13,
        duration: .5,
        ease: "elastic.out(1, 0.3)"
      }, "-=.5")
      .to('#page5 .bottom', {
        duration: .5,
        opacity: 0,
        autoAlpha: 0,
      }, "bottom")
      .set('#page5 .bottom', {
        display: 'none'
      })
      .fromTo('#page5 .bottom1', {
        display: 'none',
        autoAlpha: 0,
        opacity: 0,
        y:100
      }, {
        display: 'flex',
        autoAlpha: 1,
        opacity: 1,
        duration: 1,
        y:0
      }, "bottom+=.5");
  
      isOpen = true;
    } else {
      timeline.to('#page5 .bottom1', {
        duration: .5,
        opacity: 0,
        autoAlpha: 0,
        ease: "elastic.out(1, 0.3)"

      }, "bottom")
      .set('#page5 .bottom1', {
        display: 'none'
      })
      .fromTo('#page5 .bottom', {
        display: 'none',
        autoAlpha: 0,
        opacity: 0,
        y:100
      }, {
        display: 'flex',
        autoAlpha: 1,
        opacity: 1,
        duration: 1,
        y:0
      }, "bottom+=.5")
      .to(mentionId, {
        y: '-40px',
        duration: .5,
        ease: "elastic.out(1, 0.3)"
      }, "-=.5")
      .to(clientId, {
        y: '0px',
        duration: .5,
        ease: "elastic.out(1, 0.3)"
      }, "-=.5")
      .to('.mentionClient b', {
        y: 0,
        duration: .5,
        ease: "elastic.out(1, 0.3)"
      }, "-=.5")
      .to('.mentionClient', {
        y: 0,
        duration: .5,
        ease: "elastic.out(1, 0.3)"
      }, "-=.5")
      .to('.mentionClient span', {
        y: 10,
        duration: .5,
        ease: "elastic.out(1, 0.3)"
      }, "-=.5");
  
      isOpen = false;
    }
  }


  var mcB = document.querySelector('#page5 .mentionClient');
  var client = document.querySelector('#page5 .client');
  var mention = document.querySelector('#page5 .mention');
  var isOpen = false;

  mention.addEventListener("click", function () {
    toggleAnimation('#page5 .client', '#page5 .mention,#page5 .mentionClient');
  });

  client.addEventListener("click", function () {
    toggleAnimation('#page5 .client', '#page5 .mention, #page5 .mentionClient');
  });
  mcB.addEventListener("click", function () {
    toggleAnimation('#page5 .client', '#page5 .mention, #page5 .mentionClient');
  });





}
page5();

function footer(){
gsap.set('.footer-container', { yPercent: -50,
zIndex:-1,
opacity:0 })

const uncover = gsap.timeline({ paused:true })

uncover
.to('.footer-container', { yPercent: 0, ease: 'none',opacity:1 })
;

ScrollTrigger.create({  
  trigger: '#page5 .bottom',
  scroller:'#main',
  start: 'bottom bottom',
  end: '+=75%',
  animation: uncover,
  scrub: true,  
  // markers: true,
});
}
footer();

function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({repeat: config.repeat, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth, curX, distanceToStart, distanceToLoop, item, i;
  gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
      let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
      xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
      return xPercents[i];
    }
  });
  gsap.set(items, {x: 0});
  totalWidth = items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = xPercents[i] / 100 * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
      .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(index, vars) {
    vars = vars || {};
    (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
      vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }
  tl.next = vars => toIndex(curIndex+1, vars);
  tl.previous = vars => toIndex(curIndex-1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}

const boxes = gsap.utils.toArray("section .box"),
loop = horizontalLoop(boxes, {paused: false, repeat:-1});



function nav(){

  const home = document.querySelector('#home');
  const work = document.querySelector('#work');
  const services = document.querySelector('#services');
  const studio = document.querySelector('#studio');
  const journal = document.querySelector('#journal');
  const contact = document.querySelector('#contact');
  const circle = document.querySelector('.circle');
  const circle1 = document.querySelector('.circle1')

  const homeSection = document.querySelector('.home');
  const workSection = document.querySelector('.work');
  const servicessection = document.querySelector('.services');
  const studiosection = document.querySelector('.studio');
  const journalsection = document.querySelector('.journal');
  const contactsection = document.querySelector('.contact');
  const circlesection = document.querySelector('#circle');
  
  home.addEventListener('mouseover', () => {
    homeSection.style.opacity = 1;
    homeSection.style.zIndex = 9;
  });
  
  work.addEventListener('mouseover', () => {
    workSection.style.opacity = 1;
    workSection.style.zIndex = 9;
  });

  services.addEventListener('mouseover', () => {
    servicessection.style.opacity = 1;
    servicessection.style.zIndex = 9;
  });

  studio.addEventListener('mouseover', () => {
    studiosection.style.opacity = 1;
    studiosection.style.zIndex = 9;
  });

  journal.addEventListener('mouseover', () => {
    journalsection.style.opacity = 1;
    journalsection.style.zIndex = 9;
  });
  

  contact.addEventListener('mouseover', () => {
    contactsection.style.opacity = 1;
    contactsection.style.zIndex = 9;
  });
  
  circle.addEventListener('mouseover', () => {
    circlesection.style.opacity = 1;
    circlesection.style.zIndex = 9;
    circle1.style.opacity = 1;
  });
  



  home.addEventListener('mouseleave', () => {
    homeSection.style.opacity = '0';
    homeSection.style.zIndex = -1;
  });
  
  work.addEventListener('mouseleave', () => {
    workSection.style.opacity = 0;
    workSection.style.zIndex = -1;
  });

  services.addEventListener('mouseleave', () => {
    servicessection.style.opacity = 0;
    servicessection.style.zIndex = -1;
  });

  studio.addEventListener('mouseleave', () => {
    studiosection.style.opacity = 0;
    studiosection.style.zIndex = -1;
  });

  journal.addEventListener('mouseleave', () => {
    journalsection.style.opacity = 0;
    journalsection.style.zIndex = -1;
  });

 contact.addEventListener('mouseleave', () => {
   contactsection.style.opacity = 0;
   contactsection.style.zIndex = -1;
  });

 circle.addEventListener('mouseleave', () => {
   circlesection.style.opacity = 0;
   circlesection.style.zIndex = -1;
   circle1.style.opacity = 0;
  });



}

nav();