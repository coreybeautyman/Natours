var $j3GD5$path = require("path");
var $j3GD5$express = require("express");
require("morgan");
var $j3GD5$cookieparser = require("cookie-parser");
var $j3GD5$compression = require("compression");
var $j3GD5$hpp = require("hpp");
var $j3GD5$xssclean = require("xss-clean");
var $j3GD5$expressmongosanitize = require("express-mongo-sanitize");
var $j3GD5$cors = require("cors");
var $j3GD5$expressratelimit = require("express-rate-limit");
var $j3GD5$helmet = require("helmet");
var $j3GD5$mongoose = require("mongoose");
var $j3GD5$slugify = require("slugify");
var $j3GD5$validator = require("validator");
var $j3GD5$bcryptjs = require("bcryptjs");
var $j3GD5$crypto = require("crypto");
var $j3GD5$util = require("util");
var $j3GD5$jsonwebtoken = require("jsonwebtoken");
var $j3GD5$nodemailer = require("nodemailer");
var $j3GD5$pug = require("pug");
var $j3GD5$htmltotext = require("html-to-text");
var $j3GD5$multer = require("multer");
var $j3GD5$sharp = require("sharp");
var $j3GD5$stripe = require("stripe");

var $84a264530b3fb4fb$var$__dirname = "";











var $106b3d9975284c1d$exports = {};

var $b14a6d4adc0e87b7$exports = {};

var $e8a2407fbeb25c48$export$308e5d29efcbb921;
var $e8a2407fbeb25c48$export$9e5af9df7273b1c1;
var $e8a2407fbeb25c48$export$98596c466f7b9045;
var $e8a2407fbeb25c48$export$e42a3d813dd6123f;
var $e8a2407fbeb25c48$export$189a68d831f3e4ec;
var $e8a2407fbeb25c48$export$d5f51dc2dd42340e;
var $e8a2407fbeb25c48$export$7019c694ef9e681d;
var $e8a2407fbeb25c48$export$c3d3086f9027c35a;
var $2d4738cec793e542$exports = {};

var $bbc3395627179bb7$exports = {};


var $ca4b57b91abcd647$exports = {};




const $ca4b57b91abcd647$var$userSchema = new $j3GD5$mongoose.Schema({
    name: {
        type: String,
        required: [
            true,
            'A User must have a name'
        ],
        trim: true,
        maxLength: [
            40,
            'A user name cannot be more the 40 charecters'
        ],
        minLength: [
            2,
            'A user name must be at least 2 charecters'
        ],
        validate: {
            message: 'A users name must only have letter',
            validator: function(val) {
                return /^[A-Za-z\s]+$/.test(val);
            }
        }
    },
    email: {
        type: String,
        required: [
            true,
            'A user must have an email'
        ],
        trim: true,
        unique: [
            true,
            'Email adress already exists please login'
        ],
        lowercase: true,
        validate: [
            $j3GD5$validator.isEmail,
            'Email not valid'
        ]
    },
    photo: {
        type: String,
        default: '/img/default.jpg'
    },
    role: {
        type: String,
        enum: [
            'user',
            'guide',
            'lead-guide',
            'admin'
        ],
        default: 'user'
    },
    password: {
        type: String,
        required: [
            true,
            'A user must have a password'
        ],
        minLength: [
            8,
            'Password must be more than 8 charecters'
        ],
        maxLength: [
            30,
            'Password cannot be more than 30 charecters'
        ],
        select: false
    },
    passwordConfirm: {
        type: String,
        require: [
            true,
            'Please confirm password'
        ],
        validate: {
            validator: function(el) {
                return el === this.password;
            },
            message: 'Passwords are not the same'
        }
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
});
$ca4b57b91abcd647$var$userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await $j3GD5$bcryptjs.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});
$ca4b57b91abcd647$var$userSchema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next();
});
$ca4b57b91abcd647$var$userSchema.pre(/^find/, function(next) {
    this.find({
        active: {
            $ne: false
        }
    });
    next();
});
$ca4b57b91abcd647$var$userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await $j3GD5$bcryptjs.compare(candidatePassword, userPassword);
};
$ca4b57b91abcd647$var$userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimeStamp;
    }
    return false;
};
$ca4b57b91abcd647$var$userSchema.methods.createPasswordResetToken = function() {
    const resetToken = $j3GD5$crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = $j3GD5$crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 600000;
    return resetToken;
};
const $ca4b57b91abcd647$var$User = $j3GD5$mongoose.model('User', $ca4b57b91abcd647$var$userSchema);
$ca4b57b91abcd647$exports = $ca4b57b91abcd647$var$User;


// const validator = require('validator');
const $bbc3395627179bb7$var$tourSchema = new $j3GD5$mongoose.Schema({
    name: {
        type: String,
        required: [
            true,
            'A tour must have a name'
        ],
        unique: true,
        trim: true,
        maxLength: [
            40,
            'A tour name must have less or equal 40 charecters'
        ],
        minLength: [
            10,
            'A tour name must have more than 10 charecters'
        ],
        validate: {
            message: 'A Tour name must only have letter and numbers',
            validator: function(val) {
                return /^[A-Za-z0-9\s]+$/.test(val);
            }
        }
    },
    slug: String,
    duration: {
        type: Number,
        required: [
            true,
            'A tour must have a duration'
        ]
    },
    maxGroupSize: {
        type: Number,
        required: [
            true,
            'A tour must have a group size'
        ]
    },
    difficulty: {
        type: String,
        required: [
            true,
            'A tour must have a difficulty'
        ],
        enum: {
            values: [
                'easy',
                'medium',
                'difficult'
            ],
            message: 'Difficulty must be either easy, medium or hard'
        }
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [
            1,
            'Rating must be more than 1.0'
        ],
        max: [
            5,
            'Rating must be below 5.0'
        ],
        set: (val)=>Math.round(val * 10) / 10
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [
            true,
            'A tour must have a price'
        ]
    },
    priceDiscount: {
        type: Number,
        validate: {
            message: 'Discount price ({VALUE}) can not be higher than price',
            validator: function(val) {
                return val < this.price;
            }
        }
    },
    summary: {
        type: String,
        trim: true,
        required: [
            true,
            'A tour must have a description'
        ]
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [
            true,
            'A tour must have an image'
        ]
    },
    images: [
        String
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [
        Date
    ],
    secretTour: {
        type: Boolean,
        default: false
    },
    startLocation: {
        // GEOJSON
        type: {
            type: String,
            default: 'Point',
            enum: [
                'Point'
            ]
        },
        coordinates: [
            Number
        ],
        address: String,
        description: String
    },
    locations: [
        {
            type: {
                type: String,
                default: 'Point',
                enum: [
                    'Point'
                ]
            },
            coordinates: [
                Number
            ],
            address: String,
            description: String,
            day: Number
        }
    ],
    guides: [
        {
            type: $j3GD5$mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ]
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});
$bbc3395627179bb7$var$tourSchema.index({
    price: 1,
    ratingsAverage: -1
});
$bbc3395627179bb7$var$tourSchema.index({
    startLocation: '2dsphere'
});
$bbc3395627179bb7$var$tourSchema.index({
    slug: 1
});
$bbc3395627179bb7$var$tourSchema.virtual('durationWeeks').get(function() {
    return this.duration / 7;
});
// DOCUMENT MIDDLEWARE RUNS BEFORE .SAVE() AND .CREATE()
$bbc3395627179bb7$var$tourSchema.pre('save', function(next) {
    this.slug = $j3GD5$slugify(this.name, {
        lower: true
    });
    next();
});
// tourSchema.pre('save', async function (next) {
//   const guidesPromises = this.guides.map(async (id) => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });
// QUERY MIDDLEWARE
$bbc3395627179bb7$var$tourSchema.pre(/^find/, function(next) {
    this.find({
        secretTour: {
            $ne: true
        }
    });
    this.start = Date.now();
    next();
});
// VIRTUAL POPULATE
$bbc3395627179bb7$var$tourSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'tour',
    localField: '_id'
});
$bbc3395627179bb7$var$tourSchema.post(/^find/, function(docs, next) {
    // console.log(`Query took ${Date.now() - this.start} milliseconds`);
    next();
});
$bbc3395627179bb7$var$tourSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'guides',
        select: '-__v -passwordChangedAt'
    });
    next();
});
// AGGREGATION MIDDLEWARE
// tourSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
//   console.log(this);
//   next();
// });
const $bbc3395627179bb7$var$Tour = $j3GD5$mongoose.model('Tour', $bbc3395627179bb7$var$tourSchema);
$bbc3395627179bb7$exports = $bbc3395627179bb7$var$Tour;


