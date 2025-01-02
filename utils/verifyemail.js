import nodemailer from "nodemailer"

export const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: Number(process.env.MAIL_PORT),
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        })

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            text: text,
        })
        // !remove it (for text only)
        console.log("Email Send")
    } catch {
        // !remove it (for text only)
        console.log("email not send")
        console.log(error)
    }
}