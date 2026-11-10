const User = require("../models/User");
const getMyProfile = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            user: req.user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching profile"
        });
    }
};

// Update user profile
const updateMyProfile = async (req, res) => {
    try {
        const { name, age, profileImage } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                name,
                age,
                profileImage
            },
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (error) {
        console.error("Profile update error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Error updating profile"
        });
    }
};
module.exports = { getMyProfile, updateMyProfile };
