import express from "express"
import reviewController from "../controller/reviewController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", reviewController.getReviews)
router.get("/:rid",  reviewController.getReview)
router.post("/", authMiddleware.forAuthUser, reviewController.addReview)

export default router