// backend/services/notification.service.js
const cron = require("node-cron");
const { sendEmail } = require("./email.service");
const { sendSMS } = require("./sms.service");

// Run every day at 8 AM
cron.schedule("0 8 * * *", async () => {
  const appointments = await Appointment.findAll({
    where: {
      date: {
        [Op.between]: [
          new Date(),
          new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        ],
      },
    },
    include: [User],
  });

  appointments.forEach((appointment) => {
    sendEmail(
      appointment.User.email,
      "Appointment Reminder",
      `Your appointment is scheduled for ${appointment.date}`
    );
    sendSMS(
      appointment.User.phone,
      `NAFSI Reminder: Appointment at ${appointment.date}`
    );
  });
});
// backend/routes/appointment.routes.js
