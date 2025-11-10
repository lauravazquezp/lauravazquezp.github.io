const about = document.querySelector('#about')
const contact = document.querySelector('#contact')
const aboutContent = document.querySelector('#about-content')
const contactContent = document.querySelector('#contact-content')

// Function to simulate typing a command in the h1
function typeCommand(command, callback) {
  const h1 = document.querySelector('h1')
  
  // Clear any previous command and reset to base prompt
  h1.innerHTML = 'lauravazquezp:$<span class="cursor">|</span>'
  
  const cursor = h1.querySelector('.cursor')
  
  // Add a space before typing
  cursor.insertAdjacentText('beforebegin', ' ')
  
  let index = 0
  
  const typeInterval = setInterval(() => {
    if (index < command.length) {
      // Insert character before the cursor
      cursor.insertAdjacentText('beforebegin', command[index])
      index++
    } else {
      clearInterval(typeInterval)
      // Wait a moment, then execute callback (keep the command text)
      setTimeout(() => {
        callback()
      }, 200)
    }
  }, 30) // typing speed
}

about.addEventListener('click', (e) => {
  e.preventDefault()
  e.stopImmediatePropagation()
  
  typeCommand('about', () => {
    const terminal = document.querySelector('.terminal')
    if (terminal && aboutContent) {
      $(".terminal").stopTypewriter()
      terminal.innerHTML = aboutContent.innerHTML
      $(".terminal").typewriter()
    }
  })
}, true)

contact.addEventListener('click', (e) => {
  e.preventDefault()
  e.stopImmediatePropagation()
  
  typeCommand('contact', () => {
    const terminal = document.querySelector('.terminal')
    if (terminal && contactContent) {
      $(".terminal").stopTypewriter()
      terminal.innerHTML = contactContent.innerHTML
      $(".terminal").typewriter()
    }
  })
}, true)


// Typewriter.js
// https://github.com/ronv/Typewriter.js

$.fn.typewriter = function() {
  this.each(function() {
    var c = $(this),
      b = c.html(),
      a = 0,
      d = 0,
      blinkCounter = 0;
    
    var prev = c.data('typewriterTimeout')
    if (prev) {
      clearTimeout(prev)
      c.removeData('typewriterTimeout')
    }
    c.html("");
    var e = function() {
      if ("<" == b.substring(a, a + 1)) {
        var f = new RegExp(/<span class="instant"/),
          g = new RegExp(/<span class="clear"/);
        if (b.substring(a, b.length).match(f)) a += b.substring(a, b.length).indexOf("</span>") + 7;
        else if (b.substring(a, b.length).match(g)) d = a, a += b.substring(a, b.length).indexOf("</span>") + 7;
        else
          for (;
            ">" != b.substring(a, a + 1);) a++
      }
      c.html(b.substring(d, a++) + (Math.floor(blinkCounter / 10) & 1 ? "|" : ""));
      blinkCounter++;
      
      if (a < b.length) {
        var timeoutId = setTimeout(e, 20)
        c.data('typewriterTimeout', timeoutId)
      }
    };
    e()
  });
  return this
};

$.fn.stopTypewriter = function() {
  this.each(function() {
    var c = $(this)
    var id = c.data('typewriterTimeout')
    if (id) {
      clearTimeout(id)
      c.removeData('typewriterTimeout')
    }
  })
  return this
}
$(".terminal").typewriter();


