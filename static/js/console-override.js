Object.defineProperty(window, "console", {
  value: console,
  writable: false,
  configurable: false
});

var i = 0;
function showWarningAndThrow() {
  if (!i) {
    setTimeout(function () {
      console.log("%cWe are getting married :)", "font: 3em sans-serif; color: white; background-color: #f3b5a6;");
    }, 1);
    i = 1;
  }
}

var l, n = {
  set: function (o) {
    l = o;
  },
  get: function () {
    showWarningAndThrow();
    return l;
  }
};

Object.defineProperty(console, "_commandLineAPI", n);
Object.defineProperty(console, "__commandLineAPI", n);
showWarningAndThrow();
