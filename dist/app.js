"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // ⬅️ MUST be first
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
// =====================
// Global Middlewares
// =====================
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "http://localhost:5173"
    ],
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// =====================
// Routes
// =====================
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// =====================
// Global Error Handler (VERY IMPORTANT)
// =====================
app.use((err, req, res, next) => {
    // If response already sent, delegate to default Express handler
    if (res.headersSent) {
        return next(err);
    }
    console.error("Global Error:", err);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});
// not found
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Not Found",
    });
});
exports.default = app;
