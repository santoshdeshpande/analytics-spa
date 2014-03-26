/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../typings/local.d.ts" />
var page = require("./support/pageObject");

describe('dejalytics homepage', function () {
    it('list a few phones', function () {
        page.visit('/');

        element(by.model('query')).sendKeys('Moto');
    });
});
//# sourceMappingURL=homepageSpec.js.map
