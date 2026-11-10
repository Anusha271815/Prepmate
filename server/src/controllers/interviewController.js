
const Interview = require("../models/Interview");

// Create a new interview
const createInterview = async (req, res) => {
    try {
        const {
            role,
            experience,
            difficulty,
            interviewType,
            totalQuestions
        } = req.body;

        // Validate required fields
        if (!role || !experience || !interviewType) {
            return res.status(400).json({
                success: false,
                message: "Please provide role, experience and interview type"
            });
        }

        // Save interview in MongoDB
        const interview = await Interview.create({
            user: req.user._id,
            role,
            experience,
            difficulty,
            interviewType,
            totalQuestions
        });

        // Send success response
        return res.status(201).json({
            success: true,
            message: "Interview created successfully",
            interview
        });

    } catch (error) {
        console.error("Create interview error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Error creating interview"
        });
    }
};
// Get all interviews of logged-in user
const getMyInterviews = async (req, res) => {
    try {
        const interviews = await Interview.find({
            user: req.user._id
        }).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            count: interviews.length,
            interviews
        });
    } catch (error) {
        console.error("Fetch interviews error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Error fetching interviews"
        });
    }
};

// Get single interview by ID
const getInterviewById = async (req, res) => {
    try {
        const interview = await Interview.findOne({
            _id: req.params.id,
            user: req.user._id
        });
        if (!interview) {
            return res.status(404).json({
                success: false,
                message: "Interview not found"
            });
        }
        return res.status(200).json({
            success: true,
            interview
        });
    } catch (error) {
        console.error("Fetch interview error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Error fetching interview"
        });
    }
};
module.exports = { createInterview, getMyInterviews , getInterviewById };
