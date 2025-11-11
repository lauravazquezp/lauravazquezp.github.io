const home = document.querySelector('#home')
const about = document.querySelector('#about')
const contact = document.querySelector('#contact')
const homeContent = document.querySelector('#home-content')
const aboutContent = document.querySelector('#about-content')
const contactContent = document.querySelector('#contact-content')

const h1Element = document.querySelector('h1');
const PROMPT = h1Element.innerHTML; // Gets 'lauravazquezp:$<span class="cursor">|</span>'

let skipAnimation = false;
let currentCommand = ''; // Track the current command

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    skipAnimation = true;
  }
});

// Function to delete the current command with backspace effect
function deleteCommand(callback) {
  const h1 = document.querySelector('h1')
  
  if (!currentCommand) {
    callback();
    return;
  }
  
  // If skip is enabled, delete immediately
  if (skipAnimation) {
    h1.innerHTML = PROMPT;
    currentCommand = '';
    skipAnimation = false;
    callback();
    return;
  }
  
  let commandLength = currentCommand.length;
  
  const deleteInterval = setInterval(() => {
    // Check if Enter was pressed during deleting
    if (skipAnimation) {
      clearInterval(deleteInterval);
      h1.innerHTML = PROMPT;
      currentCommand = '';
      skipAnimation = false;
      callback();
      return;
    }
    
    if (commandLength > 0) {
      commandLength--;
      const remainingCommand = currentCommand.substring(0, commandLength);
      h1.innerHTML = 'lauravazquezp:$ ' + remainingCommand + '<span class="cursor">|</span>';
    } else {
      clearInterval(deleteInterval);
      // Remove the extra space too
      h1.innerHTML = PROMPT;
      currentCommand = '';
      callback();
    }
  }, 30); // Same speed as typing
}

function typeCommand(command, callback) {
  const h1 = document.querySelector('h1')
  
  // Clear any previous command and reset to base prompt
  h1.innerHTML = PROMPT
  
  const cursor = h1.querySelector('.cursor')
  
  if (skipAnimation) {
    cursor.insertAdjacentText('beforebegin', ' ' + command)
    currentCommand = command;
    skipAnimation = false;
    callback()
    return;
  }
  
  cursor.insertAdjacentText('beforebegin', ' ')
  
  let index = 0
  
  const typeInterval = setInterval(() => {
    if (skipAnimation) {
      clearInterval(typeInterval)
      cursor.insertAdjacentText('beforebegin', command.substring(index))
      currentCommand = command;
      skipAnimation = false;
      callback()
      return;
    }
    
    if (index < command.length) {
      cursor.insertAdjacentText('beforebegin', command[index])
      index++
    } else {
      clearInterval(typeInterval)
      currentCommand = command;
      setTimeout(() => {
        callback()
      }, 200)
    }
  }, 30) // typing speed
}

about.addEventListener('click', (e) => {
  e.preventDefault()
  e.stopImmediatePropagation()
  
  // First delete any existing command, then type new one
  deleteCommand(() => {
    typeCommand('about', () => {
      const terminal = document.querySelector('.terminal')
      if (terminal && aboutContent) {
        $(".terminal").stopTypewriter()
        terminal.innerHTML = aboutContent.innerHTML
        
        if (skipAnimation) {
          // Show content immediately without typewriter
          terminal.innerHTML += '<span class="dollar"></span><span class="cursor">|</span>';
          skipAnimation = false;
        } else {
          $(".terminal").typewriter()
        }
      }
    })
  })
}, true)

contact.addEventListener('click', (e) => {
  e.preventDefault()
  e.stopImmediatePropagation()
  
  deleteCommand(() => {
    typeCommand('contact', () => {
      const terminal = document.querySelector('.terminal')
      if (terminal && contactContent) {
        $(".terminal").stopTypewriter()
        terminal.innerHTML = contactContent.innerHTML
        
        if (skipAnimation) {
          // Show content immediately without typewriter
          terminal.innerHTML += '<span class="dollar"></span><span class="cursor">|</span>';
          skipAnimation = false;
        } else {
          $(".terminal").typewriter()
        }
      }
    })
  })
}, true)

home.addEventListener('click', (e) => {
  e.preventDefault()
  e.stopImmediatePropagation()
  
  deleteCommand(() => {
    const terminal = document.querySelector('.terminal')
    if (terminal && homeContent) {
      $(".terminal").stopTypewriter()
      terminal.innerHTML = homeContent.innerHTML
      
      if (skipAnimation) {
        // Show content immediately without typewriter
        terminal.innerHTML += '<span class="dollar"></span><span class="cursor">|</span>';
        skipAnimation = false;
      } else {
        $(".terminal").typewriter()
      }
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
      if (skipAnimation) {
        c.html(b + '<span class="dollar"></span><span class="cursor">|</span>');
        skipAnimation = false;
        return;
      }
      
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
      } else {
        c.html(b.substring(d, a) + '<span class="dollar"></span><span class="cursor">|</span>');
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

// Initialize terminal with home content on page load
$(".terminal").html(homeContent.innerHTML);
$(".terminal").typewriter();
