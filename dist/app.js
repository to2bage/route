"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Koa = require("koa");
var R = require("ramda");

var _require = require("path"),
    resolve = _require.resolve;

//#region 使用函数式编程, 加载middlewares目录下的所有的中间件
// 定义中间件的数组


var MIDDLEWARES = ['router'];

var useMiddlewares = function useMiddlewares(app) {
    R.map(R.compose(R.forEachObjIndexed(function (initWith) {
        return initWith(app);
    }), require, function (name) {
        return resolve(__dirname, "./middlewares/" + name);
    }), MIDDLEWARES);
};

(0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var app;
    return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    app = new Koa();
                    _context.next = 3;
                    return useMiddlewares(app);

                case 3:
                    app.listen(8964, "127.0.0.1", function () {
                        console.log("Server is Running...");
                    });

                case 4:
                case "end":
                    return _context.stop();
            }
        }
    }, _callee, undefined);
}))();
//#endregion

//#region 普通的使用中间件
// const app = new Koa();
//
// app.use(async (ctx, next) => {
//     // import { router } from "./middlewares/router.js";
//     const { router } = require("./middlewares/router.js");
//     router(app);
//     next();
// });
//
// app.listen(8964, "127.0.0.1", () => {
//     console.log("Server is Running");
// });
//#endregion