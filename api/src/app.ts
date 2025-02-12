import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ENTITIES_ROUTES } from "./config/routes";
import { applyServerHardening } from "./middleware/security";
import morgan from "morgan";
import timeout from "connect-timeout";
import { rateLimit } from "express-rate-limit";

// routes
import authRouter from "./routes/auth";
import { ENV, MAIN_CLIENT } from "./getEnv";
import organizationRouter from "./routes/organization";

const app: Application = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

if (ENV === "production") {
  var corsOptions = {
    origin: function (origin: any, callback: any) {
      if (origin === MAIN_CLIENT || !origin) {
        // Allow requests from the main client or non-browser clients
        callback(null, true);
      } else {
        // Block others
        callback(new Error("Not allowed by CORS"));
      }
    },
  };
  app.use(limiter);
  app.use(cors(corsOptions));
}

app.use(cors());
app.use(timeout("10s")); // Apply timeout once
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(express.json()); // session middleware

// Apply routes
app.use(ENTITIES_ROUTES.AUTH.BASE, authRouter);

// core features routes
app.use(ENTITIES_ROUTES.ORG, organizationRouter);

// Middleware to halt on timeout
app.use(haltOnTimedout);

applyServerHardening(app);

// Catch errors
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   console.error("Unhandled error:", err.stack);

//   if (err.errors) {
//     // Validation error response
//     return res.status(err.status || 400).send({
//       status: false,
//       message: "Validation error",
//       errors: err.errors, // Send the validation errors array
//     });
//   }

//   // Default error response
//   res.status(400).send({
//     status: false,
//     message: err.message || "Internal Server Error",
//   });
// });

function haltOnTimedout(req: Request, res: Response, next: NextFunction) {
  if (!req.timedout) next();
}

// Display routes on app run
function print(path: any, layer: any) {
  if (layer.route) {
    layer.route.stack.forEach(
      print.bind(null, path.concat(split(layer.route.path)))
    );
  } else if (layer.name === "router" && layer.handle.stack) {
    layer.handle.stack.forEach(
      print.bind(null, path.concat(split(layer.regexp)))
    );
  } else if (layer.method) {
    console.log(
      "%s /%s",
      layer.method.toUpperCase(),
      path.concat(split(layer.regexp)).filter(Boolean).join("/")
    );
  }
}

function split(thing: any) {
  if (typeof thing === "string") {
    return thing.split("/");
  } else if (thing.fast_slash) {
    return "";
  } else {
    const match = thing
      .toString()
      .replace("\\/?", "")
      .replace("(?=\\/|$)", "$")
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
    return match
      ? match[1].replace(/\\(.)/g, "$1").split("/")
      : "<complex:" + thing.toString() + ">";
  }
}

app._router.stack.forEach(print.bind(null, []));

export default app;