const $2d4738cec793e542$var$reviewSchema = new $j3GD5$mongoose.Schema({
    review: {
        type: String,
        required: [
            true,
            'A review cannot be empty'
        ],
        trim: true,
        minLength: [
            5,
            'A review name must have more than 5 charecters'
        ]
    },
    rating: {
        type: Number,
        min: [
            1,
            'Rating must be more than 1.0'
        ],
        max: [
            5,
            'Rating must be below 5.0'
        ]
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    tour: {
        type: $j3GD5$mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [
            true,
            'A review must have a tour'
        ]
    },
    user: {
        type: $j3GD5$mongoose.Schema.ObjectId,
        ref: 'User',
        required: [
            true,
            'A review must have a user'
        ]
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});
$2d4738cec793e542$var$reviewSchema.index({
    tour: 1,
    user: 1
}, {
    unique: true
});
$2d4738cec793e542$var$reviewSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'user',
        select: 'name photo'
    });
    next();
});
$2d4738cec793e542$var$reviewSchema.statics.calcAverageRatings = async function(tourId) {
    const stats = await this.aggregate([
        {
            $match: {
                tour: tourId
            }
        },
        {
            $group: {
                _id: '$tour',
                nRating: {
                    $sum: 1
                },
                avgRating: {
                    $avg: '$rating'
                }
            }
        }
    ]);
    if (stats.length > 0) await $bbc3395627179bb7$exports.findByIdAndUpdate(tourId, {
        ratingsQuantity: stats[0].nRating,
        ratingsAverage: stats[0].avgRating
    });
    else await $bbc3395627179bb7$exports.findByIdAndUpdate(tourId, {
        ratingsQuantity: 0,
        ratingsAverage: 4.5
    });
};
$2d4738cec793e542$var$reviewSchema.post('save', function() {
    const Review = this.constructor;
    Review.calcAverageRatings(this.tour);
});
$2d4738cec793e542$var$reviewSchema.pre(/^findOneAnd/, async function(next) {
    this.r = await this.clone().findOne();
    next();
});
$2d4738cec793e542$var$reviewSchema.post(/^findOneAnd/, async function() {
    await this.r.constructor.calcAverageRatings(this.r.tour);
});
const $2d4738cec793e542$var$Review = $j3GD5$mongoose.model('Review', $2d4738cec793e542$var$reviewSchema);
$2d4738cec793e542$exports = $2d4738cec793e542$var$Review;


var $9e7a345a81ca5826$exports = {};
$9e7a345a81ca5826$exports = (fn)=>(req, res, next)=>fn(req, res, next).catch(next);


