/* global
 define: false,
 console: false
 */
define([
    'lodash',
    '../../constants'
], function (_, Constants) {
    'use strict';

    function controller($state, $scope, Augur, FactTable, FlashMessages, Habitat) {

        $scope.habitats = [];
        $scope.currentStep = 1;

        Habitat.query(function (habitats) {
            $scope.habitats = habitats;
        });

        $scope.validSteps = {
            one: false, two: false, three: false, four: false
        };


        $scope.normalizationTypes = [
            {key:"do_nothing", label: "Do Nothing", helpText:''},
            {key:"feature_scaling", label: "Feature Scaling", helpText:'Feature Scaling will bring all values into the range 0.1'},
            {key:"student-tstatic", label: "Student's t-statistic", helpText:'Normalizing residuals when population parameters are unknown (estimated)'}
        ];

        $scope.augur = {
            name: '',
            augurType: 'clustering',
            habitat: '',
            missingValueTreatment: 'mean_value',
            fixedValue: '',
            normalizationMethod: 'feature_scaling',
            numberOfClusters: '',
            numberOfIterations: '',
            schedule: {
                frequency: 'daily',
                timeOfDay: '02:00 AM',
                dayOfWeek: 'wednesday',
                dayOfMonth: 1
            }
        };

        var validateStepOne = function () {
            $scope.validSteps.one =  false;
            var name = $scope.augur.name || "";
            var habitat = $scope.augur.habitat || "";
            if (($scope.habitats && $scope.habitats.indexOf(habitat) > -1) && ((name).length > 0)) {
                console.log($scope.augur);
                $scope.validSteps.one = true;
            }

        };

        var validateStepTwo = function() {
          $scope.validSteps.two = false;
            var type = $scope.augur.missingValueTreatment;
            var value = $scope.augur.fixedValue || "";
            if(type.length > 0) {
                if((type == 'fixed_value' && value.length > 0) || type == 'mean_value' || type == 'ignore_value') {
                    $scope.validSteps.two = true;
                }
            }
        };

        var validateStepThree = function() {
            console.log($scope.augur);
            $scope.validSteps.three = false;
            var value = $scope.augur.normalizationMethod || "";
            if(value.length > 0) {
                console.log($scope.augur);
                $scope.validSteps.three = true;
            }
        };

        var _inValidRange = function(inputValue) {
            return inputValue && inputValue >= 1 && inputValue <= 999;
        };

        var validateStepFour = function() {
            var numClusters = $scope.augur.numberOfClusters || 0;
            var numIterations = $scope.augur.numberOfIterations || 0;

            $scope.validSteps.four = _inValidRange(numClusters) && _inValidRange(numIterations);
        };

        $scope.submit = function() {
            var augurNewAttributes = _.pick($scope.augur, ['name', 'augurType','missingValueTreatment','fixedValue','normalizationMethod','numberOfClusters','numberOfIterations']);
            augurNewAttributes.schedule = $scope.augur.schedule;
            console.log(augurNewAttributes);
            Augur.save({habitatId: $scope.augur.habitat.id},{augur: augurNewAttributes}, function(augur){
                FlashMessages.setMessage('Augur ' + augur.name + ' has been created.');
                $state.transitionTo('dashboard');
            }, function(httpResponse){
                console.log("There was an error saving the new Augur  ", httpResponse);
            });

        };
        $scope.$watchCollection('[augur.name, augur.habitat]', validateStepOne);
        $scope.$watchCollection('[augur.missingValueTreatment, augur.fixedValue]', validateStepTwo);
        $scope.$watchCollection('[augur.normalizationMethod]', validateStepThree);
        $scope.$watchCollection('[augur.numberOfClusters, augur.numberOfIterations]', validateStepFour);
    }

    return  ['$state', '$scope', 'Augur', 'FactTable', 'FlashMessages', 'Habitat', controller]
});