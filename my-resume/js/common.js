$(function() {
    var off = true;
    $("#fullpage").fullpage({
        navigation: true,
        navigationPosition: "right",
        css3: true,
        menu: true,
        anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6'],
        afterRender: function() {
            animate();
        },
        onLeave: function(index, nextIndex, direction) {
            headerAnim(nextIndex);
        },
        afterLoad: function(anchorLink, index) {
            showHeader(index - 1);
            if (index == 2) {
                mainAnim();
            }
            if (index == 3) {
                $('section[data-anchor="page3"] .title').addClass("animated fadeInUp");
                bannaerAnim();
            }
            if (index == 4) {
                chart();
                $('section[data-anchor="page4"] .title').addClass("animated fadeInUp");

            }
            if (index == 6 && off) {
                contact();
            }
        }
    });

    //banner区文字动画效果
    function bannaerAnim() {
        $(".banner ul li h4").addClass("animated bounceInRight");
        $(".banner ul li p").addClass("animated bounceInRight");
    }
    for (var i = 1; i < 7; i++) {
        $(".banner ul li p").eq(i - 1).css("animation-delay", i * 0.5 + "s");
    }

    //文字标题动画效果
    function animate() {
        $(".index h4").addClass('animated fadeInUp');
        $(".index h4").on("animationend", function() {
            $(".index .line").css({ transform: "scale(1)", opacity: 1 });
        });
        $(".index .item").addClass('animated fadeInUp');
        for (var i = 1; i <= 4; i++) {
            $(".item-" + i).css("animation-delay", i * 0.8 + "s");
        };
        $(".index .mouse-icon").addClass('animated fadeInDown')
    }
    //header区导航效果
    function headerAnim(nextIndex) {
        $(".nav ul li").removeClass("active");
        $(".nav ul li").eq(nextIndex - 1).addClass("active");
        var left = $("nav ul li").eq(nextIndex - 1).position().left;
        var width = $("nav ul li").eq(nextIndex - 1).width();
        $("nav .line").animate({ left: left, width: width });
    }

    //内容动画效果
    function mainAnim() {
        $(".aboutme-content .p-left").addClass("animated rotateIn");
        $(".aboutme-content .p-right").addClass("animated rotateIn");
    }

    //饼图
    function chart() {
        $('.chart').easyPieChart({
            easing: 'easeOut',
            delay: 1000,
            barColor: '#1d9d74',
            trackColor: 'rgba(0,0,0,0.2)',
            scaleColor: false,
            lineWidth: 8,
            size: 140,
            animate: 2000,
            onStep: function(from, to, percent) {
                this.el.children[0].innerHTML = Math.round(percent) + "%";
            }
        });
    }

    function showHeader(index) {
        $(".header h3").attr({ class: "" });
        $(".header p").attr({ class: "" });

        if (index < 5 && index > 0) {
            $('.header-' + index).find("h3").addClass("animated fadeInUp");
            $('.header-' + index).find("p").addClass("animated fadeInUp");
            $(".header + .title").find("p").addClass("animated fadeInUp");
        }
    }
    //banner切换效果
    var $bLi = $(".banner ul li");
    $(".banner ul").css({ width: $bLi.width() * $bLi.length + "px" });
    var num = 0;
    $(".next").click(function() {
        num++;
        banner();
    });
    $(".prev").click(function() {
        num--;
        banner();
    });
    $(".banner nav a").click(function() {
        num = $(this).index();
        banner();
    });


    function banner() {
        var max = $(".banner ul li").length;
        num = num % max;
        if (num < 0) {
            num = max - 1;
        };
        var oLI = $(".banner ul li").width();
        $(".banner ul").css({ marginLeft: -oLI * num + "px" });
        $(".banner nav a").removeClass('active');
        $(".banner nav a").eq(num).addClass("active");
    }



    //联系页面3D效果
    function contact() {
        off = false;
        var oBox = document.getElementById("curriculum");
        var oUl = oBox.getElementsByTagName("ul")[0];
        var oContact = oBox.getElementsByClassName("contact")[0];
        var aLi = oUl.children;
        var oBack = oContact.getElementsByTagName("a")[0];
        oBox.style.opacity = 1;
        oBox.addEventListener("transitionend", end, false);
        oUl.style.transition = ".5s 600ms linear";

        function end() {
            this.removeEventListener("transitionend", end, false);
            oUl.style.top = 0;
            oBox.style.height = "300px";
            for (var i = 0; i < aLi.length; i++) {
                aLi[i].style.transition = "0.5s " + (300 + i * 200) + "ms";
                aLi[i].style.opacity = 1;
                aLi[i].style.transform = "rotateX(0deg)";
                aLi[i].off = true;
                aLi[i].index = i;
                aLi[i].onmouseover = over;
                aLi[i].onmouseout = function() {
                    if (this.off) {
                        this.style.transform = "rotateY(0deg)";
                    }
                };
                aLi[i].onclick = fnClick;
            }
        }
        //判断进入方向
        function over(ev) {
            if (this.off) {
                var iX = ev.clientX - getLeft(this);
                this.style.transition = "0.5s";
                if (iX > this.offsetWidth / 2) {
                    this.style.transform = "rotateY(30deg)";
                } else {
                    this.style.transform = "rotateY(-30deg)";
                }
            }
        }

        function getLeft(obj) {
            var iLeft = 0;
            while (obj) {
                iLeft += obj.offsetLeft;
                obj = obj.offsetParent;
            }
            return iLeft
        }

        function fnClick(ev) {
            var iX = ev.clientX - getLeft(this);
            var iDeg = iX > this.offsetWidth / 2 ? -180 : 180;
            var iMax = 0;
            var iNow = 0;
            oContact.style.display = "block";
            for (var i = 0; i < aLi.length; i++) {
                if (iMax < Math.abs(i - this.index)) {
                    iMax = Math.abs(i - this.index);
                    iNow = i;
                }
                aLi[i].off = false;
                aLi[i].style.transition = "0.5s " + Math.abs(i - this.index) * 100 + "ms cubic-bezier(0.115, -0.195, 0.255, -0.280)";
                aLi[i].style.transform = "rotateY(" + iDeg + "deg)";
                aLi[i].style.opacity = 0.1;
            }
            aLi[iNow].addEventListener("transitionend", end, false);

            function end() {
                this.removeEventListener("transitionend", end, false);
                oContact.style.opacity = 1;
            }
        }
        oBack.onclick = function() {
            oContact.style.opacity = 0;
            oContact.addEventListener("transitionend", end, false);

            function end() {
                this.removeEventListener("transitionend", end, false);
                for (var i = 0; i < aLi.length; i++) {
                    aLi[i].off = true;
                    aLi[i].style.transition = "0.5s " + (aLi.length - i - 1) * 100 + "ms";
                    aLi[i].style.transform = "rotateY(0deg)";
                    aLi[i].style.opacity = 1;
                }
            }
        };
    }

    //判断鼠标进入方向
    $(".case ul li .li-box").on("mouseenter mouseleave", function(e) {
        var w = $(this).width();
        var h = $(this).height();
        var x = (e.pageX - $(this).offset().left - (w / 2)) * (w > h ? (h / w) : 1);
        var y = (e.pageY - $(this).offset().top - (h / 2)) * (h > w ? (w / h) : 1);
        var dirNum = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;

        var eventType = e.type;
        var aPos = [{
            left: 0,
            top: -h
        }, {
            left: w + 1,
            top: 0
        }, {
            left: 0,
            top: h
        }, {
            left: -w - 1,
            top: 0
        }];
        if (eventType == 'mouseenter') {
            $(this).find(".mask").css(aPos[dirNum]).stop(true, true).animate({
                left: 0,
                top: 0
            }, 200);
        } else {
            $(this).find(".mask").stop(true, true).animate(aPos[dirNum], 200)
        }
    });
});
