
define(
    function (require) {

        var svg2ttfobject = require('ttf/svg2ttfobject');

        describe('svg转ttf对象', function () {

            var ttfObject = svg2ttfobject(require('data/iconfont-xin.svg'));

            it('test svg glyf', function () {
                expect(ttfObject.from).toBe('svg');
                expect(ttfObject.glyf.length).toBe(2);
                expect(ttfObject.glyf[0].contours.length).toBe(7);
                expect(ttfObject.glyf[1].contours.length).toBe(1);
            });

            var fontObject = svg2ttfobject(require('data/icomoon.svg'));

            it('test svg font', function () {
                expect(fontObject.from).toBe('svgfont');
                expect(fontObject.id).toBe('icomoon');
                expect(fontObject.name.fontFamily).toBe('icomoon');
                expect(fontObject.metadata).toBe('Generated by IcoMoon');
            });

            it('test svg font glyf', function () {
                expect(fontObject.glyf.length).toBe(3);
                expect(fontObject.glyf[2].leftSideBearing).toBe(0);
                expect(fontObject.glyf[2].advanceWidth).toBe(1024);
                expect(fontObject.glyf[2].contours.length).toBe(7);
                expect(fontObject.glyf[2].unicode[0]).toBe(57345);
            });

        });

        describe('读错误svg数据', function () {

            it('test read svg error', function () {
                expect(function () {
                    svg2ttfobject('');
                }).toThrow();

                expect(function () {
                    svg2ttfobject('<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg></svg>');
                }).toThrow();

            });
        });
    }
);
