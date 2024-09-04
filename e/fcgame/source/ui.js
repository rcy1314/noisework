/*
JSNES, based on Jamie Sanders' vNES
Copyright (C) 2010 Ben Firshman

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
var gameScreenWidth = 256;
var gameScreenHeight = 240;

JSNES.DummyUI = function(nes) {
    this.nes = nes;
    this.enable = function() {};
    this.updateStatus = function() {};
    this.writeAudio = function() {};
    this.writeFrame = function() {};
};

if (typeof jQuery !== 'undefined') {
    (function($) {
        $.fn.JSNESUI = function(roms) {
            var parent = this;
            var UI = function(nes) {
                var self = this;
                self.nes = nes;

                /*
                 * Create UI
                 */
                self.status = $('<p class="nes-status">Booting up...</p>').appendTo(self.root);
                self.root = $('<div></div>');
                
                self.main = $('body');
                self.romContainer = $('<div class="nes-roms"></div>').appendTo(self.main);
                self.romSelect = $('<select></select>').appendTo(self.romContainer);
                self.controls = $('<div class="nes-controls"></div>').appendTo(self.main);
                self.buttons = {
                    pause: $('<input type="button" value="暂停" class="nes-pause" disabled="disabled">').appendTo(self.controls),
                    restart: $('<input type="button" value="重启" class="nes-restart" disabled="disabled">').appendTo(self.controls),
                    sound: $('<input type="button" value="关闭声音" class="nes-enablesound">').appendTo(self.controls),
                    zoom: $('<input type="button" value="放大" class="nes-zoom">').appendTo(self.controls)
                };
                self.screen = $('<canvas class="nes-screen" width="'+gameScreenWidth+'" height="'+gameScreenHeight+'"></canvas>').appendTo(self.root);

                if (!self.screen[0].getContext) {
                    parent.html("Your browser doesn't support the <code>&lt;canvas&gt;</code> tag. Try Google Chrome, Safari, Opera or Firefox!");
                    return;
                }
                self.root.appendTo(parent);

                /*
                 * ROM loading
                 */
                self.romSelect.change(function() {
                    self.loadROM();
                });

                /*
                 * Buttons
                 */
                self.buttons.pause.click(function() {
                    if (self.nes.isRunning) {
                        self.nes.stop();
                        self.updateStatus("Paused");
                        self.buttons.pause.attr("value", "继续");
                    } else {
                        self.nes.start();
                        self.buttons.pause.attr("value", "暂停");
                    }
                });

                self.buttons.restart.click(function() {
                    self.nes.reloadRom();
                    self.nes.start();
                });

                self.buttons.sound.click(function(e){
                    return self.RunSound();
                });

                self.zoomed = true;
                $('.nes-screen').css({
                    'max-height': document.documentElement.clientHeight,
                })
                $(window).bind('resize', function() {
                    $('.nes-screen').css({
                        'max-height': document.documentElement.clientHeight,
                    })
                })
                // if (/(IPHONE|IPAD|ANDROID)/i.test(navigator.userAgent)) {
                //     $('#pc-controlls').hide();
                // } else {
                //     //$('.nes-zoom').hide();    //隐藏放大按钮
                //     $('#mobile-controlls').hide();
                //     $('.shang').removeClass('anim_m').addClass('pc');
                // }

                //放大缩小按钮
                self.buttons.zoom.click(function(e){
                    return self.RunZoom();
                });
                self.RunZoom();

                /*
                 * Lightgun experiments with mouse
                 * (Requires jquery.dimensions.js)
                 */
                if ($.offset) {
                    self.screen.mousedown(function(e) {
                        if (self.nes.mmap) {
                            self.nes.mmap.mousePressed = true;
                            // FIXME: does not take into account zoom
                            self.nes.mmap.mouseX = e.pageX - self.screen.offset().left;
                            self.nes.mmap.mouseY = e.pageY - self.screen.offset().top;
                        }
                    }).mouseup(function() {
                        setTimeout(function() {
                            if (self.nes.mmap) {
                                self.nes.mmap.mousePressed = false;
                                self.nes.mmap.mouseX = 0;
                                self.nes.mmap.mouseY = 0;
                            }
                        }, 500);
                    });
                }

                if (typeof roms != 'undefined') {
                    self.setRoms(roms);
                }

                /*
                 * Canvas
                 */
                self.canvasContext = self.screen[0].getContext('2d');

                if (!self.canvasContext.getImageData) {
                    parent.html("Your browser doesn't support writing pixels directly to the <code>&lt;canvas&gt;</code> tag. Try the latest versions of Google Chrome, Safari, Opera or Firefox!");
                    return;
                }

                self.canvasImageData = self.canvasContext.getImageData(0, 0, gameScreenWidth, gameScreenHeight);
                self.resetCanvas();

                /*
                 * Keyboard
                 */
                $(document).
                bind('keydown', function(evt) {
                    self.nes.keyboard.keyDown(evt);
                }).
                bind('keyup', function(evt) {
                    self.nes.keyboard.keyUp(evt);
                }).
                bind('keypress', function(evt) {
                    self.nes.keyboard.keyPress(evt);
                });
 
                /*
                 * Sound
                 */
                // Workaround prefixed naming used in Safary 8-9
                //                self.dynamicaudio = new DynamicAudio({
                //                    swf: nes.opts.swfPath+'dynamicaudio.swf'
                //                });
                window.AudioContext = window.webkitAudioContext || window.AudioContext;
                try {
                    self.audio = new AudioContext();
                } catch (e) {
                    // lets fallback to Flash (for Internet Explorer 8-11)
                    console.error(e);
                    self.dynamicaudio = new DynamicAudio({
                        swf: nes.opts.swfPath + 'dynamicaudio.swf'
                    });
                }
            };

            UI.prototype = {
                loadROM: function() {
                    var self = this;
                    self.updateStatus("Downloading...");
                    $.ajax({
                        url: escape(self.romSelect.val()),
                        xhr: function() {
                            var xhr = $.ajaxSettings.xhr();
                            if (typeof xhr.overrideMimeType !== 'undefined') {
                                // Download as binary
                                xhr.overrideMimeType('text/plain; charset=x-user-defined');
                            }
                            self.xhr = xhr;
                            return xhr;
                        },
                        complete: function(xhr, status) {
                            var i, data;
                            if (JSNES.Utils.isIE()) {
                                var charCodes = JSNESBinaryToArray(
                                    xhr.responseBody
                                ).toArray();
                                data = String.fromCharCode.apply(
                                    undefined,
                                    charCodes
                                );
                            } else {
                                data = xhr.responseText;
                            }
                            self.nes.loadRom(data);
                            self.nes.start();
                            self.enable();
                        }
                    });
                },

                resetCanvas: function() {
                    this.canvasContext.fillStyle = 'black';
                    // set alpha to opaque
                    this.canvasContext.fillRect(0, 0, gameScreenWidth, gameScreenHeight);

                    // Set alpha
                    for (var i = 3; i < this.canvasImageData.data.length - 3; i += 4) {
                        this.canvasImageData.data[i] = 0xFF;
                    }
                },

                /*
                 *
                 * nes.ui.screenshot() --> return <img> element :)
                 */
                screenshot: function() {
                    var data = this.screen[0].toDataURL("image/png"),
                        img = new Image();
                    img.src = data;
                    return img;
                },

                /*
                 * Enable and reset UI elements
                 */
                enable: function() {
                    this.buttons.pause.attr("disabled", null);
                    if (this.nes.isRunning) {
                        this.buttons.pause.attr("value", "暂停");
                    } else {
                        this.buttons.pause.attr("value", "继续");
                    }
                    this.buttons.restart.attr("disabled", null);
                    if (this.nes.opts.emulateSound) {
                        this.buttons.sound.attr("value", "关闭声音");
                    } else {
                        this.buttons.sound.attr("value", "打开声音");
                    }
                },

                updateStatus: function(s) {
                    this.status.text(s);
                },

                setRoms: function(roms) {
                    this.romSelect.children().remove();
                    $("<option>选择游戏...</option>").appendTo(this.romSelect);
                    for (var groupName in roms) {
                        if (roms.hasOwnProperty(groupName)) {
                            var optgroup = $('<optgroup></optgroup>').
                            attr("label", groupName);
                            for (var i = 0; i < roms[groupName].length; i++) {
                                $('<option>' + roms[groupName][i][0] + '</option>')
                                    .attr("value", roms[groupName][i][1])
                                    .appendTo(optgroup);
                            }
                            this.romSelect.append(optgroup);
                        }
                    }
                },

                writeAudio: function(samples) {
                    //return this.dynamicaudio.writeInt(samples);
                    // Use fallback if available and return early
                    if (this.dynamicaudio) {
                        return this.dynamicaudio.writeInt(samples);
                    }
                    // Create output buffer (planar buffer format)
                    var buffer = this.audio.createBuffer(2, samples.length, this.audio.sampleRate);
                    var channelLeft = buffer.getChannelData(0);
                    var channelRight = buffer.getChannelData(1);
                    // Convert from interleaved buffer format to planar buffer
                    // by writing right into appropriate channel buffers
                    var j = 0;
                    for (var i = 0; i < samples.length; i += 2) {
                        channelLeft[j] = this.intToFloatSample(samples[i]);
                        channelRight[j] = this.intToFloatSample(samples[i + 1]);
                        j++;
                    }
                    // Create sound source and play it
                    var source = this.audio.createBufferSource();
                    source.buffer = buffer;
                    source.connect(this.audio.destination); // Output to sound
                    // card
                    source.start();
                },
                // Local helper function to convert Int output to Float
                // TODO: remove intToFloat and revise papu.js -> sample()
                //       to return AudioBuffer/Float32Array output used in HTML5 WebAudio API
                intToFloatSample: function(value) {
                    return value / 32767; // from -32767..32768 to -1..1 range
                },

                writeFrame: function(buffer, prevBuffer) {
                    var imageData = this.canvasImageData.data;
                    var pixel, i, j;

                    for (i = 0; i < gameScreenWidth * gameScreenHeight; i++) {
                        pixel = buffer[i];

                        if (pixel != prevBuffer[i]) {
                            j = i * 4;
                            imageData[j] = pixel & 0xFF;
                            imageData[j + 1] = (pixel >> 8) & 0xFF;
                            imageData[j + 2] = (pixel >> 16) & 0xFF;
                            prevBuffer[i] = pixel;
                        }
                    }

                    this.canvasContext.putImageData(this.canvasImageData, 0, 0);
                },

                
                //放大，缩小函数
                RunZoom : function() {
                    var self = this;
                    if (!self.zoomed) {
                        //缩小
                        $('body').addClass('放大');
                        if (document.documentElement.clientHeight < screen.availHeight) {
                            $('body').css({
                                width: document.documentElement.clientHeight,
                            })
                        }
                        $('.big .nes-screen').css({
                            height: document.documentElement.clientWidth,
                            width: 'auto'
                        })
                        self.buttons.zoom.attr("value", "放大");
                        self.zoomed = true;
                    } else {
                        //放大
                        self.buttons.zoom.attr("value", "缩小");
                        $('body').removeClass('big');
                        $('.nes-screen').css({
                            height: 'auto',
                            width: '100%',
                            'max-width': document.documentElement.clientWidth,
                            'max-height': document.documentElement.clientHeight-50
                        })
                        $('body').css({
                            width: 'auto'
                        })
                        self.zoomed = false;
                    }
                },

                //开启声音
                RunSound:function() {
                    var self = this;
                    if (self.nes.opts.emulateSound) {
                        self.nes.opts.emulateSound = false;
                        self.buttons.sound.attr("value", "打开声音");
                    } else {
                        self.nes.opts.emulateSound = true;
                        self.buttons.sound.attr("value", "关闭声音");

                        var source = self.audio.createBufferSource();
                        source.connect(self.audio.destination); // Output to sound
                        source.start();
                    }
                }
                
            };

            return UI;
        };
    })(jQuery);
}