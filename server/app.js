const Koa = require("koa");
const R = require("ramda");
const { resolve } = require("path");

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
        )
    )(MIDDLEWARES)
};

(async () => {
    const app = new Koa();
    await useMiddlewares(app);
    app.listen(8964, "127.0.0.1", () => {
        console.log("Server is Running...");
    });
})();