var $227fa3de72c027a5$export$36a479340da3c347;
// write a deleteMany function which is similar to deleteOne function but will delete all a users reviews
var $227fa3de72c027a5$export$b6c07f75dce3b16a;
var $227fa3de72c027a5$export$3220ead45e537228;
var $227fa3de72c027a5$export$5d49599920443c31;
var $227fa3de72c027a5$export$2eb5ba9a66e42816;
var $227fa3de72c027a5$export$2774c37398bee8b2;
var $35c12386c6082d4c$exports = {};
class $35c12386c6082d4c$var$APIFeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filter() {
        const queryObj = {
            ...this.queryString
        };
        const excludedFields = [
            'page',
            'sort',
            'limit',
            'fields'
        ];
        excludedFields.forEach((el)=>delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match)=>`$${match}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else this.query = this.query.sort('-createdAt');
        return this;
    }
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else this.query = this.query.select('-__v');
        return this;
    }
    paginate() {
        const page = +this.queryString.page || 1;
        const limit = +this.queryString.limit || 100;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}
$35c12386c6082d4c$exports = $35c12386c6082d4c$var$APIFeatures;


var $e203200498571e93$exports = {};
class $e203200498571e93$var$AppError extends Error {
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
$e203200498571e93$exports = $e203200498571e93$var$AppError;



$227fa3de72c027a5$export$36a479340da3c347 = (Model)=>$9e7a345a81ca5826$exports(async (req, res, next)=>{
        const doc = await Model.findByIdAndDelete(req.params.id);
        if (!doc) return next(new $e203200498571e93$exports('No document found with that ID', 404));
        res.status(204).json({
            status: 'success',
            data: null
        });
    });
$227fa3de72c027a5$export$b6c07f75dce3b16a = (Model)=>$9e7a345a81ca5826$exports(async (req, res, next)=>{
        const doc = await Model.deleteMany({
            user: req.user.id
        });
        if (!doc) return next(new $e203200498571e93$exports('No document found with that ID', 404));
        res.status(204).json({
            status: 'success',
            data: null
        });
    });
$227fa3de72c027a5$export$3220ead45e537228 = (Model)=>$9e7a345a81ca5826$exports(async (req, res, next)=>{
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!doc) return next(new $e203200498571e93$exports('No document found with that ID', 404));
        res.status(200).json({
            satus: 'success',
            data: {
                doc: doc,
                runValidators: true
            }
        });
    });
$227fa3de72c027a5$export$5d49599920443c31 = (Model)=>$9e7a345a81ca5826$exports(async (req, res, next)=>{
        console.log(req.body);
        const doc = await Model.create(req.body);
        res.status(201).json({
            satus: 'success',
            data: {
                data: doc
            }
        });
    });
$227fa3de72c027a5$export$2eb5ba9a66e42816 = (Model, popOptions)=>$9e7a345a81ca5826$exports(async (req, res, next)=>{
        const query = Model.findById(req.params.id);
        if (popOptions) query.populate(popOptions);
        const doc = await query;
        if (!doc) return next(new $e203200498571e93$exports('No document found with that ID', 404));
        res.status(200).json({
            status: 'Success',
            data: {
                doc: doc
            }
        });
    });
$227fa3de72c027a5$export$2774c37398bee8b2 = (Model)=>$9e7a345a81ca5826$exports(async (req, res, next)=>{
        let filter = {};
        if (req.params.tourId) filter = {
            tour: req.params.tourId
        };
        // EXECUTE QUERY
        const features = new $35c12386c6082d4c$exports(Model.find(filter), req.query).filter().sort().limitFields().paginate();
        const doc = await features.query;
        // SEND RESPONSE
        res.status(200).json({
            status: 'Success',
            results: doc.length,
            data: {
                doc: doc
            }
        });
    });


var $e8a2407fbeb25c48$require$deleteOne = $227fa3de72c027a5$export$36a479340da3c347;
var $e8a2407fbeb25c48$require$deleteMany = $227fa3de72c027a5$export$b6c07f75dce3b16a;
var $e8a2407fbeb25c48$require$updateOne = $227fa3de72c027a5$export$3220ead45e537228;
var $e8a2407fbeb25c48$require$createOne = $227fa3de72c027a5$export$5d49599920443c31;
var $e8a2407fbeb25c48$require$getOne = $227fa3de72c027a5$export$2eb5ba9a66e42816;
var $e8a2407fbeb25c48$require$getAll = $227fa3de72c027a5$export$2774c37398bee8b2;
$e8a2407fbeb25c48$export$308e5d29efcbb921 = (req, res, next)=>{
    // NESTED ROUTES
    if (!req.body.tour) req.body.tour = req.params.tourId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
};
$e8a2407fbeb25c48$export$9e5af9df7273b1c1 = $9e7a345a81ca5826$exports(async (req, res, next)=>{
    const reviews = await $2d4738cec793e542$exports.find({
        user: req.user.id
    });
    res.status(200).json({
        status: 'success',
        results: reviews.length,
        data: {
            reviews: reviews
        }
    });
});
$e8a2407fbeb25c48$export$98596c466f7b9045 = $e8a2407fbeb25c48$require$getAll($2d4738cec793e542$exports);
$e8a2407fbeb25c48$export$e42a3d813dd6123f = $e8a2407fbeb25c48$require$createOne($2d4738cec793e542$exports);
$e8a2407fbeb25c48$export$189a68d831f3e4ec = $e8a2407fbeb25c48$require$deleteOne($2d4738cec793e542$exports);
$e8a2407fbeb25c48$export$d5f51dc2dd42340e = $e8a2407fbeb25c48$require$deleteMany($2d4738cec793e542$exports);
$e8a2407fbeb25c48$export$7019c694ef9e681d = $e8a2407fbeb25c48$require$updateOne($2d4738cec793e542$exports);
$e8a2407fbeb25c48$export$c3d3086f9027c35a = $e8a2407fbeb25c48$require$getOne($2d4738cec793e542$exports);


var $b14a6d4adc0e87b7$require$createReview = $e8a2407fbeb25c48$export$e42a3d813dd6123f;
var $b14a6d4adc0e87b7$require$getAllReviews = $e8a2407fbeb25c48$export$98596c466f7b9045;
var $b14a6d4adc0e87b7$require$deleteReview = $e8a2407fbeb25c48$export$189a68d831f3e4ec;
var $b14a6d4adc0e87b7$require$updateReview = $e8a2407fbeb25c48$export$7019c694ef9e681d;
var $b14a6d4adc0e87b7$require$setTourUserIds = $e8a2407fbeb25c48$export$308e5d29efcbb921;
var $b14a6d4adc0e87b7$require$getReview = $e8a2407fbeb25c48$export$c3d3086f9027c35a;
var $b14a6d4adc0e87b7$require$getMyReviews = $e8a2407fbeb25c48$export$9e5af9df7273b1c1;
var $b14a6d4adc0e87b7$require$deleteAllMyReviews = $e8a2407fbeb25c48$export$d5f51dc2dd42340e;
var $ce487c6e3030a219$export$7200a869094fec36;
var $ce487c6e3030a219$export$596d806903d1f59e;
var $ce487c6e3030a219$export$eda7ca9e36571553;
// Only for rendered pages no errors
var $ce487c6e3030a219$export$256a5a3564694cfc;
var $ce487c6e3030a219$export$a0973bcfe11b05c9;
var $ce487c6e3030a219$export$e1bac762c84d3b0c;
var $ce487c6e3030a219$export$66791fb2cfeec3e;
var $ce487c6e3030a219$export$dc726c8e334dd814;
var $ce487c6e3030a219$export$e2853351e15b7895;

var $ce487c6e3030a219$require$promisify = $j3GD5$util.promisify;





var $18c8568767daaa72$exports = {};
var $18c8568767daaa72$var$__dirname = "utils";



$18c8568767daaa72$exports = class Email {
    constructor(user, url){
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = `Corey Beautyman <${undefined}>`;
    }
    newTransport() {
        console.log(true);
        return $j3GD5$nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587,
            secure: false,
            auth: {
                user: undefined,
                pass: undefined
            }
        });
    }
    async send(template, subject) {
        // SEND THE EMAIL
        // 1) RENDER HTML BASED ON PUG TEMPLATE
        const html = $j3GD5$pug.renderFile(`${$18c8568767daaa72$var$__dirname}/email/${template}.pug`, {
            firstName: this.firstName,
            url: this.url,
            subject: subject
        });
        // 2) DEFINE THE EMAIL OPTIONS
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject: subject,
            html: html,
            text: $j3GD5$htmltotext.convert(html)
        };
        // 3) CREATE A TRANSPORT AND SEND EMAIL
        await this.newTransport().sendMail(mailOptions);
    }
    async sendWelcome() {
        await this.send('Welcome', 'Welcome to the Natours family!');
    }
    async sendPasswordReset() {
        await this.send('passwordReset', 'Your password reset token (valid for only 10 minutes)');
    }
};


const $ce487c6e3030a219$var$signToken = (id)=>$j3GD5$jsonwebtoken.sign({
        id: id
    }, undefined, {
        expiresIn: undefined
    });
const $ce487c6e3030a219$var$createSendToken = (user, statusCode, req, res, sendData = true)=>{
    const data = sendData ? {
        user: user
    } : '';
    const token = $ce487c6e3030a219$var$signToken(user._id);
    const cookieOptions = {
        expires: new Date(Date.now() + NaN),
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        path: '/'
    };
    res.cookie('jwt', token, cookieOptions);
    // REMOVE PASSWORD FROM OUTPUT
    user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        token: token,
        data: data
    });
};
$ce487c6e3030a219$export$7200a869094fec36 = $9e7a345a81ca5826$exports(async (req, res, next)=>{
    if (req.file) {
        const base64Image = req.file.buffer.toString('base64');
        req.body.photo = `data:image/jpeg;base64,${base64Image}`;
    }
    const newUser = await $ca4b57b91abcd647$exports.create({
        name: req.body.name,
        email: req.body.email,
        photo: req.body.photo,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        passwordChangedAt: req.body.passwordChangedAt,
        role: req.body.role
    });
    const url = `${req.protocol}://${req.get('host')}/me`;
    await new $18c8568767daaa72$exports(newUser, url).sendWelcome();
    $ce487c6e3030a219$var$createSendToken(newUser, 201, req, res);
});
$ce487c6e3030a219$export$596d806903d1f59e = $9e7a345a81ca5826$exports(async (req, res, next)=>{
    const { email: email, password: password } = req.body;
    if (!email || !password) return next(new $e203200498571e93$exports('Please provide email and password!', 400));
    const user = await $ca4b57b91abcd647$exports.findOne({
        email: email
    }).select('+password');
    if (!user || !await user.correctPassword(password, user.password)) return next(new $e203200498571e93$exports('incorrect email or password', 401));
    $ce487c6e3030a219$var$createSendToken(user, 200, req, res);
});
$ce487c6e3030a219$export$eda7ca9e36571553 = $9e7a345a81ca5826$exports(async (req, res, next)=>{
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer') && req.headers.authorization.bearer) token = req.headers.authorization.split(' ')[1];
    else if (req.cookies.jwt) token = req.cookies.jwt;
    if (!token || token === undefined) return next(new $e203200498571e93$exports('You are not logged in, please login to gain access', 401));
    const decoded = await $ce487c6e3030a219$require$promisify($j3GD5$jsonwebtoken.verify)(token, undefined);
    const currentUser = await $ca4b57b91abcd647$exports.findById(decoded.id);
    if (!currentUser) return next(new $e203200498571e93$exports('The User who belongs to this token no longer exists'), 401);
    if (currentUser.changedPasswordAfter(decoded.iat)) return next('User rexcently changed password, please login again!', 401);
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
});
$ce487c6e3030a219$export$256a5a3564694cfc = async (req, res, next)=>{
    if (req.cookies.jwt) try {
        const decoded = await $ce487c6e3030a219$require$promisify($j3GD5$jsonwebtoken.verify)(req.cookies.jwt, undefined);
        const currentUser = await $ca4b57b91abcd647$exports.findById(decoded.id);
        if (!currentUser) return next();
        if (currentUser.changedPasswordAfter(decoded.iat)) return next();
        res.locals.user = currentUser;
        return next();
    } catch (error) {
        return next();
    }
    next();
};
$ce487c6e3030a219$export$a0973bcfe11b05c9 = (req, res)=>{
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10000),
        httpOnly: true
    });
    res.status(200).json({
        status: 'success'
    });
};
$ce487c6e3030a219$export$e1bac762c84d3b0c = (...roles)=>(req, res, next)=>{
        if (!roles.includes(req.user.role)) return next(new $e203200498571e93$exports('You do not have permission to permorm this action', 403));
        next();
    };
