import dotenv from "dotenv";
dotenv.config(); // ⬅️ MUST be first
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./routes";


const app: Application = express();

// =====================
// Global Middlewares
// =====================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================
// Routes
// =====================
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

// =====================
// Global Error Handler (VERY IMPORTANT)
// =====================
app.use(
    (err: any, req: Request, res: Response, next: NextFunction) => {
        // If response already sent, delegate to default Express handler
        if (res.headersSent) {
            return next(err);
        }

        console.error("Global Error:", err);

        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    }
);

// not found
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Not Found",
    });
})

export default app;
