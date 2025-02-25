  // Function to display the red-screen warning message permanently.
  function showCheatMessage() {
    localStorage.setItem('devCheat', 'true'); // Save a flag in localStorage
    document.body.style.backgroundColor = 'red';
    document.body.innerHTML = '';
    var cheatMsg = document.createElement('div');
    cheatMsg.innerText = "Are you trying to cheat by opening Developer tools? \n don't you dare!!";
    cheatMsg.style.color = 'white';
    cheatMsg.style.fontSize = '4em';
    cheatMsg.style.fontWeight = 'bold';
    cheatMsg.style.textAlign = 'center';
    cheatMsg.style.position = 'fixed';
    cheatMsg.style.top = '50%';
    cheatMsg.style.left = '50%';
    cheatMsg.style.transform = 'translate(-50%, -50%)';
    cheatMsg.style.zIndex = '9999';
    document.body.appendChild(cheatMsg);
  }

  // Immediately show the warning if the flag is set
  if (localStorage.getItem('devCheat') === 'true') {
    showCheatMessage();
  }



  // Disable forbidden key combinations and show warning
  document.onkeydown = function (e) {
    if (
      e.keyCode === 123 ||
      (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
      (e.ctrlKey && e.keyCode === 85)
    ) {
      e.preventDefault();
      showCheatMessage();
      return false;
    }
  };

  // Detect DevTools via a debugger statement heuristic
  (function() {
    function detectDevTool(allow) {
      if (isNaN(+allow)) allow = 100;
      var start = +new Date();
      debugger;
      var end = +new Date();
      if (isNaN(start) || isNaN(end) || end - start > allow) {
        showCheatMessage();
        return false;
      }
    }
    // For older IE browsers
    if (window.attachEvent) {
      if (document.readyState === "complete" || document.readyState === "interactive") {
        detectDevTool();
        window.attachEvent('onresize', detectDevTool);
        window.attachEvent('onmousemove', detectDevTool);
        window.attachEvent('onfocus', detectDevTool);
        window.attachEvent('onblur', detectDevTool);
      } else {
        setTimeout(arguments.callee, 0);
      }
    } else {
      window.addEventListener('load', detectDevTool);
      window.addEventListener('resize', detectDevTool);
      window.addEventListener('mousemove', detectDevTool);
      window.addEventListener('focus', detectDevTool);
      window.addEventListener('blur', detectDevTool);
    }
  })();
(function() {
        // Get user agent and vendor information.
        var ua = navigator.userAgent;
        var vendor = navigator.vendor;

        // Check for Google Chrome:
        // - "Chrome" must be present in the user agent.
        // - The vendor must be "Google Inc".
        // - Must NOT contain "OPR" (Opera) or "Edg" (Edge).
        var isChrome = /Chrome/.test(ua) && /Google Inc/.test(vendor) && !/OPR|Edg/.test(ua);

        if (!isChrome) {
        // If not Chrome, block access by replacing the page content.
        document.body.innerHTML = `
            <div style="text-align: center; margin-top: 20%; font-size: 2em;">
            <h1>Access Denied</h1>
            <p>This website is only accessible via Google Chrome. Please switch browsers to continue.</p>
            </div>
        `;
        throw new Error("Unsupported browser");
        }
    })();
