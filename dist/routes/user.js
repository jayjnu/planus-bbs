"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller = __importStar(require("../user/user.controller"));
const pipeToJSON = (req, res, next) => {
    req.user$.subscribe(result => res.json(result), next);
};
function createRouter(routerOptions) {
    const router = express_1.Router();
    router.get('/', controller.getUser, pipeToJSON);
    router.post('/', controller.addUser, pipeToJSON);
    router.put('/', controller.updateUser, pipeToJSON);
    router.delete('/', (req, res, next) => { });
    return router;
}
exports.default = createRouter;
//# sourceMappingURL=user.js.map