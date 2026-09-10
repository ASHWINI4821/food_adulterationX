\import express from "express";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {
    res.json({
        message: "FoodGuard AI Backend is running",
        status: "success",
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        service: "foodguard-ai-backend",
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`FoodGuard AI Backend running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});