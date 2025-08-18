import nodeMailer from "nodemailer";

export const sendEmail = async({ email, subject, message }) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        service: process.env.SMTP_SERVICE,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.MAIL,
        to: email,
        subject: subject,
        html: message,
    };

    await transporter.sendMail(mailOptions);
}