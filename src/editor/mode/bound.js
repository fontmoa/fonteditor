/**
 * @file 默认模式
 * @author mengke01(kekee000@gmail.com)
 */

define(
    function (require) {

        var selectShape = require('render/util/selectShape');
        var referenceline = require('./referenceline');
        var mode = {


            down: function (e) {
                if (1 === e.which) {

                    // 경계선이 기준을 인출 여부
                    if (e.x <= 20 || e.y <= 20) {
                        this.setMode('referenceline', referenceline.newLine, e.x, e.y);
                        return;
                    }

                    // 字体模式
                    var result = this.fontLayer.getShapeIn(e);
                    if (result) {
                        var shape = selectShape(result, e);
                        this.setMode('shapes', [shape], 'bound');
                        return;
                    }

                    // 参考线模式
                    result = this.referenceLineLayer.getShapeIn(e);
                    if (result) {
                        var line = result[0];
                        this.setMode('referenceline', referenceline.dragLine, line, e);
                        return;
                    }

                    this.setMode('range');
                }
            },


            keydown: function (e) {

                if (e.keyCode === 32) {
                    this.setMode('pan');
                }
                else if (e.keyCode === 65 && e.ctrlKey) {
                    this.setMode('shapes', this.fontLayer.shapes.slice());
                }
            }
        };

        return mode;
    }
);
