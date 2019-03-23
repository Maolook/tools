
import { createInfo, updateInfo, queryInfo, delectInfo } from '../controllers/crud';
import Router from 'koa-router';




const path = require('path');
const fs = require('fs');


const getJson = async () => {
    var jsonData = fs.readFileSync(path.join(path.dirname(__dirname), 'api/swagger.json'), 'utf-8');
    return jsonData;
}

const router = new Router();


router.get('/swaggerJson', async (ctx, next) => {
    ctx.body = await getJson();
});

router.post('/createInfo', async (ctx, next) => {
    ctx.body = await createInfo(ctx, next);
});

router.post('/updateInfo', async (ctx, next) => {
    ctx.body = await updateInfo(ctx, next);
});

router.post('/queryInfo', async (ctx, next) => {
    ctx.body = await queryInfo(ctx, next);
});

router.post('/delectInfo', async (ctx, next) => {
    ctx.body = await delectInfo(ctx, next);
});


module.exports = router;
