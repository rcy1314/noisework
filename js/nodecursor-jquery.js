/*!
 * NodeCursor :  a tiny javascript plugin to create custom cursor animations - jQuery version
 * (c) 2019 Hadrien Mongouachon
 * MIT Licensed.
 *
 * Author URI: http://hmongouachon.com
 * Plugin URI: https://github.com/hmongouachon/NodeCursor

 * Version: 1.0.0
 */
(function($) {
    NodeCursor = function(options) {
        
        /////////////////////////////

        // options parameters

        /////////////////////////////

        var defaults = {
            cursor: true,
            node: true,
            cursor_velocity: 1,
            node_velocity: 0.35,
            native_cursor: 'default',
            element_to_hover: 'disable',
            cursor_class_hover: 'disable',
            node_class_hover: 'disable',
            hide_mode: true,
            hide_timing: 3000
        }

        /////////////////////////////

        // var

        /////////////////////////////

        var settings = $.extend({}, defaults, options);

        var node, cursor;
        var timer;
        var request;
        var playing = false;
        var cursor_mouseX = 0;
        var cursor_mouseY = 0;
        var node_mouseX = 0;
        var node_mouseY = 0;
        var cursor_xp = 0;
        var cursor_yp = 0;
        var node_xp = 0;
        var node_yp = 0;

        
        /////////////////////////////

        // markups selectors, set cursor, get cursor / node w/h / 2

        /////////////////////////////

        if (settings.cursor === true) {
            cursor = $("#cursor");
        }

        if (settings.node === true) {
            node = $("#node");
        }

        // get cursor / node w/h / 2
        var cursor_width = cursor.width() / 2;
        var cursor_height = cursor.width() / 2;

        var node_width = node.width() / 2;
        var node_height = node.width() / 2;

        // set css for cursor
        $('body').css({
            'curosr': settings.native_cursor
        })



        /////////////////////////////

        // mouse stop moving

        /////////////////////////////

        function mouseStopped() {
            // if mouse stop moving remove class moving 
            // it will hide the circle with opacity transition 

            playing = false;
        }
        

        /////////////////////////////

        // mouse move

        /////////////////////////////

        $(document).mousemove(function(e) {
            // if mouse start moving add class moving
            // it will show the circle with opacity transition 
            playing = true;

            if (settings.cursor === true) {
                // get the mouse position minus 3px to center the circle
                cursor_mouseX = e.clientX - cursor_width;
                cursor_mouseY = e.clientY - cursor_height;
            }
            if (settings.node === true) {
                // get the mouse position minus 6px to center the node
                node_mouseX = e.clientX - node_width;
                node_mouseY = e.clientY - node_height;
            }

            if (settings.hide_mode === true) {
                hide_cursor();
            }

            function hide_cursor() {
                clearTimeout(timer);
                timer = setTimeout(mouseStopped, settings.hide_timing);
            }

        });
        

        /////////////////////////////

        // render

        /////////////////////////////

        function render() {

            if (playing === true) {

                if (settings.cursor === true) {
                    cursor.addClass('moving');
                    // change 12 to alter damping higher is slower
                    cursor_xp += ((cursor_mouseX - cursor_xp) * settings.cursor_velocity);
                    cursor_yp += ((cursor_mouseY - cursor_yp) * settings.cursor_velocity);

                    cursor.css({
                        left: cursor_xp + 'px',
                        top: cursor_yp + 'px'
                    });
                }
                if (settings.node === true) {
                    node.addClass('moving');

                    node_xp += ((node_mouseX - node_xp) * settings.node_velocity);
                    node_yp += ((node_mouseY - node_yp) * settings.node_velocity);

                    node.css({
                        left: node_xp + 'px',
                        top: node_yp + 'px'
                    }); //
                }

            } else {

                if (settings.cursor === true) {
                    cursor.removeClass('moving');
                }
                if (settings.node === true) {
                    node.removeClass('moving');
                }

                cancelAnimationFrame(request);

            }

            // if element hover class is not disable
            if (settings.element_to_hover !== 'disable') {
                let hoverable = [];
                settings.element_to_hover.split(",").forEach((toHover) => {
                    hoverable.push(toHover.trim()+':hover');
                });

                if ($(hoverable.join(",")).length != 0) {
                    if (settings.cursor === true) {
                        // if cursor hovering has class
                        if (settings.cursor_class_hover !== 'disable') {
                            // add custom class for hover css effect
                            cursor.addClass(settings.cursor_class_hover);
                        }
                    }

                    if (settings.node === true) {
                        // if node hovering has class
                        if (settings.node_class_hover !== 'disable') {
                            // add custom class for hover css effect
                            node.addClass(settings.node_class_hover);
                        }
                    }
                } else {

                    // remove custom class
                    if (cursor.hasClass(settings.cursor_class_hover)) {
                        cursor.removeClass(settings.cursor_class_hover)
                    }

                    if (node.hasClass(settings.node_class_hover)) {
                        node.removeClass(settings.node_class_hover)
                    }
                }
            }

            request = requestAnimationFrame(render);
        }

        request = requestAnimationFrame(render);
        

        /////////////////////////////

        // helpers

        /////////////////////////////

        window.requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;




    }
})(jQuery);