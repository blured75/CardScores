// Test of backbone methods

var Person = Backbone.Model.extend();  
var person = new Person();  
person.set({ fname: 'Bernard', lname:'Lermitte'});

var myVal = _.extend({name:'Welcome to my card management system'}, Backbone.Events); 
myVal.on('myFunc', function () {  
	document.write('The triggered value is: ');  
	document.write(this.name);  
});  

var myFunc = function () {  
	document.write('This is myFunc<br>');  
};

var myFunc1 = function () {  
	document.write('This is myFunc1<br>');  
};

myVal.on('log',myFunc);  
myVal.on('log',myFunc1);  

myVal.trigger('myFunc');

myVal.trigger('log');

var AppView = Backbone.View.extend ({
	el: '#container',
	
	initialize: function() {
		 this.render(); 
	},
	
	render: function() {
		 this.$el.html(person.get('fname') + ' ' + person.get('lname'));
	}
});
var appView = new AppView();

var MyModel = Backbone.Model.extend({ 
	defaults: {  
		id: 7070  
	},  
	
	initialize: function(){  
		 //
	}  
});  
var myModel = new MyModel();
myModel.set('name', 'RummyCube Dovenfleet');
myModel.set('players', ['moi', 'toi', 'soi']);

document.write(myModel.get('name') + '<br>' + myModel.get('players') + '<br>');

myModel = new MyModel({name: 'a name', players: ['one', 'two', 'three']});

document.write(myModel.get('name') + '<br>' + myModel.get('players') + '<br>');

myModel.set('name', '<b>truc</b>');

document.write(myModel.escape('name') + '<br>');
document.write(myModel.get('name') + '<br>');

if (myModel.has('machin')) {
	document.write('myModel.machin exists' + '<br>');
}	
else {
	document.write('myModel.machin does not exists' + '<br>')
}

myModel.set('machin', 'valeur');

document.write('myModel.machin set ' + myModel.get('machin') + '<br>');
myModel.unset('machin');
document.write('myModel.machin après unset ' + myModel.get('machin') + '<br>');

document.write("<b>Before using clear, name: </b>", myModel.get('name') + '<br>');  
document.write("<b>Before using clear, id: </b>", myModel.get('id') + '<br>');  
document.write("<br>");  
myModel.clear();  
document.write("<b>After using clear, name:</b> ", myModel.get('name') + '<br>');  
document.write("<b>After using clear, id: </b>", myModel.get('id') + '<br>');  

myModel.set('name', 'foo');
myModel.set('id', 7070);
document.write('cid -> ', myModel.cid + '<br>');


