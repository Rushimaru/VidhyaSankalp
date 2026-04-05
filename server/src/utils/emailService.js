import nodemailer from 'nodemailer';

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendWelcomeEmail = async ({ to, name, role, password, institutionName }) => {
  if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'your-email@gmail.com') {
    console.log(`[Email skip] Welcome email for ${to} — configure EMAIL_USER in .env`);
    return;
  }
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"VidhyaSankalp" <${process.env.EMAIL_USER}>`,
      to,
      subject: `Welcome to VidhyaSankalp — Your ${role} account is ready`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#0A51CE">Welcome to VidhyaSankalp!</h2>
          <p>Hello <strong>${name}</strong>,</p>
          <p>Your <strong>${role}</strong> account for <strong>${institutionName || 'VidhyaSankalp'}</strong> has been created.</p>
          <div style="background:#f4f7ff;border-radius:8px;padding:16px;margin:16px 0">
            <p><strong>Email:</strong> ${to}</p>
            <p><strong>Temporary Password:</strong> ${password}</p>
          </div>
          <p style="color:#e74c3c">Please change your password after first login.</p>
          <p>Login at: <a href="${process.env.CLIENT_URL}">${process.env.CLIENT_URL}</a></p>
        </div>`,
    });
  } catch (err) {
    console.error('[Email error]', err.message);
  }
};

export const sendSubscriptionAlert = async ({ to, institutionName, daysLeft }) => {
  if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'your-email@gmail.com') {
    console.log(`[Email skip] Subscription alert for ${to}`);
    return;
  }
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"VidhyaSankalp" <${process.env.EMAIL_USER}>`,
      to,
      subject: `Subscription expiring in ${daysLeft} days — ${institutionName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#e74c3c">Subscription Expiry Alert</h2>
          <p>Your subscription for <strong>${institutionName}</strong> expires in <strong>${daysLeft} days</strong>.</p>
          <p>Please contact your administrator to renew the subscription and avoid service interruption.</p>
        </div>`,
    });
  } catch (err) {
    console.error('[Email error]', err.message);
  }
};
