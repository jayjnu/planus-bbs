"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fakeDb = {};
exports.default = {
    find: (query) => Promise.resolve({ status: 'success', user: fakeDb[query.user_id] }),
    add: (query) => {
        fakeDb[query.user_id] = query;
        return Promise.resolve({ status: 'success', user: query });
    },
    update: (query) => {
        const userEntity = fakeDb[query.user_id];
        if (!userEntity) {
            return Promise.reject(new Error('user not found. abort update'));
        }
        Object.assign(userEntity, query);
        return Promise.resolve({ status: 'success', user: query });
    }
};
//# sourceMappingURL=user.model.js.map