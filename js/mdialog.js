/*
Modal Dialog
v0.1.5


*/

var Dialog = function (id,title,width,height) {
	var RESIZE_NONE=0x00;
	var RESIZE_TOP=0x01;
	var RESIZE_TOPRIGHT=0x02;
	var RESIZE_RIGHT=0x03;
	var RESIZE_BOTTOMRIGHT=0x04;
	var RESIZE_BOTTOM=0x05;
	var RESIZE_BOTTOMLEFT=0x06;
	var RESIZE_LEFT=0x07;
	var RESIZE_TOPLEFT=0x08;

	var REQUIRED_WIDTH=50;
	var REQUIRED_HEIGHT=18;

	var dlgDivId=id;
	var dlgMovable=false;
	var dlgResizable=false;
	var dlgTitle=title;
	var dlgWidth=REQUIRED_WIDTH;
	var dlgHeight=REQUIRED_HEIGHT;
	var dlgjQueryObj;
	var isMoving=false;
	var isResizing=false;
	var isClosable=true;
	var resizePosX=0;
	var resizePosY=0;
	var resizePosOffsetX;
	var resizePosOffsetY;
	var movePosX=0;
	var movePosY=0;
	var resizeType=RESIZE_NONE;
	var minSizeX=REQUIRED_WIDTH;
	var minSizeY=REQUIRED_HEIGHT;
	var dlgBg=true;
	var closeEsc=true;
	var originalWidth=dlgWidth;
	var originalHeight=dlgHeight;

	var that=this;

	var closeImg=new Image();
	closeImg.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAhFBMVEUuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4lgK8dAAAAK3RSTlMAQEFDREVRVFdeX2FiY2d8fX5/gIGCg4SFhofIycrMzdfY2dre9vf5+vv8xzbwVgAAAMFJREFUeAGF0ts2w0AYR/HtEEUpbaizIMUk3/u/H7mZ9cleVv93M/t3NwM0XemXaKvd2DUAp2P8rp337XQ7LKCZusXUJ3FMF1GFesQrJSRSj0IfdTfu8c4yJFKPc2jT8Xber0BC/a/YulehXYOF+79inbuEusQGJPZ0HjNo93QJdYmH3CTUJe4Vq1DftBZ3uYNE7muQWM36TFyy8/tm0TO6Z/FNl/+XxTPNoJ5EOYTFULtEOQE4evl6O0O7+Ph8OoAfSSRjUNq/CtgAAAAASUVORK5CYII=';

	if (!$('.dialogTitleBar')[0]) {
		$('<style>.dialogTitleBar {background-color:#979AC6;}</style>').appendTo('head');
	}

	if (!$('.dialogModalBottom')[0]) {
		$('<style>.dialogModalBottom {background-color:#D7D9F2;}</style>').appendTo('head');
	}

	if (width >= REQUIRED_WIDTH)
	{
		dlgWidth=width;
		originalWidth=dlgWidth;
	}

	if (height >= REQUIRED_HEIGHT)
	{
		dlgHeight=height;
		originalHeight=dlgHeight;
	}
	
	dlgjQueryObj=$("#" + dlgDivId);

	dlgjQueryObj.html("<div class='dialogBg'></div><div class='dialogContainer'><div style='position:absolute; right:7px; top:7px;' class='dialogCloseBtn'><img src='" + closeImg.src + "' alt='X' title='Close' style='cursor:pointer; width:12px; height:12px; display:block;' /></div><div style='height:22px; margin:-3px -3px 3px -3px; padding-left:3px; padding-right:3px; border-radius:3px; line-height:22px; text-overflow:ellipsis; white-space:nowrap; overflow:hidden; padding-right:16px; font-weight:bold; font-family:\"Trebuchet MS\";' class='dialogTitleBar'>" + dlgTitle + "</div><div class='dialogContainerInner'>" + dlgjQueryObj.html() + "</div></div>");
	
	dlgjQueryObj.disableSel();

	$(".dialogContainer", dlgjQueryObj).hide();

	$(".dialogBg",dlgjQueryObj).css({
		"position" : "fixed",
		"top" : 0,
		"left" : 0,
		"bottom" : 0,
		"right" : 0,
		"z-index" : "9998",
		"background-color" : "rgba(0,0,0,0)",
		"transition" : "background-color .2s",
		"visibility" : "hidden",
		"will-change" : "background-color"
	});

	dlgjQueryObj.show();

	$(".dialogContainer",dlgjQueryObj).css({
		"width" : dlgWidth + "px", 
		"height" : dlgHeight + "px",
		"padding" : "5px",
		"position" : "fixed",
		"top" : (($(window).height() / 2) - (dlgHeight / 2)) + "px",
		"left" : (($(window).width() / 2) - (dlgWidth / 2)) + "px",
		"box-shadow" : "2px 2px 10px 2px rgba(0,0,0,.5)",
		"border" : "1px solid black",
		"z-index" : "9999",
		"background-color" : "white",
		"cursor" : "default",
		"overflow" : "hidden",
		"box-sizing" : "border-box"
	});

	$(".modalSBottom",dlgjQueryObj).html("<div class='dialogModalBottom'>" + $(".modalSBottom",dlgjQueryObj).html() + "</div>");

	$(".modalSBottom",dlgjQueryObj).css({
		"position" : "absolute",
		"left" : "0",
		"bottom" : "0",
		"right" : "0"
	});

	$(".modalSBottom > div",dlgjQueryObj).css({
		/*"margin" : "2px",*/
		"border-top" : "1px solid gray",
		"padding" : "4px 5px",
		/*"height" : "30px",*/
		"text-align" : "right"
	});

	$(".modalSBottom > div",dlgjQueryObj).addClass("msgbg");

	$(".modalSBottom > div input",dlgjQueryObj).css({
		"margin-right" : "5px"
	});

	var that = this;

	$(".dialogCloseBtn", dlgjQueryObj).click(function () {
		that.hideDialog();
	});


	/*$(".modalSBottom div",dlgjQueryObj).css({
		"position" : "absolute",
		"left" : "0px",
		"bottom" : "0px",
		"height" : "30px",
		"border-top" : "1px solid black",
		"width" : "100%",
	});*/

	//$(".modalSBottom",dlgjQueryObj).addClass("msgbg");

	$(document).keyup(function (event) {
		if (dlgjQueryObj.is(":visible") && isClosable)
		{
			if(event.which == 27)
			{
				dlgjQueryObj.hide();
			}
		}
	});

	/**********************************
	|		Drag controls			  |
	**********************************/
	$(window).mouseup(function () {
		if (isResizing)
		{
			$("body").css("cursor","default");
			isResizing=false;
		}
		
		if (isMoving)
		{
			/*if (!dlgBg)
			{
				$(".dialogBg",dlgjQueryObj).hide();
				$(".dialogBg",dlgjQueryObj).css("background-color","rgba(0,0,0,.3)");
			}*/
			isMoving=false;
			$(".dialogContainer",dlgjQueryObj).css({
				"opacity": "1",
				"cursor" : "default"
			});
		}
	}).mousemove(function (event) {
		if (isResizing)
		{
			switch (resizeType)
			{
				case RESIZE_RIGHT:
					$("body").css("cursor","e-resize");
					var left=parseInt($(".dialogContainer",dlgjQueryObj).css("left"),10);
					if ((event.pageX - left) > minSizeX)
					{
						dlgWidth=(event.pageX - left) + resizePosOffsetX;
						originalWidth=dlgWidth;

						$(".dialogContainer",dlgjQueryObj).css({
							"width" : dlgWidth + "px"
						});
					}
				break;
				case RESIZE_BOTTOM:
					$("body").css("cursor","s-resize");
					var top=parseInt($(".dialogContainer",dlgjQueryObj).css("top"),10);
					if ((event.pageY - top) > minSizeY)
					{
						dlgHeight=(event.pageY - top) + resizePosOffsetY;
						originalHeight=dlgHeight;

						$(".dialogContainer",dlgjQueryObj).css({
							"height" : dlgHeight + "px"
						});
					}
				break;
				case RESIZE_BOTTOMLEFT:
					alert();
					$("body").css("cursor","se-resize");
					var top=parseInt($(".dialogContainer",dlgjQueryObj).css("top"),10);
					var left=parseInt($(".dialogContainer",dlgjQueryObj).css("left"),10);
					if ((event.pageY - top) > minSizeY)
					{
						dlgHeight=(event.pageY - top) + resizePosOffsetY;
						originalHeight=dlgHeight;

						$(".dialogContainer",dlgjQueryObj).css({
							"height" : dlgHeight + "px"
						});
					}

					if ((event.pageX - left) > minSizeX)
					{
						dlgWidth=(event.pageX - left) + resizePosOffsetX;
						originalWidth=dlgWidth;

						$(".dialogContainer",dlgjQueryObj).css({
							"width" : dlgWidth + "px"
						});
					}
				break;
			}
			
		}
		else if (isMoving)
		{
			$(".dialogContainer",dlgjQueryObj).css({
				"opacity" : ".7",
				"cursor" : "move",
				"top" : event.pageY - movePosY + "px",
				"left" : event.pageX - movePosX + "px"
			});
		}
	});

	$(".dialogContainer .imsgbg",dlgjQueryObj).mousedown(function (event) {
		//drag controls
		if (dlgMovable)
		{
			/*if (!dlgBg)
			{
				$(".dialogBg",dlgjQueryObj).css("background-color","rgba(0,0,0,0)");
				$(".dialogBg",dlgjQueryObj).show();
			}*/
			isMoving=true;
			movePosX=getOffsetX(event);
			movePosY=getOffsetY(event);
		}
	});

	$(window).resize(function () {
		if ($(window).height() < originalHeight || originalHeight > $(window).height())
		{
			$(".dialogContainer",dlgjQueryObj).css({
				"height" : $(window).height() + "px",
			});

			$(".dialogContainer .dialogContainerInner",dlgjQueryObj).css({
				"overflow" : "auto",
				"height" : ($(".dialogContainer",dlgjQueryObj).height() - $(".modalSBottom",dlgjQueryObj).height() - $(".dialogTitleBar",dlgjQueryObj).height()) + "px"
			});

			dlgHeight=$(window).height();
		}
		else
		{
			$(".dialogContainer",dlgjQueryObj).css({
				"height" : originalHeight + "px",
			});

			$(".dialogContainer .dialogContainerInner",dlgjQueryObj).css({
				"overflow" : "hidden",
				"height" : "auto"
			});

			dlgHeight=originalHeight;
		}

		if ($(window).width() < originalWidth || originalWidth > $(window).width())
		{
			$(".dialogContainer",dlgjQueryObj).css({
				"width" : $(window).width()  + "px",
			});

			$(".dialogContainer .dialogContainerInner",dlgjQueryObj).css({
				"overflow" : "auto",
			});

			dlgWidth=$(window).width();
		}
		else
		{
			$(".dialogContainer",dlgjQueryObj).css({
				"width" : originalWidth + "px",
			});

			$(".dialogContainer .dialogContainerInner",dlgjQueryObj).css({
				"overflow" : "hidden"
			});

			dlgWidth=originalWidth;
		}

		$(".dialogContainer",dlgjQueryObj).css({
			"top" : (($(window).height() / 2) - (dlgHeight / 2)) + "px",
			"left" : (($(window).width() / 2) - (dlgWidth / 2)) + "px",
		});
	});

	$(".dialogContainer",dlgjQueryObj).mousemove(function (event) {
		if (!isResizing && dlgResizable)
		{
			if (getOffsetX(event) < 6)
			{
				if (getOffsetY(event) < 6)
				{
					$(".dialogContainer",dlgjQueryObj).css({
						"cursor" : "nw-resize"
					});

					resizeType=RESIZE_TOPLEFT;
				}
				else if (getOffsetY(event) > (dlgHeight - 5))
				{
					$(".dialogContainer",dlgjQueryObj).css({
						"cursor" : "sw-resize"
					});

					resizeType=RESIZE_BOTTOMLEFT;
				}
				else
				{
					$(".dialogContainer",dlgjQueryObj).css({
						"cursor" : "w-resize"
					});

					resizeType=RESIZE_LEFT;
				}
			}
			else if (getOffsetX(event) > (dlgWidth - 5))
			{
				if (getOffsetY(event) < 6)
				{
					$(".dialogContainer",dlgjQueryObj).css({
						"cursor" : "ne-resize"
					});

					resizeType=RESIZE_TOPRIGHT;
				}
				else if (getOffsetY(event) > (dlgHeight - 5))
				{
					$(".dialogContainer",dlgjQueryObj).css({
						"cursor" : "se-resize"
					});

					resizeType=RESIZE_BOTTOMRIGHT;
				}
				else
				{
					$(".dialogContainer",dlgjQueryObj).css({
						"cursor" : "e-resize"
					});

					resizeType=RESIZE_RIGHT;
				}
			}
			else if (getOffsetY(event) < 6)
			{
				$(".dialogContainer",dlgjQueryObj).css({
					"cursor" : "n-resize"
				});

				resizeType=RESIZE_TOP;
			}
			else if (getOffsetY(event) > (dlgHeight - 5))
			{
				$(".dialogContainer",dlgjQueryObj).css({
					"cursor" : "s-resize"
				});

				resizeType=RESIZE_BOTTOM;
			}
			else
			{
				$(".dialogContainer",dlgjQueryObj).css({
					"cursor" : "default"
				});

				resizeType=RESIZE_NONE;
			}
		}
	}).mousedown(function (event) {
		if (resizeType!=RESIZE_NONE)
		{
			resizePosOffsetX=dlgWidth - getOffsetX(event);
			resizePosOffsetY=dlgHeight - getOffsetY(event);
			isResizing=true;
		}
	});

	var escProcess = function (event) {
		event = event || window.event;
		if (event==27)
		{
			this.hideDialog();
		}
	}

	this.showDialog = function () {
		/*if (dlgBg)
		{
			dlgjQueryObj.show();
		}
		else
		{*/
			
			//$(".dialogBg",dlgjQueryObj).hide();
			//$(".dialogBg",dlgjQueryObj).css("background-color", "rgba(0,0,0,.01)");
			
			//$('.dialogBg', dlgjQueryObj).show();
			//dlgjQueryObj.show();
			//$(".dialogBg",dlgjQueryObj).css("background-color", "rgba(0,0,0,0)");

			//$(".dialogBg",dlgjQueryObj).css("background-color", "rgba(0,0,0,.3)");

			$(".dialogContainer",dlgjQueryObj).show();

			$(".dialogBg",dlgjQueryObj).css({
				"background-color" : "rgba(0,0,0,.3)",
				"visibility" : "visible"
			});
			//$('.dialogBg', dlgjQueryObj).fadeIn(200);
			if (closeEsc==true)
			{
				$(document).bind("keyup",escProcess);
			}
		//}
	}

	this.hideDialog = function () {
		$(".dialogBg",dlgjQueryObj).css({
			"visibility" : "hidden",
			"background-color" : "rgba(0,0,0,0)"
		});

		$(".dialogContainer",dlgjQueryObj).hide();

		$(document).unbind("keyup",escProcess);
	}

	this.resize=function (width,height) {
		if (width >= REQUIRED_WIDTH)
		{
			dlgWidth=width;
			originalWidth=dlgWidth;
		}

		if (height >= REQUIRED_HEIGHT)
		{
			dlgHeight=height;
			originalHeight=dlgHeight;
		}

		$(".dialogContainer",dlgjQueryObj).css({
			"width" : dlgWidth + "px",
			"height" : dlgHeight + "px"
		});
	}

	this.isClosable = function (setClose) {
		if (!setClose)
		{
			isClosable=false;
			$(".dialogContainer .dialogCloseBtn",dlgjQueryObj).hide();
		}
		else
		{
			isClosable=true;
			$(".dialogContainer .dialogCloseBtn",dlgjQueryObj).show();
		}
	}

	this.isMovable = function (setMove) {
		if (setMove)
		{
			dlgMovable=true;
		}
		else
		{
			dlgMovable=false;
		}
	}

	this.hasBackground=function (setBg) {
		if (!setBg)
		{
			dlgBg=false;
			$(".dialogBg",dlgjQueryObj).hide();
		}
		else
		{
			dlgBg=true;
			$(".dialogBg",dlgjQueryObj).show();
		}
	}

	this.setSideIcon=function (type) {
		//
	}

	this.getWidth=function () {
		return dlgWidth;
	}

	this.getHeight=function () {
		return dlgHeight;
	}

	this.enableTransitions = function (setTrans) {
		//
	}

	this.destroy=function () {
		$(".dialogBg",dlgjQueryObj).remove();
		$(".dialogContainer .dialogCloseBtn",dlgjQueryObj).remove();
		$(".dialogContainer .dialogTitleBar",dlgjQueryObj).remove();
		$(".modalSBottom",dlgjQueryObj).html($(".modalSBottom > div",dlgjQueryObj).html());
		$(dlgjQueryObj).html($(".dialogContainer",dlgjQueryObj).html());
	}

	this.isResizable = function (setResize) {
		if (setResize)
		{
			dlgResizable=true;
		}
		else
		{
			dlgResizable=false;
		}
	}

	/* callback functions */
	this.onBeforeOpen = function (callbackFunc) {
		//
	}

	this.onOpen = function (callbackFunc) {
		//
	}

	this.onClose = function (callbackFunc) {
		//
	}

	this.onBeforeClose = function (callbackFunc) {
		//
	}

	this.closeWithEsc = function (setting) {
		if (!setting)
		{
			closeEsc=false;
			$(document).unbind("keyup",escProcess);
		}
		else
		{
			closeEsc=true;
		}
	}

	this.setTitle = function (tText) {
		$(".dialogTitleBar",dlgjQueryObj).text(tText);
	}

	var getOffsetX = function (fevent) {
		return (fevent.offsetX || fevent.pageX - $(fevent.target).offset().left);
	}

	var getOffsetY=function (fevent) {
		return (fevent.offsetY || fevent.pageY - $(fevent.target).offset().top);
	}
}
