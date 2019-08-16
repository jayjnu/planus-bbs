"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rxify_1 = __importDefault(require("./middlewares/rxify"));
const user_1 = __importDefault(require("./routes/user"));
const morgan_1 = __importDefault(require("morgan"));
const app = express_1.default();
// register middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(rxify_1.default());
app.use(morgan_1.default('combined'));
// map routes
app.use('/user', user_1.default());
app.get('/', (req, res) => {
    res.json({ type: 'hello' });
});
app.use(((err, req, res, next) => {
    if (err.error) {
        res.status(err.status);
        res.json({
            status: err.status,
            error: err.error.message
        });
    }
    else {
        res.json(err);
    }
}));
exports.default = app;
//# sourceMappingURL=app.js.map