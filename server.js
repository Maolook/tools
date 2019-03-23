import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import graphqlRouter from './router';
import koaBody from 'koa-body';;
import koaSwagger from './api';
import cors from 'koa2-cors';

var port = 5666;

const app = new Koa();
const router = new Router();

app.use(koaSwagger());

app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - 耗时${ms}ms`);
})

app.use(bodyParser());

app.use(koaBody({ multipart: true }));

app.use(cors());

router.use('', graphqlRouter.routes());

app
    .use(router.routes())
    .use(router.allowedMethods());

app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

app.listen(port);

console.log('server listen port: ' + port); 



