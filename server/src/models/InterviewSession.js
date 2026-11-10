const mongoose = require("mongoose");

const interviewSessionSchema = new mongoose.Schema(
    {
        interview: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Interview",
            required: true
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        currentQuestion: {
            type: Number,
            default: 0
        },

        status: {
            type: String,
            enum: ["in-progress", "completed"],
            default: "in-progress"
        },

        questions: [
            {
                questionText: {
                    type: String,
                    required: true
                },

                answerText: {
                    type: String,
                    default: ""
                },

                answeredAt: {
                    type: Date
                }
            }
        ],

        startedAt: {
            type: Date,
            default: Date.now
        },

        completedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const InterviewSession = mongoose.model(
    "InterviewSession",
    interviewSessionSchema
);

module.exports = InterviewSession;