/**
 * @requires ../../bower_components/jquery/dist/jquery.min.js
 * @requires ../../bower_components/angular/angular.min.js
 * @requires ../../bower_components/angular-sanitize/angular-sanitize.min.js
 */

(function ($, window, undefined) {
	
	"use strict";

	var app = angular.module('spaResumeApp', ['ngSanitize']);
	
	// HEADER

	app.controller('headerController', function($scope, $http) {
		$scope.title = 'John Doe';
		$scope.title_seo = 'John Doe Resumé';
		$scope.tagline = 'Web Developer';
		$scope.url = 'http://www.johndoe.com/';
			
		$scope.person = {
			firstname: 'John',
			lastname: 'Doe'
		};
		
		$scope.image = {
			url: '../images/john-doe.jpg',
			width: '294',
			height: '294'
		};
	});

	// FOOTER
	
	app.controller('footerController', function($scope, $http) {
		$scope.linkedin = {
			url: 'https://www.linkedin.com/in/johndoe',
			title: 'LinkedIn John Doe',
			label: 'LinkedIn'
		};

		$scope.email = {
			url: 'mailto:johndoe@johndoe.com',
			title: 'E-mail John Doe',
			label: 'johndoe@johndoe.com'
		};

		$scope.phone = {
			url: 'tel:001122223333',
			title: 'Phone John Doe',
			label: '+001122223333'
		};

		$scope.copyright = 'Website made using NPM, Bower, Gulp, AngularJS, Bootstrap, Sass, Prerender.io and <3';
	});

	// HOME PAGE
	
	app.controller('homeController', function($scope, $http) {
		// ABOUT
		
		$scope.about_title = 'About me';
		
		$scope.about_text =  '<p>Lorem ipsum dolor sit amet, splendide sententiae adipiscing ne sea. Te vis falli tantas timeam, nec eu vero impetus senserit. Te eum bonorum accusata sapientem. Vix utinam tempor discere eu, invenire rationibus qui eu, inimicus suscipiantur est ex.</p>'+
						'<p>Exerci consul eleifend est an. Mei perfecto petentium contentiones ei. Per in prima semper doctus, et nam partem expetendis, ex justo partem mel. Ut mazim commodo est. Qui reque altera phaedrum cu. Atqui ubique eum no, cu aperiri vivendum pro.</p>'+
						'<p>Ad amet harum consectetuer duo, at sit lobortis comprehensam. Vim eu solet aliquando similique, idque assum suscipit pri ne, usu ei aliquid accusata. Saepe admodum minimum sit te, sint fastidii per et, at per audire scripta deleniti. Qui sanctus fierent at. Suas fierent antiopam has eu.</p>'+
						'<p>Natum vidisse quaeque id has, ne brute clita tincidunt nec, mollis admodum concludaturque ne per. Id nec tibique accusata democritum, at numquam ceteros eum. In his quaerendum omittantur comprehensam, eu pro quis affert. Sit eripuit habemus rationibus ex, ad iisque torquatos pri, mea an dico intellegam. At sea dicant detraxit perfecto, sea clita equidem vituperata cu. An sumo alterum vix, sea id iriure salutandi definitiones.</p>';

		// TECHNICAL

		$scope.technical_title = 'Relevant Skills';
		$scope.skills = [];

		$http.get('../jsons/skills.json').then(function(res) {
			$scope.skills = res.data;
		});

		// EXPERIENCE

		$scope.experience_title = 'Work Experience';
		$scope.experiences = [];

		$http.get('../jsons/experiences.json').then(function(res) {
			$scope.experiences = res.data;
		});

		// PORTFOLIO

		$scope.portfolio_title = 'Portfolio';
		$scope.projects = [];

		$http.get('../jsons/projects.json').then(function(res) {
			$scope.projects = res.data;
		});

		// EDUCATION

		$scope.education_title = 'Education';
		$scope.educations = [];

		$http.get('../jsons/educations.json').then(function(res) {
			$scope.educations = res.data;
		});
	});

	angular.element(document).ready(function() {
		var $body = $('body');
		$body.addClass('html-loaded');
	});

}(jQuery, window, undefined));
