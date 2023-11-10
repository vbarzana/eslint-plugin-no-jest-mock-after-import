"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
var Lint = __importStar(require("tslint"));
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoJestMockAfterImportWalker(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_STRING = 'jest.mock should be placed before any import statements';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoJestMockAfterImportWalker = /** @class */ (function (_super) {
    __extends(NoJestMockAfterImportWalker, _super);
    function NoJestMockAfterImportWalker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.importStatementFound = false;
        return _this;
    }
    NoJestMockAfterImportWalker.prototype.visitImportDeclaration = function (node) {
        this.importStatementFound = true;
        _super.prototype.visitImportDeclaration.call(this, node);
    };
    NoJestMockAfterImportWalker.prototype.visitCallExpression = function (node) {
        if (this.importStatementFound && node.expression.getText() === 'jest.mock') {
            this.addFailureAtNode(node, Rule.FAILURE_STRING);
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    return NoJestMockAfterImportWalker;
}(Lint.RuleWalker));
