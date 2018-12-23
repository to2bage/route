const Koa = require("koa");
const R = require("ramda");
const { resolve } = require("path");

//#region 使用函数式编程, 加载middlewares目录下的所有的中间件
// 定义中间件的数组
const MIDDLEWARES = ['router'];

const useMiddlewares = (app) => {
    R.map(
        R.compose(
            R.forEachObjIndexed(
                initWith => initWith(app)
            ),
            require,
            name => resolve(__dirname, `./middlewares/${name}`)
        ),
        MIDDLEWARES
    )
};

(async () => {
    const app = new Koa();
    await useMiddlewares(app);
    app.listen(8964, "127.0.0.1", () => {
        console.log("Server is Running...");
    });
})();
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