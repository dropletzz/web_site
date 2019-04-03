const $ = require('jquery');
const skrollr = require('skrollr');

function Desktop () {

	this.container = $(".normal-container");

}

Desktop.prototype.start = function () {

	var $this = this;
	this.skrollr = skrollr.init();

	$(window)
		.resize(function() {
			$this.container.each(function(index, item) {

				var $item = $(item);
				var top = $item.offset().top;
        var height = $item.height();

				$.each($item[0].attributes, function() {
					if (this.name.indexOf("data-") >= 0) {
						$item.removeAttr(this.name);
					}
				});

				$item
					.attr("data-" + (top - parseInt($(window).height() / 2)), "height:100%;")
					.attr("data-" + (top), "height:0px;");

			});
			if ($this.skrollr) {
				$this.skrollr.refresh();
			}
		})
		.resize();

};

Desktop.prototype.stop = function() {

	if (this.skrollr) {
		this.skrollr.destroy();
		delete this.skrollr;
	}

};

export const desktop = Desktop;
