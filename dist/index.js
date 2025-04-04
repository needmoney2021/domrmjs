"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOMRMBuilder = exports.DOMRM = void 0;
var jquery_1 = __importDefault(require("jquery"));
var DOMRM = /** @class */ (function () {
    function DOMRM() {
    }
    DOMRM.from = function (element) {
        return new DOMRMBuilder(element);
    };
    return DOMRM;
}());
exports.DOMRM = DOMRM;
var DOMRMBuilder = /** @class */ (function () {
    function DOMRMBuilder(element) {
        this.data = {};
        this.$element = (0, jquery_1.default)(element);
    }
    DOMRMBuilder.prototype.closest = function (selector) {
        this.$element = this.$element.closest(selector);
        return this;
    };
    DOMRMBuilder.prototype.find = function (selector) {
        this.$element = this.$element.find(selector);
        return this;
    };
    DOMRMBuilder.prototype.valAs = function (key) {
        this.data[key] = this.$element.val();
        return this;
    };
    DOMRMBuilder.prototype.valAsNum = function (key) {
        var val = this.$element.val();
        this.data[key] = typeof val === "string" ? parseFloat(val) : Number(val);
        return this;
    };
    DOMRMBuilder.prototype.textAs = function (key) {
        this.data[key] = this.$element.text().trim();
        return this;
    };
    DOMRMBuilder.prototype.attrAs = function (key) {
        this.data[key] = this.$element.attr(key);
        return this;
    };
    DOMRMBuilder.prototype.custom = function (key, fn) {
        this.data[key] = fn(this.$element);
        return this;
    };
    DOMRMBuilder.prototype.build = function () {
        return this.data;
    };
    return DOMRMBuilder;
}());
exports.DOMRMBuilder = DOMRMBuilder;
