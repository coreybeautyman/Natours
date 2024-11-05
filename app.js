const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const hpp = require('hpp');
const xss = require('xss-clean');
const mongoStanitize = require('express-mongo-sanitize');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const tourRouter = require('./Routes/tourRoutes');
const userRouter = require('./Routes/userRoutes');
const reviewRouter = require('./Routes/reviewRoutes');
// const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const viewRouter = require('./Routes/viewRoutes');
const bookingRouter = require('./Routes/bookingRoutes');
const { webhookCheckout } = require('./controllers/bookingController');

const app = express();

app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
// 1) middle ware

// SERVING STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.options('*', cors());

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
});

// LIMIT REQUESTS FROM SAME API
app.use('/api', limiter);

app.post(
  '/webhook-checkout',
  express.raw({ type: 'application/json' }),
  webhookCheckout,
);

// SECURITY HTTP HEADERS
app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ['*'], // This is very permissive and not recommended for production
      scriptSrc: ['*'],
    },
  }),
);

// BODY PARSER READING DATA FROM THE BODY TO REQ.BODY
app.use(express.json({ limit: '10kb' }));

app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// COOKIE PARSER
app.use(cookieParser());

// DATA SANTISATION AGAINST NOSQL QUERY INJECTION
app.use(mongoStanitize());

// DATA SANTISATION AGAINST XSS
app.use(xss());

// PREVENT PARAMENTER POLLUTION
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'average',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

// TEST MIDDLEWARE
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(compression());

// 4) Routes
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.use(globalErrorHandler);
module.exports = app;
