"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.router = undefined;

var _path = require("path");

var _decorator = require("../lib/decorator.js");

var router = exports.router = function router(app) {
    var apiPath = (0, _path.resolve)(__dirname, "../routes");
    var router = new _decorator.Route(app, apiPath);

    router.init();
};