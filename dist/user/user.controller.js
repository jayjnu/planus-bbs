"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const type_1 = require("../utils/type");
const user_model_1 = __importDefault(require("./user.model"));
const user_errors_1 = require("./user.errors");
const converter = __importStar(require("./user.converter"));
var UserQueryParams;
(function (UserQueryParams) {
    UserQueryParams["userId"] = "user_id";
    UserQueryParams["userEmail"] = "user_email";
})(UserQueryParams || (UserQueryParams = {}));
const checkUserId = type_1.ifNill(() => rxjs_1.throwError(user_errors_1.missingParamsError(UserQueryParams.userId)), id => rxjs_1.of({ user_id: id }));
exports.getUser = (req, res, next) => {
    req.user$ = req.query$.pipe(operators_1.pluck(UserQueryParams.userId), operators_1.tap(id => console.log(id)), operators_1.mergeMap(checkUserId), operators_1.map(user_model_1.default.find), operators_1.flatMap(rxjs_1.from), operators_1.tap(data => {
        console.log(data);
    }), operators_1.map(converter.mapDBEntityToResponse(200)));
    next();
};
exports.addUser = (req, res, next) => {
    req.user$ = req.body$.pipe(operators_1.map(converter.extractBodyParamsToDBQuery), operators_1.map(user_model_1.default.add), operators_1.flatMap(rxjs_1.from), operators_1.map(converter.mapDBEntityToResponse(200)));
    next();
};
exports.updateUser = (req, res, next) => {
    req.user$ = req.body$.pipe(operators_1.map(converter.extractBodyParamsToDBQuery), operators_1.map(user_model_1.default.update), operators_1.flatMap(rxjs_1.from), operators_1.catchError(val => rxjs_1.throwError(user_errors_1.notFoundError(val))), operators_1.map(converter.mapDBEntityToResponse(200)));
    next();
};
//# sourceMappingURL=user.controller.js.map