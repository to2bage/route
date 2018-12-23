const { controller, get, put } = require("../lib/decorator.js");

@controller('api/v0/movies')
export class movieController {
    @get("/")
    async getMovies (ctx, next) {
        ctx.body = ctx.url;
    }

    @get("/:id")
    async getMovieById (ctx, next) {
        ctx.body = ctx.url + "<+>" + ctx.params.id;
    }
}