(function(window, undefined) {
	
	'use strict';

	/* Services */

	window.angular
		.module('rsrApp.services', []).

		/* Root Details Service */
		
		factory('rootService', function($http) {
			var rootService = {};

			rootService.getRootData = function() {
				return $http({
					url: '../json/root.json'
				});
			}

			return rootService;
		}).

		/* About Service */
		
		factory('aboutService', function($http) {
			var aboutService = {};

			aboutService.getAboutData = function() {
				return $http({
					url: '../json/about.json'
				});
			}

			return aboutService;
		}).

		/* Skills Service */
		
		factory('skillsService', function($http) {
			var skillsService = {};

			skillsService.getSkillsData = function() {
				return $http({
					url: '../json/skills.json'
				});
			}

			return skillsService;
		}).

		/* Experiences Service */
		
		factory('experiencesService', function($http) {
			var experiencesService = {};

			experiencesService.getExperiencesData = function() {
				return $http({
					url: '../json/experiences.json'
				});
			}

			return experiencesService;
		}).

		/* Projects Service */
		
		factory('projectsService', function($http) {
			var projectsService = {};

			projectsService.getProjectsData = function() {
				return $http({
					url: '../json/projects.json'
				});
			}

			return projectsService;
		}).

		/* Educations Service */
		
		factory('educationsService', function($http) {
			var educationsService = {};

			educationsService.getEducationsData = function() {
				return $http({
					url: '../json/educations.json'
				});
			}

			return educationsService;
		});

}(window, undefined));
