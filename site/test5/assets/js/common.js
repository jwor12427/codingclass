/** @format */

$(function () {
	//header menu--------------------------------------------------------
	$("nav > ul").mouseenter(function () {
		$(".nav__sub").slideDown(800);
	});

	$("nav >ul").mouseleave(function () {
		$(".nav__sub").stop().slideUp(500);
	});

	//slide---------------------------------------------------------------
	setInterval(function () {
		$(".slider__wrap").animate({ "margin-top": "-300" }, function () {
			$(".slider:first").appendTo(".slider__wrap");
			$(".slider__wrap").css({ "margin-top": "0" });
		});
	}, 3000);

	//tab-----------------------------------------------------------------
	$(".tab_ul li").click(function () {
		var idx = $(this).index();

		$(".tab__item >*").removeClass("on");
		$(".tab__item >*").eq(idx).addClass("on");

		$(".tab_ul li").removeClass("on");
		$(this).addClass("on");
	});

	//popUpBox---------------------------------------------------------
	$(".notice li:nth-child(1)").click(function () {
		$(".popUpBox").show();
	});

	$(".popUpBox button").click(function () {
		$(".popUpBox").hide();
	});
});
