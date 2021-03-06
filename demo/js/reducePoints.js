/**
 * @file 寻找关键点
 * @author mengke01(kekee000@gmail.com)
 */

define(
    function (require) {

        var reducePoints = require('graphics/image/contour/douglasPeuckerReducePoints');
        var pathUtil = require('graphics/pathUtil');
        var data = require('demo/../data/image-contours10');

        var entry = {

            /**
             * 初始化
             */
            init: function () {
                var breakPoints = [];
                var html = '';

                data.forEach(function(c) {
                    c.splice(c.length - 1, 1);
                });

                data.forEach(function (contour) {
                    contour.forEach(function(p) {
                        html += '<i style="left:'+p.x+'px;top:'+p.y+'px;"></i>';
                    });
                });

                $('#points').html(html);

                data.forEach(function (contour) {
                    pathUtil.scale(contour, 2);
                    var points  = reducePoints(contour, 0, contour.length - 1, 2);
                    if (points) {
                        points.forEach(function (p) {
                            breakPoints.push(p);
                        });
                    }
                    pathUtil.scale(contour, 0.5);
                });


                html = '';
                for (var i = 0, l = breakPoints.length; i < l; i++) {
                    var c = "break";
                    if (breakPoints[i].tangency) {
                        c = 'tangency';
                    }
                    else if(breakPoints[i].inflexion) {
                        c = 'inflexion';
                    }
                    var width = '';
                    if (breakPoints[i].right == 1) {
                        width = 'width: 4px;height: 4px';
                    }
                    html += '<i style="left:'+breakPoints[i].x+'px;top:'+breakPoints[i].y+'px;'+width+'" class="'+c+'"></i>';
                }

                $('#points-break').html(html);
            }
        };

        entry.init();

        return entry;
    }
);
