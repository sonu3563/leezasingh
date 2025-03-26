const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "parasjaswal055@gmail.com", 
        pass: "rnmk iepq nvgr dngd",
    },
});

const sendEmail = async (to, subject, htmlContent) => {
    try {
        const info = await transporter.sendMail({
            from: `"Your App Name" <parasjaswal055@gmail.com>`,
            to,
            subject,
            html: htmlContent,
        });

        console.log("Email sent: ", info.response);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};

module.exports = sendEmail;
