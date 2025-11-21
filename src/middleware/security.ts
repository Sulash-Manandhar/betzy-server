import helmet from "helmet";
import cors, { type CorsOptions } from "cors";
import { env } from "@/config/env";

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || env.CORS_HOSTS.includes(origin)) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true,
  optionsSuccessStatus: 204,
};

export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
    },
  },
  referrerPolicy: { policy: "same-origin" },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "same-site" },
});

export const customCors = cors(corsOptions);
