const InterviewReport = require("../models/InterviewReport");
const InterviewSession = require("../models/InterviewSession");

// Generate interview report
const generateReport = async (req, res) => {
    try {
        const { sessionId } = req.body;

        if (!sessionId) {
            return res.status(400).json({
                success: false,
                message: "Session ID is required"
            });
        }

        const session = await InterviewSession.findOne({
            _id: sessionId,
            user: req.user._id
        });

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Interview session not found"
            });
        }

        if (session.status !== "completed") {
            return res.status(400).json({
                success: false,
                message: "Complete the interview before generating a report"
            });
        }

        const totalQuestions = session.questions.length;

        const answeredQuestions = session.questions.filter(
            (question) => String(question.answerText || "").trim() !== ""
        ).length;
        if (answeredQuestions === 0) {
            return res.status(400).json({
                success: false,
                message: "Cannot generate a report without any answered questions."
            });
        }
        
        // Check if report already exists
        const existingReport = await InterviewReport.findOne({
            session: session._id,
            user: req.user._id
        });
        
        if (existingReport) {
            return res.status(200).json({
                success: true,
                message: "Interview report already exists",
                report: existingReport
            });
        }
        
        // Temporary scores until AI evaluation is integrated
        const report = await InterviewReport.create({
            session: session._id,
            user: req.user._id,
            totalQuestions,
            answeredQuestions,
            overallScore: 0,
            technicalScore: 0,
            communicationScore: 0,
            strengths: [],
            improvements: [],
            feedback: "Your interview has been completed. Detailed AI evaluation will be available soon."
        });

        return res.status(201).json({
            success: true,
            message: "Interview report generated successfully",
            report
        });

    } catch (error) {
        console.error("Generate report error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Error generating interview report"
        });
    }
};

// Get interview report
const getMyReport = async (req, res) => {
    try {
        const { sessionId } = req.params;

        const report = await InterviewReport.findOne({
            session: sessionId,
            user: req.user._id
        }).populate("session");

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Interview report not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Interview report fetched successfully",
            report
        });

    } catch (error) {
        console.error("Get report error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Error fetching interview report"
        });
    }
};
// Get all reports of logged-in user
const getAllMyReports = async (req, res) => {
    try {
        const reports = await InterviewReport.find({
            user: req.user._id
        })
            .populate("session")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: reports.length,
            reports
        });

    } catch (error) {
        console.error("Get all reports error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Error fetching interview reports"
        });
    }
};
module.exports = {
    generateReport,
    getMyReport,
    getAllMyReports
};