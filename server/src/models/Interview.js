const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        role: {
            type: String,
            required: true,
            trim: true
        },

        experience: {
            type: String,
            required: true
        },

        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            default: "Medium"
        },
        
        interviewType: {
            type: String,
            enum: ["Technical", "HR", "Behavioral", "Mixed"],
            required: true
        },

        totalQuestions: {
            type: Number,
            default: 10,
            min: 1,
            max: 30
        }
    },
    {
        timestamps: true
    }
);

const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;