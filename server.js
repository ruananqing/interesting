const createApp = require('./app.js');
const server = require('express')();
const uprandomFun = require('unequalprobabilityrandom');
const htmlContext = {
	title: 'ruananqing.com',
	meta: `<meta charset="UTF-8">`
};

let myNameArr = [
	["r", "R"],
	["u", "U"],
	["a", "A"],
	["n", "N"],
	["a", "A"],
	["n", "N"],
	["q", "Q"],
	["i", "I"],
	["n", "N"],
	["g", "G"]
];
let options = {
	0: 0.5,
	1: 0.5
};
let uprandom = uprandomFun(options);

const renderer = require('vue-server-renderer').createRenderer({
	template: require('fs').readFileSync('./templates/index.template.html', 'utf-8')
});

server.get('*', (req, res) => {
	let myName = "";
	for (let i = 0; i < 10; i++) {
		myName += myNameArr[i][uprandom()];
	}
	const context = { 
		url: req.url,
		hostname: myName
	};

	const vueIns = createApp(context);

	renderer.renderToString(vueIns, htmlContext, (err, html) => {
		console.log(html);
		res.end(html);
	});
});

server.listen(80);
