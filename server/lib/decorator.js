import KoaRouter from "koa-router";
import glob from "glob";
import _ from 'lodash';
import { resolve }  from "path";

const symbolPrefix = Symbol("prefix");
const routerMap = new Map();

const isArray = (controller) => {
    if (_.isArray(controller)) {
        return controller;
    } else {
        return [controller];
    }
};

export class Route {
    constructor (app, apiPath) {
        this.app = app;
        this.apiPath = apiPath;
        this.router = new KoaRouter();
    }

    init () {
        glob.sync(resolve(this.apiPath, "./**/*.js")).forEach(require);

        for (let [conf, controller] of routerMap) {
            const controllers = isArray(controller);
            let prefixPath = conf.target[symbolPrefix];
            if (prefixPath) {
                prefixPath = normalizePath(prefixPath);
            }
            let routerPath = prefixPath + conf.path;
            this.router[conf.method](routerPath, ...controllers);
        }

        this.app.use(this.router.routes());
        this.app.use(this.router.allowedMethods());
    }
}

export const controller = (path) => {
    return (target) => {
        target.prototype[symbolPrefix] = path;
    }
};

const normalizePath = (path) => {
    if (path.startsWith("/")) {
        return path;
    } else {
        return `/${path}`;
    }
};

const router = (conf) => {
    return (target, key, desc) => {
        conf.path = normalizePath(conf.path);
        // 希望使用一个"集合"来管理: 所有的路径和配置
        routerMap.set({
            target: target,
            ...conf
        }, target[key]);
    }
};

export const get = (path) => {
    return router({
        method: "get",
        path: path
    })
};

export const post = (path) => {
    return router({
        method: "post",
        path: path
    })
};

export const put = (path) => {
    return router({
        method: "put",
        path: path
    })
};

export const del = (path) => {
    return router({
        method: "del",
        path: path
    })
};

export const use = (path) => {
    return router({
        method: "use",
        path: path
    })
};

export const all = (path) => {
    return router({
        method: "all",
        path: path
    })
};