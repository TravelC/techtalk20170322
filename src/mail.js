//@flow

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: "smtp.aliyun.com",
  port: 25,
  secureConnection: true,
  auth: {
    user: process.env.MAIL_ACCOUNT,
    pass: process.env.MAIL_PASSWORD
  }
})

export default transporter
