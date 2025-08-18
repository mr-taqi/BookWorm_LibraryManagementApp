import cron from "node-cron";
import { User } from "../models/userModle.js";

export const removeUnverifiedAccounts = () => {
    cron.schedule(" */10  * * * * ", async () => {
        const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
        await User.deleteMany({
            accountVerified: false,
            createdAt: { $lt: thirtyMinutesAgo },
        });
    });
}