import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.use(express.static(path.join(__dirname, '../dist')));

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            error: 'Name, email, and message are required'
        });
    }

    // Format the email content
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'brandondjonescareer@gmail.com',
        subject: `Portfolio Contact Form: Message from ${name}`,
        text: `
Someone Reached Out to You!
============================

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}

============================
This email was sent from your portfolio contact form.
    `.trim(),
        html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0f172a; border-radius: 12px;">
        <h2 style="color: #f1f5f9; border-bottom: 3px solid #a78bfa; padding-bottom: 12px; margin: 0 0 20px 0;">
          Someone Reached Out to You!
        </h2>
        
        <div style="background-color: #1e293b; padding: 24px; border-radius: 10px; margin-top: 20px; border: 1px solid #334155;">
          <p style="margin: 12px 0;">
            <strong style="color: #a78bfa;">Name:</strong> 
            <span style="color: #f1f5f9; margin-left: 8px;">${name}</span>
          </p>
          
          <p style="margin: 12px 0;">
            <strong style="color: #a78bfa;">Email:</strong> 
            <a href="mailto:${email}" style="color: #22d3ee; margin-left: 8px; text-decoration: none;">${email}</a>
          </p>
          
          <p style="margin: 12px 0;">
            <strong style="color: #a78bfa;">Phone:</strong> 
            <span style="color: #f1f5f9; margin-left: 8px;">${phone || 'Not provided'}</span>
          </p>
          
          <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #334155;">
            <strong style="color: #a78bfa;">Message:</strong>
            <p style="color: #f1f5f9; line-height: 1.7; white-space: pre-wrap; background-color: #0f172a; padding: 16px; border-radius: 8px; margin-top: 12px; border-left: 3px solid #22d3ee;">
              ${message}
            </p>
          </div>
        </div>
        
        <p style="color: #64748b; font-size: 12px; margin-top: 24px; text-align: center;">
          This email was sent from your portfolio contact form.
        </p>
      </div>
    `,
        replyTo: email, // So you can reply directly to the sender
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully from ${name} (${email})`);
        res.json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to send email. Please try again later.'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
