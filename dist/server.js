"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const seedAdmin_1 = __importDefault(require("./utils/seedAdmin"));
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.log(error);
    }
};
(async () => {
    await startServer();
    await (0, seedAdmin_1.default)();
})();
app_1.default.listen(PORT, () => {
    console.log(`🚀 Server running on port http://localhost:${PORT}`);
});
