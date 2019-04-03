
const enquire = require('enquire.js');
const Desktop = require('./desktop');
const Mobile = require('./mobile');

const desktop = new Desktop.desktop();
const mobile = new Mobile.mobile();

document.addEventListener("DOMContentLoaded", function() {
  enquire
    .register("(max-width: 991px)", {
      match: function() {
        mobile.start();
        desktop.stop();
      }
    })
    .register("(min-width: 992px)", {
      match: function() {
        if (navigator.userAgent.match(/iPad/i)) {
        	mobile.start();
        	desktop.stop();
        } else {
        	mobile.stop();
        	desktop.start();
        }
      }
    });
});
