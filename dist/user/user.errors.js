"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.missingParamsError = (...params) => ({
    status: 400,
    error: new TypeError(`Required Parameter ${params.map(param => `"${param}"`).join(', ')} is missing`)
});
exports.notFoundError = (msg) => ({
    status: 400,
    error: new Error(msg)
});
//# sourceMappingURL=user.errors.js.map