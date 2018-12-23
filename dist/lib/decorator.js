"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.all = exports.use = exports.del = exports.put = exports.post = exports.get = exports.controller = exports.Route = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _map = require("babel-runtime/core-js/map");

var _map2 = _interopRequireDefault(_map);

var _symbol = require("babel-runtime/core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _koaRouter = require("koa-router");

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _glob = require("glob");

var _glob2 = _interopRequireDefault(_glob);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require("path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var symbolPrefix = (0, _symbol2.default)("prefix");
var routerMap = new _map2.default();

var isArray = function isArray(controller) {
    if (_lodash2.default.isArray(controller)) {
        return controller;
    } else {
        return [controller];
    }
};

var Route = exports.Route = function () {
    function Route(app, apiPath) {
        (0, _classCallCheck3.default)(this, Route);

        this.app = app;
        this.apiPath = apiPath;
        this.router = new _koaRouter2.default();
    }

    (0, _createClass3.default)(Route, [{
        key: "init",
        value: function init() {
            _glob2.default.sync((0, _path.resolve)(this.apiPath, "./**/*.js")).forEach(require);

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(routerMap), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _router;

                    var _ref = _step.value;

                    var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

                    var conf = _ref2[0];
                    var _controller = _ref2[1];

                    var controllers = isArray(_controller);
                    var prefixPath = conf.target[symbolPrefix];
                    if (prefixPath) {
                        prefixPath = normalizePath(prefixPath);
                    }
                    var routerPath = prefixPath + conf.path;
                    (_router = this.router)[conf.method].apply(_router, [routerPath].concat((0, _toConsumableArray3.default)(controllers)));
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.app.use(this.router.routes());
            this.app.use(this.router.allowedMethods());
        }
    }]);
    return Route;
}();

var controller = exports.controller = function controller(path) {
    return function (target) {
        target.prototype[symbolPrefix] = path;
    };
};

var normalizePath = function normalizePath(path) {
    if (path.startsWith("/")) {
        return path;
    } else {
        return "/" + path;
    }
};

var router = function router(conf) {
    return function (target, key, desc) {
        conf.path = normalizePath(conf.path);
        // 希望使用一个"集合"来管理: 所有的路径和配置
        routerMap.set((0, _extends3.default)({
            target: target
        }, conf), target[key]);
    };
};

var get = exports.get = function get(path) {
    return router({
        method: "get",
        path: path
    });
};

var post = exports.post = function post(path) {
    return router({
        method: "post",
        path: path
    });
};

var put = exports.put = function put(path) {
    return router({
        method: "put",
        path: path
    });
};

var del = exports.del = function del(path) {
    return router({
        method: "del",
        path: path
    });
};

var use = exports.use = function use(path) {
    return router({
        method: "use",
        path: path
    });
};

var all = exports.all = function all(path) {
    return router({
        method: "all",
        path: path
    });
};