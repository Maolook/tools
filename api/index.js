const path = require('path');
const fs = require('fs');
const defaultsDeep = require('lodash.defaultsdeep');
const Handlebars = require('handlebars');
var jsyaml = require('js-yaml');

const json = require('../package.json');

var spec = fs.readFileSync(path.join(__dirname,'swagger.yaml'), 'utf8');
var swaggerDoc = JSON.stringify(jsyaml.safeLoad(spec));

var jsonFilePath = path.join(__dirname,'swagger.json')

fs.writeFileSync(jsonFilePath, swaggerDoc, 'utf8');

const defaultOptions = {
  title: 'Swagger UI',
  oauthOptions: false,
  swaggerOptions: {
    dom_id: '#swagger-ui',
    url: '/swaggerJson',
    layout: 'StandaloneLayout',
  },
  routePrefix: '/docs',
  swaggerVersion: json.devDependencies['swagger-ui-dist'],
  hideTopbar: false,
};

module.exports = function koaSwagger(config) {
  const options = defaultsDeep(config || {}, defaultOptions);
  Handlebars.registerHelper('json', context => JSON.stringify(context));   
  const index = Handlebars.compile(fs.readFileSync(path.join(__dirname, './index.hbs'), 'utf-8'));

  return function koaSwaggerUi(ctx, next) {
    if (options.routePrefix === false || ctx.path === options.routePrefix) {
      ctx.type = 'text/html';
      ctx.body = index(options);
      return true;
    }
    return next();
  };
};