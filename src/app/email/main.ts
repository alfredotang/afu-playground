import nodemailer from 'nodemailer'
import fs from 'node:fs'
import path from 'node:path'
import { ROOT } from '@/src/constants/path'
import logger from '@/src/libs/logger'

const sender = 'alfredo.t@gmicloud.ai'

const htmlContent = fs.readFileSync(
  path.join(ROOT, 'src/app/email/templates/email.html'),
  'utf-8'
)

const mailOptions = {
  from: sender,
  to: 'asdzxcca0617@gmail.com',
  subject: '測試 Email 樣式',
  html: htmlContent,
}

nodemailer.createTestAccount((err, account) => {
  if (err) throw err

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: account.user, // 自動生成的用戶名
      pass: account.pass, // 自動生成的密碼
    },
  })

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error(error)
      return
    }

    logger.success(nodemailer.getTestMessageUrl(info))
  })
})
