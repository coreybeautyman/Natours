const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');

const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require('./handlerFactory');

exports.setTourUserIds = (req, res, next) => {
  // NESTED ROUTES
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getMyReviews = catchAsync(async (req, res, next) => {
  console.log('WORKINGGGG');
  const reviews = await Review.find({ user: req.user.id });

  console.log('REVIEWWWWWS:', reviews);

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: { reviews },
  });
});

exports.getAllReviews = getAll(Review);

exports.createReview = createOne(Review);

exports.deleteReview = deleteOne(Review);

exports.updateReview = updateOne(Review);

exports.getReview = getOne(Review);
