/**
 * Copyright 2013 Stephino
 */
$(document).ready(function(){
    "use strict";
    var intval = function (mixed_var, base) {var tmp;var type = typeof(mixed_var);if (type === 'boolean') {return +mixed_var;} else if (type === 'string') {tmp = parseInt(mixed_var, base || 10);return (isNaN(tmp) || !isFinite(tmp)) ? 0 : tmp;} else if (type === 'number' && isFinite(mixed_var)) {return mixed_var | 0;} else {return 0;}};
    var preload = function(arrayOfImages) {$(arrayOfImages).each(function(){$('<img/>')[0].src = this;});};
    jQuery.fn.outerHTML = function() {return jQuery('<div />').append(this.eq(0).clone()).html();};
    
    // Define the main class
    var Scartz = function() {
        var _this = this;
        var animation = {ongoing: false, triggers: {width: 0, height: 0}};
        var timers = [];
        var thickness = 10;
        var distanceUnit = 17;
        var options = {};
            
        // Initiate the project
        this.init = function() {
            // Set the animation triggers
            animation.triggers = {
                width: intval($(window).width()),
                height: intval($(window).height()),
            };
            
            // Loading...
            this.loading();
            
            // Set the social icons
            this.socialIcons();
            
            // Create the scrollbars
            this.scrollBars();
            
            var resize;
            $(window).resize(function(){
              clearTimeout(resize);
              resize = setTimeout(function(){
                  if (!animation.ongoing) {
                    var triggers = {
                        width: intval($(window).width()),
                        height: intval($(window).height()),
                    };
                    if (animation.triggers.width !== triggers.width || animation.triggers.height !== triggers.height) {
                        // Reset the animation triggers
                        animation.triggers = triggers;
                        _this.loading(100);
                    }
                }
              }, 200);
            });

            // Parallax
            this.parallax();
            
            // Map button
            this.mapBtn();
            
            // Add tooltips to all the titles
            $('.modal').draggable();
            $('.modal-header').css({borderWidth: '2px',
                    borderColor: options.color
            });
        };
        
        this.socialIcons = function() {
            var translations = {
                'youtube': "&#xe000;",
                'yandex': "&#xe001;",
                'vkontakte': "&#xe002;",
                'vk': "&#xe003;",
                'vimeo': "&#xe004;",
                'twitter': "&#xe005;",
                'tumblr': "&#xe006;",
                'steam': "&#xe007;",
                'stackoverflow': "&#xe008;",
                'soundcloud': "&#xe009;",
                'skype': "&#xe00a;",
                'share': "&#xe00b;",
                'rss': "&#xe00c;",
                'readability': "&#xe00d;",
                'read-it-Later': "&#xe00e;",
                'pocket': "&#xe00f;",
                'pinterest': "&#xe010;",
                'picasa': "&#xe011;",
                'openid': "&#xe012;",
                'myspace': "&#xe013;",
                'moikrug': "&#xe014;",
                'linked-in': "&#xe015;",
                'lifejournal': "&#xe016;",
                'lastfm': "&#xe017;",
                'jabber': "&#xe018;",
                'instapaper': "&#xe019;",
                'habrahabr': "&#xe01a;",
                'google': "&#xe01b;",
                'github-octoface': "&#xe01c;",
                'github-circle': "&#xe01d;",
                'foursquare': "&#xe01e;",
                'flickr': "&#xe01f;",
                'flattr': "&#xe020;",
                'facebook': "&#xe021;",
                'evernote': "&#xe022;",
                'email': "&#xe023;",
                'dropbox': "&#xe024;",
                'blogspot': "&#xe025;",
                'bitbucket': "&#xe026;",
                'youtube-play': "&#xe027;",
            };
            if ($('.social').length) {
                $.each($('.social'), function(){
                    // Get the class name
                    var className = $(this).attr('class').replace(/social\s*/g, '');
                    var title = $(this).html();
                    
                    // Translation available?
                    if (typeof translations[className] !== 'undefined') {
                        $(this).html(translations[className]).css({
                            color: options.color
                        }).attr('title', title);
                    }
                });
            }
        };
        
        // Countdown Class
        var Countdown = function() {
            var _this   = this;
            var countdown = $('.countdown');
            var date, color;
            this.daysChart = null;
            this.hoursChart = null;
            this.minutesChart = null;
            this.secondsChart = null;

            //create donut chart
            this.createPlot = function(id) {
                var s1 = [['a', 60], ['b', 0]];
                var width = intval($('#counter > div > .col').width());
                var diameter = (width > 250 ? 250 : width) - 20;
                var plot = $.jqplot(id, [s1], {
                    seriesDefaults: {
                        seriesColors: ['rgba(0,0,0,0.4)', color], 
                        markerOptions: {
                            size: 1
                        },
                        renderer: $.jqplot.DonutRenderer,
                        rendererOptions: {
                            sliceMargin: 0,
                            startAngle: 270,
                            padding: 0,
                            highlightMouseOver: false,
                            highlightMouseDown: false,
                            thickness: thickness,
                            shadowOffset: 0,
                            shadowDepth: 0,
                            shadowAlpha: 0,
                            diameter: diameter,
                        }
                    },
                    grid: {
                        shadow: false,
                        background: 'transparent',
                        borderWidth: 0
                    }
                });
                return plot;
            };

            //init application
            this.init = function() {
                if (countdown.length === 0) {return;}

                // Get the date
                date = countdown.attr('date');
                date = date.split('-');

                // Custom colors
                color = !countdown.attr('data-color') ? '#ffffff' : countdown.attr('data-color');

                // Invalid date format
              if (date.length !== 3) {return;}

                // Set the actual date
                date = new Date(intval(date[0]), intval(date[1]) - 1, intval(date[2]));
                // Add the necessary HTML
                $('.countdown').html('<div id="counter">' + 
                      '<div class="container row-fluid">' +
                      '<div class="span2 col offset2">' +
                        '<div id="daysChart" class="chart"></div>' +
                        '<div id="days" class="info"><span class="number">1</span><p>days</p></div>' +
                      '</div>' +
                      '<div class="span2 col">' +
                        '<div id="hoursChart" class="chart"></div>' +
                        '<div id="hours" class="info"><span class="number">1</span><p>hours</p></div>' +
                      '</div>' +
                      '<div class="span2 col">' +
                        '<div id="minutesChart" class="chart"></div>' +
                        '<div id="minutes" class="info"><span class="number">1</span><p>minutes</p></div>' +
                      '</div>' +
                      '<div class="span2 col">' +
                        '<div id="secondsChart" class="chart"></div>' +
                        '<div id="seconds" class="info"><span class="number">1</span><p>seconds</p></div>' +
                      '</div>' +
                    '</div>' +
                  '</div>');

                //create charts for days, hours, minutes and seconds
                this.daysChart = this.createPlot("daysChart");
                this.hoursChart = this.createPlot("hoursChart");
                this.minutesChart = this.createPlot("minutesChart");
                this.secondsChart = this.createPlot("secondsChart");

                //at start update counter
                this.checkDate();

                //every 1 sec update counter
                timers[timers.length] = window.setInterval(function() {
                    _this.checkDate();
                }, 1000);
            };

            //counter update function
            this.checkDate = function() {
                //get actually date
                var now = new Date();
                //get difference from launch date (declared in head in index.html)
                var diff = date.getTime() - now.getTime();

                //change multisecond result to seconds, minutes, hours and days
                var tmp = diff / 1000;
                var seconds = Math.floor(tmp % 60);
                tmp /= 60;
                var minutes = Math.floor(tmp % 60);
                tmp /= 60;
                var hours = Math.floor(tmp % 24);
                tmp /= 24;
                var days = Math.floor(tmp);

                //render in text
                $("#days .number").html(days);
                $("#hours .number").html(hours);
                $("#minutes .number").html(minutes);
                $("#seconds .number").html(seconds);
                
                var spelling = {
                    days:    [countdown.attr('day') ? countdown.attr('day') : "day", countdown.attr('days') ? countdown.attr('days') : "days"],
                    hours:   [countdown.attr('hour') ? countdown.attr('hour') : "hour", countdown.attr('hours') ? countdown.attr('hours') : "hours"],
                    minutes: [countdown.attr('minute') ? countdown.attr('minute') : "minute", countdown.attr('minutes') ? countdown.attr('minutes') : "minutes"],
                    seconds: [countdown.attr('second') ? countdown.attr('second') : "second", countdown.attr('seconds') ? countdown.attr('seconds') : "seconds"],
                };
                
                $("#days > p").html(days === 1 ? spelling.days[0] : spelling.days[1]);
                $("#hours > p").html(hours === 1 ? spelling.hours[0] : spelling.hours[1]);
                $("#minutes > p").html(minutes === 1 ? spelling.minutes[0] : spelling.minutes[1]);
                $("#seconds > p").html(seconds === 1 ? spelling.seconds[0] : spelling.seconds[1]);

                //prepare new data for charts
                var daysData    = [['a', 360 - days], ['b', days]];
                var hoursData   = [['a', 24  - hours], ['b', hours]];
                var minutesData = [['a', 60 - minutes], ['b', minutes]];
                var secondsData = [['a', 60 - seconds], ['b', seconds]];

                //draw charts with new data
                this.daysChart.series[0].data = daysData;
                this.daysChart.redraw();
                this.hoursChart.series[0].data = hoursData;
                this.hoursChart.redraw();
                this.minutesChart.series[0].data = minutesData;
                this.minutesChart.redraw();
                this.secondsChart.series[0].data = secondsData;
                this.secondsChart.redraw();
            };
        };
        
        this.sectionNavigation = function() { 
            // Get all available sections
            var sections = $('section');
            
            // Make the first one active
            if (sections.length) {
                var currentSection = 0;
                
                if (!$('section.active').length) {
                    $(sections).first().addClass('active');
                } else {
                    $.each(sections, function(k,s){
                        if ($(s).hasClass('active')) {
                            currentSection = k;
                            return false;
                        }
                    });
                }
                
                if (sections.length > 1) {
                    var navigate = function(sense) {
                        // Negotiate the section
                        if (sense) {
                            currentSection++;
                        } else {
                            currentSection--;
                        }
                        
                        // Compute optional classes
                        $('.loading').removeClass('secondary-section').removeClass('last-section').removeClass('first-section');
                        if (currentSection < 0){
                            currentSection = sections.length - 1;
                        } else {
                            if (currentSection > sections.length - 1) {
                                currentSection = 0;
                            }
                        }
                        
                        // Set the sections
                        if (currentSection === sections.length - 1) {
                            $('.loading').addClass('last-section');
                        } else {
                            if (currentSection === 0) {
                                $('.loading').addClass('first-section');
                            } else {
                                $('.loading').addClass('secondary-section');
                            }
                        }
                        
                        // Deactivate all sections
                        $('section').removeClass('active');
                        
                        // Activate the current one
                        $(sections[currentSection]).addClass('active');
                    };
                    // Implement navigation actions
                    $('.navigation').click(function(){
                        navigate($(this).hasClass('bottom'));
                    });
                    
                    return;
                }
            }
        };
        
        this.scrollBars = function() {
            $('section').mCustomScrollbar({
                set_width:false, /*optional element width: boolean, pixels, percentage*/
                set_height:false, /*optional element height: boolean, pixels, percentage*/
                horizontalScroll:false, /*scroll horizontally: boolean*/
                scrollInertia:50, /*scrolling inertia: integer (milliseconds)*/
                scrollEasing:"easeOutCirc", /*scrolling easing: string*/
                mouseWheel:"pixels", /*mousewheel support and velocity: boolean, "auto", integer, "pixels"*/
                mouseWheelPixels:50, /*mousewheel pixels amount: integer*/
                autoDraggerLength:false, /*auto-adjust scrollbar dragger length: boolean*/
                scrollButtons:{ /*scroll buttons*/
                    enable:false, /*scroll buttons support: boolean*/
                    scrollType:"continuous", /*scroll buttons scrolling type: "continuous", "pixels"*/
                    scrollSpeed:20, /*scroll buttons continuous scrolling speed: integer*/
                    scrollAmount:40 /*scroll buttons pixels scroll amount: integer (pixels)*/
                },
                advanced:{
                    updateOnBrowserResize:true, /*update scrollbars on browser resize (for layouts based on percentages): boolean*/
                    updateOnContentResize:true, /*auto-update scrollbars on content resize (for dynamic content): boolean*/
                    autoExpandHorizontalScroll:false, /*auto expand width for horizontal scrolling: boolean*/
                    autoScrollOnFocus:true /*auto-scroll on focused elements: boolean*/
                }
            });
        };
        
        this.mapBtn = function() {
            $('.map-btn').on('click', function(){
                
            });
        };
        
        this.parallax = function() {
            
            $('html').on('mousemove', function(e){
                // Get the window width
                var windowWidth = $(window).width();
                
                // Get the window height
                var windowHeight = $(window).height();
                
                // Get x percent
                var xPercent = (e.clientX / windowWidth * 100);
                
                // Get y percent
                var yPercent = (e.clientY / windowHeight * 100);
                
                xPercent = 40 + xPercent / 100 * 20;
                yPercent = 80 + yPercent / 100 * 20;
                
                // Get all the slides
                var allSlides = $('.slide');
                if (allSlides.length) {
                    allSlides.css({
                        backgroundPosition: xPercent + '% ' + yPercent + '%'
                    });
                }
            });
        };
        
        // Clear all window timers
        this.clearTimers = function() {
            $.each(timers, function(k,timer){
                window.clearTimeout(timer);
            });
        };
        
        // Show the loading bar
        this.loading = function(duration) {            
            // Started the animation
            animation.ongoing = true;
            
            // Clear the timers
            this.clearTimers();
            
            // Remove the loading class
            if ($('#page_wrap').hasClass('loading')) {
                $('#page_wrap').removeClass('loading');
            }
            
            // Remove newly added elements
            if ($('#page_wrap > .curtain').length) {
                $('#page_wrap > .curtain, #page_wrap > .strip').remove();
                if ($('#page_wrap').data('loading')) {
                    // Restore the original
                    $('#page_wrap').prepend($($('#page_wrap').data('loading')));
                }
            }
            
            // Set the page wrap height
            var loading = $('.loading');
            
            if (!$('#page_wrap').data('loading')) {
                $('#page_wrap').data('loading', loading.outerHTML());
                            
                // Get the options
                $.extend(options,{
                    color: loading.attr('data-color') ? loading.attr('data-color') : '#add8e6',
                    courtain: loading.attr('data-courtain') ? loading.attr('data-courtain') : '',
                });
            }
            
            // Get the options
            $.extend(options,{
                duration: parseInt((typeof duration === 'undefined' ? (loading.attr('data-duration') ? loading.attr('data-duration') : 3000) : duration), 10),
            });

            // Set the HTML
            loading.html('<div class="curtain top" rel="c'+options.courtain+'"><div class="background"></div></div><div class="curtain bottom" rel="c'+options.courtain+'"><div class="background"></div></div><div class="strip"><div class="logo-holder"><div id="logo-roundbar"></div><div class="logo" data-target="#about-us" data-toggle="modal">Logo</div></div><div class="line" style="background-color:'+options.color+'"></div></div>');

            // Get the plot width
            var plotWidth = $('.loading > .strip > .logo-holder').width();
            
            this.createSlider();
            
            // Set the logo holder top
            var logoHolderTop = ($('.loading > .strip').height() - plotWidth)/2;
            $('.loading > .strip > .logo-holder').css({
                top: logoHolderTop + 'px',
                height: plotWidth + 'px'
            });
            
            // Set the logo lineheight
            $('.loading > .strip > .logo-holder > .logo').css({
                lineHeight: plotWidth + 'px',
            });
            
            // Reset the line
            $('.loading > .strip > .line').css({width: '0%'});
            
            // Reset the courtains
            $('.loading > .strip.bottom, .loading > .strip.top').css({
                top: '50%',
            });
            $('.loading > .curtain.bottom, .loading > .curtain.top').css({
                height: '50%',
            });
            
            // Animated ran flag
            var animatedPlot = false;
            $('.loading > .strip > .line').animate({
                width: '100%'
            }, {
                duration: options.duration,
                step: function(n) {
                    if (n >= 47 && !animatedPlot) {
                        var plot = _this.createPlot('logo-roundbar', options.color, plotWidth);
                        _this.animatePlot(plot, 100, options.duration/2);
                        $('.loading > .strip > .logo-holder > .logo').animate({
                            opacity: 1
                        }, {
                            duration: options.duration/2
                        });
                        animatedPlot = true;
                    }
                },
                complete: function() {
                    $('#page_wrap').prepend($('#page_wrap > .loading > div'));
                    $('#page_wrap > .loading').remove();
                    $('#page_wrap').addClass('loading');
                    
                    // Get the image list
                    var slides = $('.slider > .slide');
                    
                    // Add curtain clones
                    if (slides.length) {
                        // Add the slides
                        $.each(slides, function(){
                            // Curtain clones
                            var clone2 = $(this).clone();

                            // Change the background image to the blurred one
                            clone2.css({
                                backgroundImage: clone2.css('backgroundImage').replace(/(\.\w+['"]?\))/g, "-blurred$1"),
                            }).addClass('blurred');

                            // Append the clones
                            $('.curtain').prepend(clone2);
                        });
                    }
                }
            });
            
            // Set the countdown
            var count = new Countdown(); 
            window.setTimeout(function(){count.init();}, 200);
        };
        
        this.createSlider = function() {
            // Get the image list
            var images = $('.slider > img');
            if (!images.length) {return;}
            
            // Replace the images with divs
            $.each(images, function(k){
                preload([$(this).attr('src')]);
                var replacement = $('<div class="slide" rel="s'+k+'" style="background-image: url('+$(this).attr('src')+');"></div>');
                $(this).replaceWith(replacement);
                images[k] = replacement;
            });
            // Get the options
            var sliderOptions = {
                duration: $('.slider').attr('data-duration') ? intval($('.slider').attr('data-duration')) : 2000,
            };
            var currentSlide = 0;
            var totalSlides = images.length;
            
            var nextSlide = function(){
                // Set the active slide 
                $.each($('.slide'), function(){
                    // Clear half-hidden elements
                    if (intval($(this).css('opacity')) !== 0 && intval($(this).css('opacity')) !== 1) {
                        $(this).css('opacity', 0);
                    }
                    
                    // Hide all elements but the current one
                    if (('s' + currentSlide) !== $(this).attr('rel')) {
                        if ($(this).css('display') !== 'none') {
                            $(this).fadeOut(sliderOptions.duration/12);
                        }
                    }
                    $(this).removeClass('active');
                });
                
                // Fade in the current image
                $('.slide[rel=s' + currentSlide + ']').addClass('active').fadeIn(sliderOptions.duration/10);
                
                // Fade out the logo holder
                if ($('.complete-circle').length) {
                    $('.logo-holder').css({
                        backgroundImage: 'none',
                    });
                } else {
                    $('.logo-holder').css({
                        backgroundImage: $('.slide[rel=s' + currentSlide + ']').last().css('backgroundImage'),
                    });
                    $('.curtain > .background').css({
                        backgroundImage: $('.slide[rel=s' + currentSlide + ']').last().css('backgroundImage').replace(/(\.\w+['"]?\))/g, "-blurred$1"),
                    });
                }

                // Increment the current slide
                currentSlide++;
                if (currentSlide > totalSlides - 1) {
                    currentSlide = 0;
                }
                
                window.setTimeout(nextSlide, sliderOptions.duration);
            };
            nextSlide();
        };
        
        // Animate a given plot to a given percent
        this.animatePlot = function(plot, percent, duration) {
            var bufferFactor = 2;
            var stepSize = duration/percent * bufferFactor;

            // Go to the next animation step
            var nextStep = function(now) {
                // Increment the step
                now+=bufferFactor;

                // Done?
                if (now > percent+1) {
                    // Inner circle width
                    var completeCircleWidth = plot._width - 2*(distanceUnit+thickness);
                    
                    // All done 
                    var completeCircle = $('<div class="complete-circle"></div>').css({
                        width: completeCircleWidth,
                        height: completeCircleWidth,
                        top: thickness,
                        left: distanceUnit,
                        borderWidth: thickness,
                        borderColor: options.color,
                    });
                    
                    $(plot.targetId).html(completeCircle);
                    
                    // Clone
                    var bottomStrip = $('.loading > .strip').clone().addClass('bottom');
                    
                    // Set the bottom strip logo holder top
                    $('.logo-holder', bottomStrip).css({
                        top: (-parseInt($('.logo-holder', bottomStrip).height()/2, 10)) + 'px',
                    });
                    
                    // Add a "top" class to the strip
                    $('.loading > .strip').addClass('top');
                    
                    // Append the clone
                    bottomStrip.insertAfter($('.loading > .strip'));
                    $('.line', bottomStrip).css({width: '100%'});
                    
                    // Animate the courtains
                    _this.animateCourtains();
                    
                    return;
                }
                
                // Animate
                plot.series[0].data = [['a', 100 - now], ['b', now]];
                plot.redraw(true);
                
                // Wait for the next call
                timers[timers.length] = window.setTimeout(function(){
                    nextStep(now);
                }, stepSize);
            };
            nextStep(0);
        };
        
        this.formValidation = function() {
            // Parse forms
            $('.submit.btn').on('click', function(){
                $(this).closest('form').submit();
            });
            $.each($('form.validate'), function(){
                $(this).validate({
                    submitHandler: function(form) {
                        var data = $(form).serializeArray();
                        var action = $(form).attr('action');
                        $.ajax({
                            method: 'post',
                            dataType: 'json',
                            url: action,
                            data: data,
                            success: function(d) {
                                // Prepare the message
                                var message = '';
                                $.each(d, function(k, m){
                                    var messageType = 'boolean' === $.type(m.status) ? (m.status?'success':'error') : m.status;
                                    message += '<div class="alert alert-'+messageType+'">'+m.message+'</div>';
                                });
                                // Replace the form with the message
                                $(form).replaceWith($(message));
                            },
                            error: function() {
                                var error = $('<div class="alert alert-error">Could not contact host. Please try again later.</div>');
                                $(form).replaceWith(error);
                            }
                        });
                    }
                });
            });
        };
        
        // Animate the courtains
        this.animateCourtains = function() {
            // Split the logo
            $('.loading > .strip > .logo-holder > .logo').animate({
                height: ($('.loading > .strip > .logo-holder').height()/2 - 10) + 'px',
                lineHeight: $('.loading > .strip > .logo-holder').height()/2
            }, {
                duration: options.duration/4
            });
            $('.loading > .strip.bottom > .logo-holder > .logo').animate({
                height: ($('.loading > .strip > .logo-holder').height()/2 - 10) + 'px',
                opacity: 0
            }, {
                duration: options.duration/4,
                complete: function() {
                    $(this).remove();
                }
            });
            
            // Add the navigation buttons
            $('.loading > .strip.top > .logo-holder .complete-circle').prepend('<div class="navigation top" style="color:'+options.color+';"></div>');
            $('.loading > .strip.bottom > .logo-holder .complete-circle').prepend('<div class="map-btn" data-target="#map" data-toggle="modal" style="color:'+options.color+';"></div><div class="navigation bottom" style="color:'+options.color+';"></div>');
                        
            // Create the section navigation
            this.sectionNavigation();
            
            // Get the image list
            var slides = $('.slider > .slide');

            if (slides.length) {
                // Add the slides
                $.each(slides, function(){
                    // Complete circle clones
                    var clone1 = $(this).clone();
                    
                    // Append the clones
                    $('.complete-circle').append(clone1);
                });
            }
                    
            // Retreat the courtains
            $('.loading > .curtain.top, .loading > .curtain.bottom').animate({
                height: '20%',
            }, {
                duration: 2000
            });
            
            // Retreat the top strip
            $('.loading > .strip.top').animate({
                top: '20%',
            }, {
                duration: 2000
            });
            
            // Retreat the bottom strip
            $('.loading > .strip.bottom').animate({
                top: '80%',
            }, {
                duration: 2000,
                complete: function(){
                    animation.ongoing = false;
                    $('[title]').tooltip();
                    _this.formValidation();
                }
            });
        };
        
        // Create a plot by ID
        this.createPlot = function(id, color, diameter) {
            var s1 = [['a', 0], ['b', 0]];
            $('#' + id).html('');
            
            // Format the logo roundbar
            $('#logo-roundbar').css({
                width: (diameter + 2 * distanceUnit) + 'px',
                height: (diameter + 2 * distanceUnit) + 'px',
                top: '-10px',
                left: (-distanceUnit) + 'px'
            });
            var plot = $.jqplot(id, [s1], {
                seriesDefaults: {
                    seriesColors: ['rgba(255,255,255,0)', color], 
                    markerOptions: {
                        size: 1
                    },
                    renderer: $.jqplot.DonutRenderer,
                    rendererOptions: {
                        sliceMargin: 0,
                        startAngle: 180,
                        padding: 0,
                        highlightMouseOver: false,
                        highlightMouseDown: false,
                        thickness: thickness,
                        shadowOffset: 0,
                        shadowDepth: 0,
                        shadowAlpha: 0,
                        diameter: diameter,
                    }
                },
                grid: {
                    shadow: false,
                    background: 'transparent',
                    borderWidth: 0
                }
            });
            return plot;
        };
    };
    
    // Load the class
    var instance = new Scartz();
    instance.init();
});