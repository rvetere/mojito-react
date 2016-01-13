require('./component.scss');

var component = require('./component');
var app = document.createElement('div');
document.body.appendChild(app);
app.appendChild(component());