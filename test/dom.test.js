const assert = require('assert');
const $ = require("../src/component/dom");
const { EasyDom } = require("../src/component/dom");

describe("easy dom", function() {
    describe("init a dom", function(){
        it("should return an error if no arguments", function(done) {
            try {
                const div = $();
            } catch (err) {
                assert.strictEqual(err.message, "selector is required");
                done();
            }
        });
    });
});
