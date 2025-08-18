import cron from "node-cron";
import { Borrow } from "../models/borrowModel.js";
import User from "../models/userModle.js";
import { sendEmail } from "../utils/sendEmail.js";

export const notifyUsers = () => {
    cron.schedule(" */5 * * * * * ", async () => {
        try {
            const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
            const borrowers = await Borrow.find({
                dueDate: {
                    $lt: oneDayAgo,
                },
                returnDate: null,
                notified: false,
            });

            for (const elements of borrowers) {
                if (elements.user && elements.user.email) {
                    sendEmail({
                        email: elements.user.email,
                        subject: "Book Retrun Reminder-(BookWorm Library Mangement System).",
                        message: `Hello ${elements.user.name},

                        This is a friendly reminder that the book you borrowed from the library is due for return today. We kindly request you to return the book at the earliest possible to avoid additional charges.

                        Please note that for every hour past the due time, a late fee will be applied as per the library policy.

                        Thank you for your prompt cooperation.

                        -- 
                        This is an auto-generated message. Please do not reply to this email.`,
                    });

                    elements.notified = true;
                    await elements.save();
                }
            }
        } catch (error) {
            console.error("Unknown error occured while notifying the User...", error);
        }
    });
}