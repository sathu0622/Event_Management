const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require('nodemailer');

require('dotenv').config();
// Register 
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ name, email, password: hashedPassword, phone, role });
    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Register 
exports.registerOrganizer = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ name, email, password:hashedPassword, phone, role });
    await user.save();

    res.status(201).json({ msg: "User registered successfully" });


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EAMIL_PASS
        }
      });

      var mailOptions = {
        from: process.env.EMAIL_USER, 
        to: email, 
        subject: `Welcome to Eventify - Your Organizer Account Details`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #2c3e50;">Hello ${name},</h2>
                <p>Welcome to <strong>Eventify</strong>! You have been registered as an event organizer on our platform.</p>
                <p>Here are your login credentials:</p>
                <div style="background: #f4f4f4; padding: 10px; border-radius: 5px;">
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Password:</strong> ${password}</p>
                </div>
                <p>To get started, log in to your Eventify account and set up your events.</p>
                <p><strong>For security reasons, please change your password after your first login.</strong></p>
                <p>If you have any questions or need assistance, feel free to contact our support team.</p>
                <br>
                <p>Best regards,</p>
                <p><strong>Eventify Team</strong></p>
            </div>
        `
    };
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'error', message: 'Email not sent' });
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json({ status: 'success', message: 'Email sent successfully' });
        }
      });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login 
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      firstLogin: user.role === "organizer" ? user.firstLogin: false,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUser = async (req,res)=>{
try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getUserId = async (req,res)=>{
  try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(organizer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  
  exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.params.id;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ msg: "Both old and new passwords are required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Old password is incorrect" });
        }

        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
            return res.status(400).json({ msg: "New password must be different from the old password" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12); // Increased rounds for better security
        user.password = hashedPassword;

        // Only update `firstLogin` if the user is an organizer
        if (user.role === "organizer") {
            user.firstLogin = false;
        }

        await user.save();

        return res.status(200).json({ msg: "Password changed successfully" });
    } catch (error) {
        console.error("Error changing password:", error);
        return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
};
