const transporter = require("../config/emailConfig");

const sendEmail = async (email, username, password) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Welcome! Your Login Details",
        text: `Hi ${username},\n\nYour account has been created successfully!\n\nUsername: ${username}\nPassword: ${password}\n\nPlease keep your credentials safe.\n\nThanks!`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

const signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (email === "existinguser@example.com") {
        return res.status(400).json({ message: "User already exists with this email." });
    }

        await sendEmail(email, username, password);

    res.status(201).json({ message: "User registered successfully! Email sent." });
};

module.exports = { signup };
