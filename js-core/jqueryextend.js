jQuery.fn.extend({
	disableSel : function () {
		return this.each(function () {
			this.onselectstart = function () { return false; };
			this.unselectable = 'on';
			jQuery(this).css({
				'-o-user-select': 'none', 
                '-moz-user-select': 'none', 
                '-khtml-user-select': 'none',
                '-webkit-user-select': 'none',
				'user-select' : 'none'
			});
		});
	}
});