$ce487c6e3030a219$export$66791fb2cfeec3e = $9e7a345a81ca5826$exports(async (req, res, next)=>{
    // 1) GET USER BASED ON POSTED EMAIL
    const user = await $ca4b57b91abcd647$exports.findOne({
        email: req.body.email
    });
    if (!user) return next(new $e203200498571e93$exports('No user with that email address', 404));
    // 2) GENERATE THE RANDOM RESET TOKEN
    const resetToken = user.createPasswordResetToken();
    await user.save({
        validateBeforeSave: false
    });
    // 3) SEND IT BACK AS AN EMAIL
    try {
        // await sendEmail({
        //   email: user.email,
        //   subject: `Your password reset token valid for 10 minutes`,
        //   message,
        // });
        const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
        await new $18c8568767daaa72$exports(user, resetURL).sendPasswordReset();
        res.status(200).json({
            status: 'success',
            message: 'Token sent to email'
        });
    } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({
            validateBeforeSave: false
        });
        return next(new $e203200498571e93$exports(`There was an error sending the email, try again later. ERROR: ${error}`, 500));
    }
});
$ce487c6e3030a219$export$dc726c8e334dd814 = $9e7a345a81ca5826$exports(async (req, res, next)=>{
    // 1) GET USER BASED ON TOKEN
    const hashedToken = $j3GD5$crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await $ca4b57b91abcd647$exports.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: {
            $gt: Date.now()
        }
    });
    // 2) IF TOKEN HAS NOT EXPIRED, AND THERE IS A USER, SET THE NEW PASSWORD
    if (!user) return next(new $e203200498571e93$exports('token is invalid or has expired', 400));
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    // 3) UPDATE CHANGED PASSWORD AT PROPTERY FOR THE USER
    // 4) LOG THE USER IN, SEND JWT
    $ce487c6e3030a219$var$createSendToken(user, 200, req, res);
});
$ce487c6e3030a219$export$e2853351e15b7895 = $9e7a345a81ca5826$exports(async (req, res, next)=>{
    console.log('UPDATE PASSWORD', req.body);
    // 1) GET USER FROM COLLECTION
    const user = await $ca4b57b91abcd647$exports.findById(req.user.id).select('+password');
    // 2) CHECK IF POSTED CURRENT PASSWORD IS CORRECT
    const { oldPassword: oldPassword, newPassword: newPassword, newPasswordConfirm: newPasswordConfirm } = req.body;
    if (!user || !await user.correctPassword(oldPassword, user.password)) return next('Passord is not correct!', 401);
    // 3) IF SO, UPDATE PASSWORD
    user.password = newPassword;
    user.passwordConfirm = newPasswordConfirm;
    await user.save();
    // 4) LOG USER IN, SENT JWT
    $ce487c6e3030a219$var$createSendToken(user, 200, req, res, false);
});


var $b14a6d4adc0e87b7$require$protect = $ce487c6e3030a219$export$eda7ca9e36571553;
var $b14a6d4adc0e87b7$require$restrictTo = $ce487c6e3030a219$export$e1bac762c84d3b0c;
const $b14a6d4adc0e87b7$var$router = $j3GD5$express.Router({
    mergeParams: true
});
$b14a6d4adc0e87b7$var$router.use($b14a6d4adc0e87b7$require$protect);
$b14a6d4adc0e87b7$var$router.route('/').get($b14a6d4adc0e87b7$require$getAllReviews).post($b14a6d4adc0e87b7$require$restrictTo('user'), $b14a6d4adc0e87b7$require$setTourUserIds, $b14a6d4adc0e87b7$require$createReview);
$b14a6d4adc0e87b7$var$router.route('/my-reviews').get($b14a6d4adc0e87b7$require$getMyReviews).delete($b14a6d4adc0e87b7$require$restrictTo('user', 'admin'), $b14a6d4adc0e87b7$require$deleteAllMyReviews);
$b14a6d4adc0e87b7$var$router.route('/:id').get($b14a6d4adc0e87b7$require$getReview).patch($b14a6d4adc0e87b7$require$restrictTo('user', 'admin'), $b14a6d4adc0e87b7$require$updateReview).delete($b14a6d4adc0e87b7$require$restrictTo('user', 'admin'), $b14a6d4adc0e87b7$require$deleteReview);
// router.route('/:id').get(getTourReview);
$b14a6d4adc0e87b7$exports = $b14a6d4adc0e87b7$var$router;


var $76e7961079678561$export$3f01106131746282;
var $76e7961079678561$export$b4cc9a7f549f80be;
var $76e7961079678561$export$bef7f5b87ecd4e05;
var $76e7961079678561$export$1b246d2f2efdafde;
var $76e7961079678561$export$95c4b71b6433cd9b;
var $76e7961079678561$export$a491843cc088839f;
var $76e7961079678561$export$e99ebfc19ac06f62;
var $76e7961079678561$export$50e56048083c79d4;
var $76e7961079678561$export$a2d3e092b567a307;
var $76e7961079678561$export$9f2360ce38e60765;
var $76e7961079678561$export$f0bf44055fab1ca8;
var $76e7961079678561$export$c76b58cfe053f228;




var $76e7961079678561$require$deleteOne = $227fa3de72c027a5$export$36a479340da3c347;
var $76e7961079678561$require$updateOne = $227fa3de72c027a5$export$3220ead45e537228;
var $76e7961079678561$require$createOne = $227fa3de72c027a5$export$5d49599920443c31;
var $76e7961079678561$require$getOne = $227fa3de72c027a5$export$2eb5ba9a66e42816;
var $76e7961079678561$require$getAll = $227fa3de72c027a5$export$2774c37398bee8b2;


