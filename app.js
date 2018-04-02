const Vue = require('vue');
module.exports = function createApp (context) {
    return new Vue({
        data: {
            name: context.hostname
        },
        template: `<h1 id="ruananqing">{{ name }}</h1>`
    });
};