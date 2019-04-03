require('./vendor/waypoints');

const duration = 200;
const $ = require('jquery');

function Mobile () {

	this.container = $(".normal-container");

}

Mobile.prototype.start = function () {

		this.container
			.click(function() {

				var $this = $(this);

				if ($this.css("opacity") === "1") {
					$this.fadeTo(duration, 0);
				} else {
					$this.fadeTo(duration, 1);
				}

			})
			.waypoint(function(direction) {

				var $this = $(this);
				var instructions = $this.prev(".instructions");

				if (instructions.length) {
					instructions.fadeIn();
					$this.click(function() {
						$this.waypoint("disable");
						setTimeout(function() {
							instructions.fadeOut();
						}, duration);
					});
				}

			}, {
				offset: 250
			});

};

Mobile.prototype.stop = function() {

		this.container.fadeTo(0, 1);
		this.container.unbind("click");
		this.container.waypoint("disable");

};

export const mobile = Mobile;
