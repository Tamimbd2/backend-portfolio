import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import mongoose from "mongoose";
import seedAdmin from "./utils/seedAdmin";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}

(async () => {
    await startServer();
    await seedAdmin();
})();


app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