const $76e7961079678561$var$multerStorage = $j3GD5$multer.memoryStorage();
const $76e7961079678561$var$multerFilter = (req, file, cb)=>{
    if (file.mimetype.startsWith('image')) cb(null, true);
    else cb(new $e203200498571e93$exports('Not an Image! Please only upload images', 400), false);
};
const $76e7961079678561$var$upload = $j3GD5$multer({
    storage: $76e7961079678561$var$multerStorage,
    fileFilter: $76e7961079678561$var$multerFilter
});
$76e7961079678561$export$3f01106131746282 = $9e7a345a81ca5826$exports(async (req, res, next)=>{
    if (!req.files.imageCover && !req.files.images) return next();
    req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
    await $j3GD5$sharp(req.files.imageCover[0].buffer).resize(2000, 1333).toFormat('jpeg').jpeg({
        quality: 90
    }).toFile(`public/img/tours/${req.body.imageCover}`);
    req.body.images = [];
    // images
    await Promise.all(req.files.images.map(async (file, i)=>{
        const filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;
        await $j3GD5$sharp(file.buffer).resize(2000, 1333).toFormat('jpeg').jpeg({
            quality: 90
        }).toFile(`public/img/tours/${filename}`);
        req.body.images.push(filename);
    }));
    next();
});
$76e7961079678561$export$b4cc9a7f549f80be = $76e7961079678561$var$upload.fields([
    {
        name: 'imageCover',
        maxCount: 1
    },
    {
        name: 'images',
        maxCount: 3
    }
]);
$76e7961079678561$export$bef7f5b87ecd4e05 = (req, res, next)=>{
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
};
$76e7961079678561$export$1b246d2f2efdafde = $76e7961079678561$require$getAll($bbc3395627179bb7$exports);
$76e7961079678561$export$95c4b71b6433cd9b = $76e7961079678561$require$getOne($bbc3395627179bb7$exports, {
    path: 'reviews'
});
$76e7961079678561$export$a491843cc088839f = $76e7961079678561$require$createOne($bbc3395627179bb7$exports);
$76e7961079678561$export$e99ebfc19ac06f62 = $76e7961079678561$require$updateOne($bbc3395627179bb7$exports);
$76e7961079678561$export$50e56048083c79d4 = $76e7961079678561$require$deleteOne($bbc3395627179bb7$exports);
$76e7961079678561$export$a2d3e092b567a307 = $9e7a345a81ca5826$exports(async (req, res, next)=>{
    const stats = await $bbc3395627179bb7$exports.aggregate([
        {
            $match: {
                ratingsAverage: {
                    $gte: 4.5
                }
            }
        },
        {
            $group: {
                _id: {
                    $toUpper: '$difficulty'
                },
                num: {
                    $sum: 1
                },
                numRatings: {
                    $sum: '$ratingsQuantity'
                },
                avgRating: {
                    $avg: '$ratingsAverage'
                },
                avgPrice: {
                    $avg: '$price'
                },
                minPrice: {
                    $min: '$price'
                },
                maxPrice: {
                    $max: '$price'
                }
            }
        },
        {
            $sort: {
                avgPrice: 1
            }
        },
        {
            $match: {
                _id: {
                    $ne: 'EASY'
                }
            }
        }
    ]);
    res.status(200).json({
        satus: 'success',
        data: {
            stats: stats
        }
    });
});
$76e7961079678561$export$9f2360ce38e60765 = $9e7a345a81ca5826$exports(async (req, res, next)=>{
    const year = +req.params.year;
    const plan = await $bbc3395627179bb7$exports.aggregate([
        {
            $unwind: '$startDates'
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`)
                }
            }
        },
        {
            $group: {
                _id: {
                    $month: '$startDates'
                },
                numOfTourStarts: {
                    $sum: 1
                },
                tours: {
                    $push: '$name'
                }
            }
        },
        {
            $project: {
                _id: 0
            }
        },
        {
            $sort: {
                numTourStarts: -1
            }
        },
        {
            $addFields: {
                month: '$_id'
            }
        }
    ]);
    res.status(200).json({
        satus: 'success',
        data: {
            plan: plan
        }
    });
});
$76e7961079678561$export$f0bf44055fab1ca8 = $9e7a345a81ca5826$exports(async (req, res, next)=>{
    const { distance: distance, latlng: latlng, unit: unit } = req.params;
    const [lat, lng] = latlng.split(',');
    const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;
    if (!lat || !lng) next(new $e203200498571e93$exports('please provide latitude and longitude in the correct format. lat,lng', 400));
    const tours = await $bbc3395627179bb7$exports.find({
        startLocation: {
            $geoWithin: {
                $centerSphere: [
                    [
                        lng,
                        lat
                    ],
                    radius
                ]
            }
        }
    });
    res.status(200).json({
        satus: 'success',
        results: tours.length,
        data: {
            data: tours
        }
    });
});
$76e7961079678561$export$c76b58cfe053f228 = $9e7a345a81ca5826$exports(async (req, res, next)=>{
    const { latlng: latlng, unit: unit } = req.params;
    const [lat, lng] = latlng.split(',');
    const multiplier = unit === 'mi' ? 0.000621371 : 0.001;
    if (!lat || !lng) next(new $e203200498571e93$exports('please provide latitude and longitude in the correct format. lat,lng', 400));
    const distances = await $bbc3395627179bb7$exports.aggregate([
        {
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [
                        +lng,
                        +lat
                    ]
                },
                distanceField: 'distance',
                distanceMultiplier: multiplier
            }
        },
        {
            $project: {
                distance: 1,
                name: 1
            }
        }
    ]);
    res.status(200).json({
        satus: 'success',
        data: {
            data: distances
        }
    });
}); // router.route(
 //   '/tours-within/:distance/center/:latlng/unit/:unit',
 //   getToursWithin,
 // );


var $106b3d9975284c1d$require$getAllTours = $76e7961079678561$export$1b246d2f2efdafde;
var $106b3d9975284c1d$require$createTour = $76e7961079678561$export$a491843cc088839f;
var $106b3d9975284c1d$require$getTour = $76e7961079678561$export$95c4b71b6433cd9b;
var $106b3d9975284c1d$require$updateTour = $76e7961079678561$export$e99ebfc19ac06f62;
var $106b3d9975284c1d$require$deleteTour = $76e7961079678561$export$50e56048083c79d4;
var $106b3d9975284c1d$require$aliasTopTours = $76e7961079678561$export$bef7f5b87ecd4e05;
var $106b3d9975284c1d$require$getTourStats = $76e7961079678561$export$a2d3e092b567a307;
var $106b3d9975284c1d$require$getMonthlyPlan = $76e7961079678561$export$9f2360ce38e60765;
var $106b3d9975284c1d$require$getToursWithin = $76e7961079678561$export$f0bf44055fab1ca8;
var $106b3d9975284c1d$require$getDistances = $76e7961079678561$export$c76b58cfe053f228;
var $106b3d9975284c1d$require$uploadTourImages = $76e7961079678561$export$b4cc9a7f549f80be;
var $106b3d9975284c1d$require$resizeTourImages = $76e7961079678561$export$3f01106131746282;

var $106b3d9975284c1d$require$protect = $ce487c6e3030a219$export$eda7ca9e36571553;
var $106b3d9975284c1d$require$restrictTo = $ce487c6e3030a219$export$e1bac762c84d3b0c;
const $106b3d9975284c1d$var$router = $j3GD5$express.Router();
$106b3d9975284c1d$var$router.use('/:tourId/reviews', $b14a6d4adc0e87b7$exports);
$106b3d9975284c1d$var$router.route('/top-5-cheap').get($106b3d9975284c1d$require$aliasTopTours, $106b3d9975284c1d$require$getAllTours);
$106b3d9975284c1d$var$router.route('/tour-stats').get($106b3d9975284c1d$require$getTourStats);
$106b3d9975284c1d$var$router.route('/monthly-plan/:year').get($106b3d9975284c1d$require$protect, $106b3d9975284c1d$require$restrictTo('admin', 'lead-guide', 'guide'), $106b3d9975284c1d$require$getMonthlyPlan);
$106b3d9975284c1d$var$router.route('/').get($106b3d9975284c1d$require$getAllTours).post($106b3d9975284c1d$require$protect, $106b3d9975284c1d$require$restrictTo('admin', 'lead-guide'), $106b3d9975284c1d$require$createTour);
$106b3d9975284c1d$var$router.route('/:id').get($106b3d9975284c1d$require$getTour).patch($106b3d9975284c1d$require$protect, $106b3d9975284c1d$require$restrictTo('admin', 'lead-guide'), $106b3d9975284c1d$require$uploadTourImages, $106b3d9975284c1d$require$resizeTourImages, $106b3d9975284c1d$require$updateTour).delete($106b3d9975284c1d$require$protect, $106b3d9975284c1d$require$restrictTo('admin', 'lead-guide'), $106b3d9975284c1d$require$deleteTour);
$106b3d9975284c1d$var$router.route('/tours-within/:distance/center/:latlng/unit/:unit').get($106b3d9975284c1d$require$getToursWithin);
$106b3d9975284c1d$var$router.route('/distance/:latlng/unit/:unit').get($106b3d9975284c1d$require$getDistances);
$106b3d9975284c1d$exports = $106b3d9975284c1d$var$router;


var $6495ec4508b63af1$exports = {};

var $9d2c5b801713c0c3$export$6dfd280b9fe74301;
var $9d2c5b801713c0c3$export$9308575f5c1b4b50;
var $9d2c5b801713c0c3$export$dd7946daa6163e94;
var $9d2c5b801713c0c3$export$8ddaddf355aae59c;
var $9d2c5b801713c0c3$export$8788023029506852;
var $9d2c5b801713c0c3$export$3493b8991d49f558;
var $9d2c5b801713c0c3$export$7cbf767827cd68ba;
var $9d2c5b801713c0c3$export$e3ac7a5d19605772;
var $9d2c5b801713c0c3$export$7d0f10f273c0438a;
var $9d2c5b801713c0c3$export$69093b9c569a5b5b;






var $9d2c5b801713c0c3$require$deleteOne = $227fa3de72c027a5$export$36a479340da3c347;
var $9d2c5b801713c0c3$require$updateOne = $227fa3de72c027a5$export$3220ead45e537228;
var $9d2c5b801713c0c3$require$getOne = $227fa3de72c027a5$export$2eb5ba9a66e42816;
var $9d2c5b801713c0c3$require$getAll = $227fa3de72c027a5$export$2774c37398bee8b2;
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });
const $9d2c5b801713c0c3$var$multerStorage = $j3GD5$multer.memoryStorage();
const $9d2c5b801713c0c3$var$multerFilter = (req, file, cb)=>{
    if (file.mimetype.startsWith('image')) cb(null, true);
    else cb(new $e203200498571e93$exports('Not an Image! Please only upload images', 400), false);
};
const $9d2c5b801713c0c3$var$upload = $j3GD5$multer({
    storage: $9d2c5b801713c0c3$var$multerStorage,
    fileFilter: $9d2c5b801713c0c3$var$multerFilter
});
$9d2c5b801713c0c3$export$6dfd280b9fe74301 = $9d2c5b801713c0c3$var$upload.single('photo');
$9d2c5b801713c0c3$export$9308575f5c1b4b50 = $9e7a345a81ca5826$exports(async (req, res, next)=>{
    if (!req.file) return next();
    const buffer = await $j3GD5$sharp(req.file.buffer).resize(500, 500).toFormat('jpeg').jpeg({
        quality: 90
    }).toBuffer();
    req.file.buffer = buffer;
    next();
});
$9d2c5b801713c0c3$export$dd7946daa6163e94 = (req, res, next)=>{
    req.params.id = req.user.id;
    next();
};
$9d2c5b801713c0c3$export$8ddaddf355aae59c = $9e7a345a81ca5826$exports(async (req, res, next)=>{
    // 1) CREATE ERROR IF USER POSTS PASSWORD DATA
    if (req.body.password || req.body.passwordConfirm) return next(new $e203200498571e93$exports('This route is not for password updates, please use /updatePassword', 400));
    const filterObj = (obj, ...allowedFields)=>{
        const newObj = {};
        Object.keys(obj).forEach((el)=>{
            if (allowedFields.includes(el)) newObj[el] = obj[el];
        });
        return newObj;
    };
    // 2) FILTER OUT UNWANTED FIELD NAMES
    const filteredBody = filterObj(req.body, 'name', 'email');
    if (req.file) {
        const base64Image = req.file.buffer.toString('base64');
        filteredBody.photo = `data:image/jpeg;base64,${base64Image}`;
    }
    const updatedUser = await $ca4b57b91abcd647$exports.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    });
    // 3) UPDATE USER DOCUMENT
    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    });
});
$9d2c5b801713c0c3$export$8788023029506852 = $9e7a345a81ca5826$exports(async (req, res, next)=>{
    await $ca4b57b91abcd647$exports.findByIdAndUpdate(req.user.id, {
        active: false
    });
    res.status(204).json({
        status: 'success',
        data: null
    });
});
$9d2c5b801713c0c3$export$3493b8991d49f558 = (req, res)=>{
    res.status(500).json({
        status: 'error',
        message: 'this route is not defined, please use sign up instead'
    });
};
$9d2c5b801713c0c3$export$7cbf767827cd68ba = $9d2c5b801713c0c3$require$getOne($ca4b57b91abcd647$exports);
$9d2c5b801713c0c3$export$e3ac7a5d19605772 = $9d2c5b801713c0c3$require$updateOne($ca4b57b91abcd647$exports);
$9d2c5b801713c0c3$export$7d0f10f273c0438a = $9d2c5b801713c0c3$require$deleteOne($ca4b57b91abcd647$exports);
$9d2c5b801713c0c3$export$69093b9c569a5b5b = $9d2c5b801713c0c3$require$getAll($ca4b57b91abcd647$exports);


var $6495ec4508b63af1$require$getAllUsers = $9d2c5b801713c0c3$export$69093b9c569a5b5b;
var $6495ec4508b63af1$require$getUser = $9d2c5b801713c0c3$export$7cbf767827cd68ba;
var $6495ec4508b63af1$require$createUser = $9d2c5b801713c0c3$export$3493b8991d49f558;
var $6495ec4508b63af1$require$updateUser = $9d2c5b801713c0c3$export$e3ac7a5d19605772;
var $6495ec4508b63af1$require$deleteUser = $9d2c5b801713c0c3$export$7d0f10f273c0438a;
var $6495ec4508b63af1$require$updateMe = $9d2c5b801713c0c3$export$8ddaddf355aae59c;
var $6495ec4508b63af1$require$deleteMe = $9d2c5b801713c0c3$export$8788023029506852;
var $6495ec4508b63af1$require$getMe = $9d2c5b801713c0c3$export$dd7946daa6163e94;
var $6495ec4508b63af1$require$uploadUserPhoto = $9d2c5b801713c0c3$export$6dfd280b9fe74301;
var $6495ec4508b63af1$require$resizeUserPhoto = $9d2c5b801713c0c3$export$9308575f5c1b4b50;

var $6495ec4508b63af1$require$signup = $ce487c6e3030a219$export$7200a869094fec36;
var $6495ec4508b63af1$require$login = $ce487c6e3030a219$export$596d806903d1f59e;
var $6495ec4508b63af1$require$protect = $ce487c6e3030a219$export$eda7ca9e36571553;
var $6495ec4508b63af1$require$resetPassword = $ce487c6e3030a219$export$dc726c8e334dd814;
var $6495ec4508b63af1$require$forgotPassword = $ce487c6e3030a219$export$66791fb2cfeec3e;
var $6495ec4508b63af1$require$updatePassword = $ce487c6e3030a219$export$e2853351e15b7895;
var $6495ec4508b63af1$require$logout = $ce487c6e3030a219$export$a0973bcfe11b05c9;
const $6495ec4508b63af1$var$router = $j3GD5$express.Router();
$6495ec4508b63af1$var$router.post('/signup', $6495ec4508b63af1$require$uploadUserPhoto, $6495ec4508b63af1$require$resizeUserPhoto, $6495ec4508b63af1$require$signup);
$6495ec4508b63af1$var$router.post('/login', $6495ec4508b63af1$require$login);
$6495ec4508b63af1$var$router.get('/logout', $6495ec4508b63af1$require$logout);
$6495ec4508b63af1$var$router.post('/forgotPassword', $6495ec4508b63af1$require$forgotPassword);
$6495ec4508b63af1$var$router.patch('/resetPassword/:token', $6495ec4508b63af1$require$resetPassword);
$6495ec4508b63af1$var$router.use($6495ec4508b63af1$require$protect);
$6495ec4508b63af1$var$router.patch('/updatePassword', $6495ec4508b63af1$require$updatePassword);
$6495ec4508b63af1$var$router.patch('/updateMe', $6495ec4508b63af1$require$uploadUserPhoto, $6495ec4508b63af1$require$resizeUserPhoto, $6495ec4508b63af1$require$updateMe);
$6495ec4508b63af1$var$router.delete('/deleteMe', $6495ec4508b63af1$require$deleteMe);
$6495ec4508b63af1$var$router.get('/me', $6495ec4508b63af1$require$getMe, $6495ec4508b63af1$require$getUser);
$6495ec4508b63af1$var$router.route('/').get($6495ec4508b63af1$require$getAllUsers).post($6495ec4508b63af1$require$createUser);
$6495ec4508b63af1$var$router.route('/:id').get($6495ec4508b63af1$require$getUser).patch($6495ec4508b63af1$require$updateUser).delete($6495ec4508b63af1$require$deleteUser);
$6495ec4508b63af1$exports = $6495ec4508b63af1$var$router;



var $6e01d007996f5575$exports = {};

const $6e01d007996f5575$var$sendErrorDev = (err, req, res)=>{
    if (req.originalUrl.startsWith('/api')) return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
    return res.status(err.statusCode).render('error', {
        title: 'Something went wrong!',
        msg: err.message
    });
};
const $6e01d007996f5575$var$handleValidationErrorDB = (err)=>{
    const errors = Object.values(err.errors).map((el)=>el.message);
    const message = `Invalid input data. error: ${errors.join('. ')}`;
    return new $e203200498571e93$exports(message, 400);
};
const $6e01d007996f5575$var$handleDuplicateFieldsDB = (err)=>{
    const value = err.message.match(/"(.*?)"/)[0];
    const message = `Duplicate field value ${value}. Please use another value`;
    return new $e203200498571e93$exports(message, 400);
};
const $6e01d007996f5575$var$handleCastErrorDB = (err)=>{
    const message = `Invalid ${err.path}: ${err.value}`;
    return new $e203200498571e93$exports(message, 400);
};
const $6e01d007996f5575$var$handleJWTError = ()=>new $e203200498571e93$exports('Invalid Token please login again!', 401);
const $6e01d007996f5575$var$handleJWTExpiredError = ()=>new $e203200498571e93$exports('Your token has expired, please login again!', 401);
const $6e01d007996f5575$var$sendErrorProd = (err, req, res)=>{
    if (req.originalUrl.startsWith('/api')) {
        if (err.isOperational) return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
        return res.status(500).json({
            status: 'error',
            message: 'Something went wrong!'
        });
    }
    if (err.isOperational) return res.status(err.statusCode).render('error', {
        title: 'Something went wrong!',
        msg: err.message
    });
    return res.status(500).json({
        status: 'error',
        message: 'Something went wrong!',
        msg: err.message
    });
};
$6e01d007996f5575$exports = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    {
        let error = {
            ...err
        };
        error.message = err.message;
        error.name = err.name;
        if (error.name === 'CastError') error = $6e01d007996f5575$var$handleCastErrorDB(error);
        if (error.code === 11000) error = $6e01d007996f5575$var$handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError') error = $6e01d007996f5575$var$handleValidationErrorDB(error);
        if (error.name === 'JsonWebTokenError') error = $6e01d007996f5575$var$handleJWTError();
        if (error.name === 'TokenExpiredError') error = $6e01d007996f5575$var$handleJWTExpiredError();
        $6e01d007996f5575$var$sendErrorProd(error, req, res);
    }
};


var $d1c628f94299c4ef$exports = {};


var $d1c628f94299c4ef$require$protect = $ce487c6e3030a219$export$eda7ca9e36571553;
var $d1c628f94299c4ef$require$isLoggedIn = $ce487c6e3030a219$export$256a5a3564694cfc;
var $8329778d3d9021c1$export$96591984f736b067;
var $8329778d3d9021c1$export$95c4b71b6433cd9b;
var $8329778d3d9021c1$export$754050d979e640b3;
var $8329778d3d9021c1$export$a498a9115c1a3c8e;
var $8329778d3d9021c1$export$4f9234baf34abd0;
var $8329778d3d9021c1$export$904803814e9097f0;
var $8329778d3d9021c1$export$ca89bc660948fd97;
var $8329778d3d9021c1$export$3a9c49fbc167a8c7;
var $e6fceb21b9058688$exports = {};

const $e6fceb21b9058688$var$bookingSchema = new $j3GD5$mongoose.Schema({
    tour: {
        type: $j3GD5$mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [
            true,
            'booking must belong to a tour!'
        ]
    },
    user: {
        type: $j3GD5$mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [
            true,
            'booking must belong to a user!'
        ]
    },
    price: {
        type: Number,
        required: [
            true,
            'Booking must have a price'
        ]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    paid: {
        type: Boolean,
        default: true
    }
});
$e6fceb21b9058688$var$bookingSchema.pre(/^find/, function(next) {
    this.populate('user').populate({
        path: 'tour',
        select: 'name'
    });
    next();
});
const $e6fceb21b9058688$var$Booking = $j3GD5$mongoose.model('Booking', $e6fceb21b9058688$var$bookingSchema);
$e6fceb21b9058688$exports = $e6fceb21b9058688$var$Booking;






$8329778d3d9021c1$export$96591984f736b067 = $9e7a345a81ca5826$exports(async (req, res)=>{
    // 1) GET TOUR DATA FROM COLLECTION
    const tours = await $bbc3395627179bb7$exports.find();
    // 2) BUILD TEMPLATE
    // 3) RENDER THAT TEMPLATE USING TOUR DATA FROM 1)
    res.status(200).render('overview', {
        title: 'All tours',
        tours: tours
    });
});
$8329778d3d9021c1$export$95c4b71b6433cd9b = $9e7a345a81ca5826$exports(async (req, res, next)=>{
    const tour = await $bbc3395627179bb7$exports.findOne({
        slug: req.params.slug
    }).populate({
        path: 'reviews',
        fields: 'review rating user'
    });
    if (!tour) return next(new $e203200498571e93$exports('there is no tour with that name', 404));
    res.status(200).json({
        title: `${tour.name} tour`,
        tour: tour
    });
});
$8329778d3d9021c1$export$754050d979e640b3 = (req, res)=>{
    res.status(200).render('login', {
        title: `login`
    });
};
$8329778d3d9021c1$export$a498a9115c1a3c8e = (req, res)=>{
    res.status(200).render('signup', {
        title: `signup`
    });
};
$8329778d3d9021c1$export$4f9234baf34abd0 = (req, res)=>{
    res.status(200).render('account', {
        title: `Your account`
    });
};
$8329778d3d9021c1$export$904803814e9097f0 = $9e7a345a81ca5826$exports(async (req, res, next)=>{
    // 1) FIND ALL BOOKINGS
    const bookings = await $e6fceb21b9058688$exports.find({
        user: req.user.id
    });
    // 2) FIND TOURS WITH RETURNED ID'S
    const tourIDs = bookings.map((el)=>el.tour);
    const tours = await $bbc3395627179bb7$exports.find({
        _id: {
            $in: tourIDs
        }
    });
    // 3) Render tours
    res.status(200).json({
        title: 'My Tours',
        tours: tours
    });
});
$8329778d3d9021c1$export$ca89bc660948fd97 = $9e7a345a81ca5826$exports(async (req, res, next)=>{
    const updatedUser = await $ca4b57b91abcd647$exports.findByIdAndUpdate(req.user.id, {
        name: req.body.name,
        email: req.body.email
    }, {
        new: true,
        runValidators: true
    });
    res.status(200).render('account', {
        title: `Your account`,
        user: updatedUser
    });
});
$8329778d3d9021c1$export$3a9c49fbc167a8c7 = (req, res, next)=>{
    const { alert: alert } = req.query;
    if (alert === 'booking') res.locals.alert = "Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up immediatly please come back later.";
    next();
};


var $d1c628f94299c4ef$require$getOverview = $8329778d3d9021c1$export$96591984f736b067;
var $d1c628f94299c4ef$require$getTour = $8329778d3d9021c1$export$95c4b71b6433cd9b;
var $d1c628f94299c4ef$require$getLoginForm = $8329778d3d9021c1$export$754050d979e640b3;
var $d1c628f94299c4ef$require$getAccount = $8329778d3d9021c1$export$4f9234baf34abd0;
var $d1c628f94299c4ef$require$updateUserData = $8329778d3d9021c1$export$ca89bc660948fd97;
var $d1c628f94299c4ef$require$getMyTours = $8329778d3d9021c1$export$904803814e9097f0;
var $d1c628f94299c4ef$require$alerts = $8329778d3d9021c1$export$3a9c49fbc167a8c7;
var $d1c628f94299c4ef$require$getSignupForm = $8329778d3d9021c1$export$a498a9115c1a3c8e;
// const { createBookingCheckout } = require('../controllers/bookingController');
const $d1c628f94299c4ef$var$router = $j3GD5$express.Router();
$d1c628f94299c4ef$var$router.use($d1c628f94299c4ef$require$alerts);
// 4) Routes
$d1c628f94299c4ef$var$router.get('/', $d1c628f94299c4ef$require$isLoggedIn, $d1c628f94299c4ef$require$getOverview);
$d1c628f94299c4ef$var$router.get('/tour/:slug', $d1c628f94299c4ef$require$isLoggedIn, $d1c628f94299c4ef$require$getTour);
$d1c628f94299c4ef$var$router.get('/login', $d1c628f94299c4ef$require$isLoggedIn, $d1c628f94299c4ef$require$getLoginForm);
$d1c628f94299c4ef$var$router.get('/signup', $d1c628f94299c4ef$require$isLoggedIn, $d1c628f94299c4ef$require$getSignupForm);
$d1c628f94299c4ef$var$router.get('/me', $d1c628f94299c4ef$require$protect, $d1c628f94299c4ef$require$getAccount);
$d1c628f94299c4ef$var$router.get('/my-tours', $d1c628f94299c4ef$require$protect, $d1c628f94299c4ef$require$getMyTours);
$d1c628f94299c4ef$var$router.post('/submit-user-data', $d1c628f94299c4ef$require$protect, $d1c628f94299c4ef$require$updateUserData);
$d1c628f94299c4ef$exports = $d1c628f94299c4ef$var$router;


var $c689c111c44ce7fd$exports = {};

var $a7c60e9a4daacbdb$export$f1c4cda49673848c;
var $a7c60e9a4daacbdb$export$a93ec902df19e733;
var $a7c60e9a4daacbdb$export$3877e99530b0c773;
var $a7c60e9a4daacbdb$export$98a8f978e5e12ae4;
var $a7c60e9a4daacbdb$export$feb18e3d1b2f382c;
var $a7c60e9a4daacbdb$export$3c5ddba2c6c4ec6f;
var $a7c60e9a4daacbdb$export$b7b1ce5fabd1b486;

const $a7c60e9a4daacbdb$var$stripe = $j3GD5$stripe(undefined);





var $a7c60e9a4daacbdb$require$deleteOne = $227fa3de72c027a5$export$36a479340da3c347;
var $a7c60e9a4daacbdb$require$updateOne = $227fa3de72c027a5$export$3220ead45e537228;
var $a7c60e9a4daacbdb$require$createOne = $227fa3de72c027a5$export$5d49599920443c31;
var $a7c60e9a4daacbdb$require$getOne = $227fa3de72c027a5$export$2eb5ba9a66e42816;
var $a7c60e9a4daacbdb$require$getAll = $227fa3de72c027a5$export$2774c37398bee8b2;

$a7c60e9a4daacbdb$export$f1c4cda49673848c = async (req, res, next)=>{
    try {
        // 1) GET CURRENTLY BOOKED TOUR
        const tour = await $bbc3395627179bb7$exports.findById(req.params.tourId);
        // 2) CREATE THE  CHECKOUT SESSION
        const session = await $a7c60e9a4daacbdb$var$stripe.checkout.sessions.create({
            payment_method_types: [
                'card'
            ],
            mode: 'payment',
            //   success_url: `${req.protocol}://${req.get('host')}/?tour=${req.params.tourId}&user=${req.user.id}&price=${tour.price}`,
            success_url: `${undefined}/my-tours`,
            cancel_url: `${undefined}/tour/${tour.slug}`,
            customer_email: req.user.email,
            client_reference_id: req.params.tourId,
            line_items: [
                {
                    price_data: {
                        currency: 'USD',
                        product_data: {
                            name: `${tour.name} Tour`,
                            description: tour.summary,
                            images: [
                                `${req.protocol}://${req.get('host')}/img/tours/${tour.imageCover}`
                            ]
                        },
                        unit_amount: tour.price * 100
                    },
                    quantity: 1
                }
            ]
        });
        //   3) SEND IT TO THE CLIENT
        res.status(200).json({
            status: 'success',
            session: session
        });
    } catch (error) {
        // console.log(error);
        next(error);
    }
};
const $a7c60e9a4daacbdb$var$createBookingCheckout = async (session)=>{
    const tour = session.client_reference_id;
    const user = (await $ca4b57b91abcd647$exports.findOne({
        email: session.customer_email
    })).id;
    const price = session.amount_total / 100;
    // console.log(tour, user, price);
    await $e6fceb21b9058688$exports.create({
        tour: tour,
        user: user,
        price: price
    });
};
$a7c60e9a4daacbdb$export$a93ec902df19e733 = (req, res, next)=>{
    const signature = req.headers['stripe-signature'];
    let event;
    try {
        event = $a7c60e9a4daacbdb$var$stripe.webhooks.constructEvent(req.body, signature, undefined);
    } catch (error) {
        return res.status(400).send(`Webhook error: ${error.message}`);
    }
    if (event.type === 'checkout.session.completed') $a7c60e9a4daacbdb$var$createBookingCheckout(event.data.object);
    res.status(200).json({
        recieved: true
    });
};
$a7c60e9a4daacbdb$export$3877e99530b0c773 = $a7c60e9a4daacbdb$require$createOne();
$a7c60e9a4daacbdb$export$98a8f978e5e12ae4 = $a7c60e9a4daacbdb$require$getOne();
$a7c60e9a4daacbdb$export$feb18e3d1b2f382c = $a7c60e9a4daacbdb$require$getAll();
$a7c60e9a4daacbdb$export$3c5ddba2c6c4ec6f = $a7c60e9a4daacbdb$require$updateOne();
$a7c60e9a4daacbdb$export$b7b1ce5fabd1b486 = $a7c60e9a4daacbdb$require$deleteOne();


var $c689c111c44ce7fd$require$getCheckoutSession = $a7c60e9a4daacbdb$export$f1c4cda49673848c;
var $c689c111c44ce7fd$require$getAllBookings = $a7c60e9a4daacbdb$export$feb18e3d1b2f382c;
var $c689c111c44ce7fd$require$createBooking = $a7c60e9a4daacbdb$export$3877e99530b0c773;
var $c689c111c44ce7fd$require$getBooking = $a7c60e9a4daacbdb$export$98a8f978e5e12ae4;
var $c689c111c44ce7fd$require$updateBooking = $a7c60e9a4daacbdb$export$3c5ddba2c6c4ec6f;
var $c689c111c44ce7fd$require$deleteBooking = $a7c60e9a4daacbdb$export$b7b1ce5fabd1b486;

var $c689c111c44ce7fd$require$protect = $ce487c6e3030a219$export$eda7ca9e36571553;
var $c689c111c44ce7fd$require$restrictTo = $ce487c6e3030a219$export$e1bac762c84d3b0c;
const $c689c111c44ce7fd$var$router = $j3GD5$express.Router({
    mergeParams: true
});
$c689c111c44ce7fd$var$router.use($c689c111c44ce7fd$require$protect);
$c689c111c44ce7fd$var$router.get('/checkout-session/:tourId', $c689c111c44ce7fd$require$getCheckoutSession);
$c689c111c44ce7fd$var$router.use($c689c111c44ce7fd$require$restrictTo('admin', 'lead-guide'));
$c689c111c44ce7fd$var$router.route('/').get($c689c111c44ce7fd$require$getAllBookings).post($c689c111c44ce7fd$require$createBooking);
$c689c111c44ce7fd$var$router.route('/:id').get($c689c111c44ce7fd$require$getBooking).patch($c689c111c44ce7fd$require$updateBooking).delete($c689c111c44ce7fd$require$deleteBooking);
$c689c111c44ce7fd$exports = $c689c111c44ce7fd$var$router;



var $84a264530b3fb4fb$require$webhookCheckout = $a7c60e9a4daacbdb$export$a93ec902df19e733;
const $84a264530b3fb4fb$var$app = $j3GD5$express();
$84a264530b3fb4fb$var$app.enable('trust proxy');
$84a264530b3fb4fb$var$app.set('view engine', 'pug');
$84a264530b3fb4fb$var$app.set('views', $j3GD5$path.join($84a264530b3fb4fb$var$__dirname, 'views'));
// 1) middle ware
// SERVING STATIC FILES
$84a264530b3fb4fb$var$app.use($j3GD5$express.static($j3GD5$path.join($84a264530b3fb4fb$var$__dirname, 'public')));
const $84a264530b3fb4fb$var$corsOptions = {
    origin: undefined,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204
};
$84a264530b3fb4fb$var$app.use($j3GD5$cors($84a264530b3fb4fb$var$corsOptions));
// COOKIE PARSER
$84a264530b3fb4fb$var$app.use($j3GD5$cookieparser());
const $84a264530b3fb4fb$var$limiter = $j3GD5$expressratelimit({
    max: 1000,
    windowMs: 3600000,
    message: 'Too many requests from this IP, please try again in an hour',
    trustProxy: true
});
// LIMIT REQUESTS FROM SAME API
$84a264530b3fb4fb$var$app.use('/api', $84a264530b3fb4fb$var$limiter);
$84a264530b3fb4fb$var$app.post('/webhook-checkout', $j3GD5$express.raw({
    type: 'application/json'
}), $84a264530b3fb4fb$require$webhookCheckout);
// SECURITY HTTP HEADERS
$84a264530b3fb4fb$var$app.use($j3GD5$helmet());
$84a264530b3fb4fb$var$app.use($j3GD5$helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: [
            '*'
        ],
        scriptSrc: [
            '*'
        ]
    }
}));
// BODY PARSER READING DATA FROM THE BODY TO REQ.BODY
$84a264530b3fb4fb$var$app.use($j3GD5$express.json({
    limit: '10kb'
}));
$84a264530b3fb4fb$var$app.use($j3GD5$express.urlencoded({
    extended: true,
    limit: '10kb'
}));
// DATA SANTISATION AGAINST NOSQL QUERY INJECTION
$84a264530b3fb4fb$var$app.use($j3GD5$expressmongosanitize());
// DATA SANTISATION AGAINST XSS
$84a264530b3fb4fb$var$app.use($j3GD5$xssclean());
// PREVENT PARAMENTER POLLUTION
$84a264530b3fb4fb$var$app.use($j3GD5$hpp({
    whitelist: [
        'duration',
        'ratingsQuantity',
        'average',
        'maxGroupSize',
        'difficulty',
        'price'
    ]
}));
// TEST MIDDLEWARE
$84a264530b3fb4fb$var$app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString();
    next();
});
$84a264530b3fb4fb$var$app.use($j3GD5$compression());
// 4) Routes
$84a264530b3fb4fb$var$app.use('/', $d1c628f94299c4ef$exports);
$84a264530b3fb4fb$var$app.use('/api/v1/tours', $106b3d9975284c1d$exports);
$84a264530b3fb4fb$var$app.use('/api/v1/users', $6495ec4508b63af1$exports);
$84a264530b3fb4fb$var$app.use('/api/v1/reviews', $b14a6d4adc0e87b7$exports);
$84a264530b3fb4fb$var$app.use('/api/v1/bookings', $c689c111c44ce7fd$exports);
$84a264530b3fb4fb$var$app.use($6e01d007996f5575$exports);
module.exports = $84a264530b3fb4fb$var$app;


//# sourceMappingURL=bundle.js.map
