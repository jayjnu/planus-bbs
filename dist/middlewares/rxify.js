"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
function rexify(options) {
    return (req, res, next) => {
        req.query$ = rxjs_1.of(req.query).pipe(operators_1.first());
        req.body$ = rxjs_1.of(req.body).pipe(operators_1.first());
        next();
    };
}
exports.default = rexify;
//# sourceMappingURL=rxify.js.map