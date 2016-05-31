/**
 * @requires ../../bower_components/jquery/dist/jquery.min.js
 * @requires ../../bower_components/angular/angular.min.js
 * @requires ../../bower_components/angular-sanitize/angular-sanitize.min.js
 * @requires ../../bower_components/angular-route/angular-route.min.js
 */

(function($, window, undefined) {
	
	'use strict';

	/* Really Simple Resume App */

	window.rsrApp = angular
		.module('rsrApp', [
			'ngSanitize',
			'ngRoute',
			'rsrApp.controllers',
			'rsrApp.services'
		])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.otherwise({redirectTo: '/'});
		}]);
	
	window.angular.element(document).ready(function() {
		var $body = $('body');
		$body.addClass('html-loaded');
	});

}(jQuery, window, undefined));
