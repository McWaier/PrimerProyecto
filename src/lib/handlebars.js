const {format} = require('timeago.js');
var hbs = require("handlebars")


const helpers = {};

helpers.timeago =(timestamp)=>{

 return format(timestamp)
};

hbs.registerHelper("equal", require("handlebars-helper-equal")),

module.exports = helpers;