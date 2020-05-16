//1 - Créer le model de l'objet que nous allons manipuler
var Tache = Backbone.Model.extend({
	defaults: {
			titre : 'Une tâche vide'
	}
});

//2 - Créer une collection pour manipuler les tâches
var collectionDeTaches = Backbone.Collection.extend({
	model: Tache
});

//3 - Créer la liste
//Il s'agit d'une vue, qui prend pour paramètre la collection de tâches
var List = Backbone.View.extend({
	tagName: 'ul', //Pour la création du conteneur de la liste : balise <ul>
	
	// Constructeur
	initialize: function() {
			this.model.bind('add', this.ajouteObjet, this); //Ici , on réécrit la fonction ajout du modèle
			//en la remplacant par celle déclarée plus bas dans la classe, puisque c'est ici que se verront
			//les ajouts
	},
	render: function() {
			return $(this.el);//Obligatoire sinon Vue non mise à jour!
	},
	//Méthode pour gérer l'ajout d'une nouvelle tâche
	ajouteObjet: function(notreObjet) {
			$(this.el).append(new Objet({
					model: notreObjet
			}).render());
	}
});

//4- Créer le formulaire
//Il s'agit de la zone de saisie de la nouvelle tâche
var Form = Backbone.View.extend({
	tagName: 'form', //balise <form>
	template: _.template('<label>Titre de la tâche</label><input name="titre" type="text" placeholder="Saissez le titre de la tâche"></input>'),
	initialize: function() {}, //Constructeur vide, car au chargement la liste est vide...
	render: function() {
			$(this.el).html(this.template()); //Affiche le template de l'input
			return $(this.el);//Obligatoire sinon vue non mise à jour!
	},
	events: {
			'submit': 'envoi' //Evènement par défaut pour détecter la touche entrée, et la méthode à appeler le cas échéant
	},
	envoi: function(e) {
			e.preventDefault(); //Méthode jQuery qui empêche l'appel direct de cette méthode (en fait l'action n'est pas exécutée)
			//Pour chaque ajout, on envoie tout au model
			var model = new Tache();
			_.each($(e.target).serializeArray(), function(value) {
					if (value.value !== '') {
							model.set(value.name, value.value);//Création d'une nouvelle tâche
					}
			});
			this.model.add(model); //puis on appelle la méthode "add", spécifiée dans la liste (List) déclarée précédemment
	}
});


//5 - La gestion des objets
// Pour rappel :
// Il s'agit d'éléments de type < li >
// On doit pouvoir les supprimer
var Objet = Backbone.View.extend({
	tagName: 'li',
	template: _.template('<%= Tache.titre %> <span id="Effacer">[Supprimer]</span>'),
	initialize: function() {
			//Constructeur vide
	},
	render: function() { //Méthode qui met en forme le message dans le template et le retourne pour affichage
			$(this.el).html(this.template({
					Tache: this.model.toJSON()
			}));
			return $(this.el);
	},
	events: { //Gestion des évènements particuliers
			'click #Effacer': 'laSuppression'
	},
	laSuppression: function() { //Fonction pour gérer la suppression
			var self = this;
			self.remove();
	}
});

var TableauDesTaches = Backbone.View.extend({
	// Le constructeur (à la création de la vue) :
	initialize: function() {
			this.views = {};
			//Cette vue comprend les deux objets nécessaires : list et form
			this.views.list = new List({model: this.model});
			this.views.form = new Form({model: this.model});
	},
	// Et la méthode render
	render: function() {
			$(this.el).append(this.views.list.render()); //Demande à la liste de se générer pour affichage
			$(this.el).append(this.views.form.render()); //Idem pour le formulaire
			return $(this.el); //Obligatoire sinon vue non mise à jour!
	}
});

$(function () {
	$('#ListeDeTaches').html(new TableauDesTaches({
			model: new collectionDeTaches()
	}).render());
});