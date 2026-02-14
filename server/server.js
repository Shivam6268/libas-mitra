import express from "express";
import dotenv from "dotenv";
import path from 'path'
import { fileURLToPath } from 'url'
import connectDb from "./config/authConfig.js";
import authRouter from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import orderRouter from "./routes/orderRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import couponRouter from "./routes/couponRoutes.js";
import virtulTryRouter from "./routes/virtualTryRoutes.js";



dotenv.config();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();
const PORT = process.env.PORT || 3000;


connectDb()

app.use(express.json());
app.use(express.urlencoded());

// auth routes
app.use("/api/auth", authRouter);
// order routes
app.use("/api/order", orderRouter);
// admin routes
app.use("/api/admin", adminRouter);
// product routes
app.use("/api/products", productRouter);
// cart routes
app.use("/api/cart", cartRouter);
// coupan routes
app.use("/api/coupon", couponRouter);
// virtual Try
app.use("/api/virtual_try", virtulTryRouter)




// 4. Correct Path Resolution for Nested Folders
// Since this file is in /server, we go UP one level to reach the root, then into /client/dist
const buildPath = path.resolve(__dirname, '../client/dist');

// 5. Static File Serving & SPA Routing
if (process.env.NODE_ENV === "production") {
    // Serve static files from the build directory
    app.use(express.static(buildPath));

    // Express v5 requires a named parameter for wildcards (/*splat)
    app.get('/*splat', (req, res) => {
        res.sendFile(path.join(buildPath, 'index.html'), (err) => {
            if (err) {
                // If index.html is missing, this provides a clearer error
                res.status(500).send("Build file index.html not found. Ensure you ran 'npm run build' in the client folder.");
            }
        });
    });
} else {
    app.get("/", (req, res) => {
        res.send("API is running... (Development Mode)");
    });
}


// error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
