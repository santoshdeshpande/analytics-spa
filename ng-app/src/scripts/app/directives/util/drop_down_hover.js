/* global
 define: false,
 console: false
 */

define([
], function () {
    'use strict';

    function directive($document, $location, $position) {
        var openElement = null,
            closeMenu   = angular.noop;
        return {
            restrict: 'CA',
            scope: {
                dropdownHover: '@'
            },
            link: function (scope, element, attrs) {
                var dropdown = angular.element($document[0].querySelector(scope.dropdownHover));

                scope.$watch('$location.path', function () {
                    closeMenu();
                });
                dropdown.css('display', 'none').bind('click', function () {
                    closeMenu();
                });
                element.bind('mouseenter', function (event) {
                    console.log("Mouse entered...");
                    var elementWasOpen = (element === openElement);

                    event.preventDefault();
                    event.stopPropagation();

                    if (!elementWasOpen && !element.hasClass('disabled') && !element.prop('disabled')) {
                        dropdown.css('display', 'block');

                        var offset = $position.offset(element);
                        var parentOffset = $position.offset(angular.element(dropdown[0].offsetParent));

                        dropdown.css({
                            left: offset.left - parentOffset.left + 'px',
                            top: offset.top - parentOffset.top + offset.height + 'px'
                        });

                        openElement = element;
                        closeMenu = function (event) {
                            if (event) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                            $document.unbind('click', closeMenu);
                            dropdown.css('display', 'none');
                            closeMenu = angular.noop;
                            openElement = null;
                        };
                        $document.bind('mouseleave', closeMenu);
                        $document.bind('click', closeMenu);
                    }
                });
            }
        };
    }

    return ['$document', '$location', '$position', directive];
});