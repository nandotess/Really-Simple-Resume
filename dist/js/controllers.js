(function(window, undefined) {
	
	'use strict';

	/* Controllers */

	window.angular
		.module('rsrApp.controllers', []).

		/* Header Controller */

		controller('headerController', function($scope, rootService) {
			$scope.title = '';
			$scope.title_seo = '';
			$scope.tagline = '';
			$scope.url = '';
			$scope.person = {};

			rootService.getRootData().success(function(response) {
				$scope.title = response.title;
				$scope.title_seo = response.title_seo;
				$scope.tagline = response.tagline;
				$scope.url = response.url;
				$scope.person = response.person;
			});
		}).

		/* About Controller */

		controller('aboutController', function($scope, aboutService) {
			$scope.about_title = '';
			$scope.about_text = '';

			aboutService.getAboutData().success(function(response) {
				$scope.about_title = response.about_title;
				$scope.about_text = response.about_text;
			});
		}).

		/* Skills Controller */

		controller('skillsController', function($scope, skillsService) {
			$scope.skills_title = '';
			$scope.skills = [];

			skillsService.getSkillsData().success(function(response) {
				$scope.skills_title = response.skills_title;
				$scope.skills = response.skills;
			});
		}).

		/* Experiences Controller */

		controller('experiencesController', function($scope, experiencesService) {
			$scope.experiences_title = '';
			$scope.experiences = [];

			experiencesService.getExperiencesData().success(function(response) {
				$scope.experiences_title = response.experiences_title;
				$scope.experiences = response.experiences;
			});
		}).

		/* Projects Controller */

		controller('projectsController', function($scope, projectsService) {
			$scope.portfolio_title = '';
			$scope.projects = [];

			projectsService.getProjectsData().success(function(response) {
				$scope.portfolio_title = response.portfolio_title;
				$scope.projects = response.projects;
			});
		}).

		/* Educations Controller */

		controller('educationsController', function($scope, educationsService) {
			$scope.education_title = '';
			$scope.educations = [];

			educationsService.getEducationsData().success(function(response) {
				$scope.education_title = response.education_title;
				$scope.educations = response.educations;
			});
		}).

		/* Footer Controller */

		controller('footerController', function($scope, rootService) {
			$scope.external_links = [];
			$scope.copyright = '';

			rootService.getRootData().success(function(response) {
				$scope.external_links = response.external_links;
				$scope.copyright = response.copyright;
			});
		});

}(window, undefined));
