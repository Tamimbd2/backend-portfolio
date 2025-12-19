import app from "./app";
import mongoose from "mongoose";

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL as string)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log(error);
    });

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
