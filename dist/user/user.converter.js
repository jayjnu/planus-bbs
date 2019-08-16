"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const R = __importStar(require("ramda"));
exports.extractBodyParamsToDBQuery = ({ user_name, user_id, user_pw, user_email }) => ({
    user_name,
    user_id,
    user_pw,
    user_email
});
exports.mapDBEntityToResponse = (status) => (res) => ({
    status,
    user: exports.mapDBEntityToUser(res.user)
});
exports.mapDBEntityToUser = R.pipe(R.defaultTo({}), R.pick(['user_id', 'user_email', 'user_name']), (publicUser) => ({
    id: publicUser.user_id,
    email: publicUser.user_email,
    name: publicUser.user_name
}), R.pick(['id', 'email', 'name']));
//# sourceMappingURL=user.converter.js.map