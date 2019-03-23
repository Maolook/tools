"use stricct"
var models = require('../models')

//创建
const createInfo = async (ctx, next) => {
    let data = ctx.request.body.fields,
        code, msg;
    let response = await models.LegendList.create(data);
    if (response) {
        code = 200;
        msg = "创建成功"
    } else {
        code = 401;
        msg = "创建失败"
    };
    return {
        code: code,
        msg: msg,
        data: ""
    }
}

//查询 
const queryInfo = async (ctx, next) => {
    let query = ctx.request.body.fields,
        result, condition = {};
    if (query) {
        if (query.sex) {
            condition.sex = query.sex;
        };
        if (query.age) {
            condition.age = query.age;
        };
        if (query.name) {
            result = await models.LegendList.findAll({
                where: {
                    ...condition,
                    ...{
                        name: {
                            $like: '%' + query.name + '%',
                        },
                    },
                },
                attributes: ['id', 'name', 'sex', 'age'],
            });
        } else {
            result = await models.LegendList.findAll({
                where: {
                    ...condition,
                },
                attributes: ['id', 'name', 'sex', 'age'],
            })
        };
    } else {
        result = await models.LegendList.findAll({
            attributes: ['id', 'name', 'sex', 'age'],
        })
    }
    return {
        code: 200,
        msg: "",
        data: result
    }
}

//更新
const updateInfo = async (ctx, next) => {
    let data = ctx.request.body.fields,
        response, msg, code;
    response = await models.LegendList.update(data, {
        where: {
            id: data.heroId,
        }
    });
    if (response) {
        code = 200;
        msg = "更新成功"
    } else {
        code = 401;
        msg = "更新失败"
    };
    return {
        code: code,
        msg: msg,
        data: ""
    };
}

//删除
const delectInfo = async (ctx, next) => {
    let data = ctx.request.body.fields,
        response, code, msg, res;
    response = await models.LegendList.destroy({
        where: {
            id: data.heroId,
        },
    });
    if (response) {
        code = 200;
        msg = "删除成功"
    } else {
        code = 401;
        msg = "删除失败"
    };
    res = await models.LegendList.findAll({
        attributes: ['id', 'name', 'sex', 'age']
    });
    return {
        code: code,
        msg: msg,
        data: res
    };
}



exports.createInfo = createInfo;
exports.queryInfo = queryInfo;
exports.updateInfo = updateInfo;
exports.delectInfo = delectInfo;
