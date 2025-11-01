import { env } from "@/config/env";
import { logger } from "@/config/logger";
import Boom from "@hapi/boom";
import nodemailer, { type SendMailOptions } from "nodemailer";
import nodemailerExpressHandlebars from "nodemailer-express-handlebars";
import path from "path";

const viewsPath = path.join(__dirname, "../../public/views");

const handlebarsOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.join(viewsPath, "partials"),
    layoutsDir: path.join(viewsPath, "layouts"),
    defaultLayout: "main",
  },
  viewPath: viewsPath,
};

export async function sendMail(mailOptions: SendMailOptions) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.NODEMAILER_EMAIL,
      pass: env.NODEMAILER_PASS,
    },
    secure: true,
    tls: {
      rejectUnauthorized: false,
    },
  });

  const transporterWithExpressHandlebars = transporter.use(
    "compile",
    nodemailerExpressHandlebars(handlebarsOptions)
  );

  try {
    const info = await transporterWithExpressHandlebars.sendMail(mailOptions);
    logger.info(`Mail response ${info.response}`);
    return {
      success: true,
    };
  } catch (error) {
    logger.error(`MAIL_ERROR ${error}`);
    throw Boom.internal("FAILED TO SENT OUT MAIL");
  }
}
