const mongoose = require("mongoose");

const interviewReportSchema = new mongoose.Schema(
    {
        session: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "InterviewSession",
            required: true,
            unique: true
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        totalQuestions: {
            type: Number,
            default: 0
        },

        answeredQuestions: {
            type: Number,
            default: 0
        },

        overallScore: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },

        technicalScore: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },

        communicationScore: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },

        strengths: [{
            type: String
        }],

        improvements: [{
            type: String
        }],

        feedback: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

const InterviewReport = mongoose.model(
    "InterviewReport",
    interviewReportSchema
);

module.exports = InterviewReport;