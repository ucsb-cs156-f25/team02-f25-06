const menuItemReviewFixtures = {
  oneReview: {
    id: 1,
    itemId: 1,
    reviewerEmail: "julia_lin@ucsb.edu",
    stars: 5,
    dateReviewed: "2025-11-02T06:01:44.307",
    comments: "so delicious i think i saw god",
  },
  threeReviews: [
    {
      id: 1,
      itemId: 1,
      reviewerEmail: "julia_lin@ucsb.edu",
      stars: 5,
      dateReviewed: "2025-11-02T06:01:44.307",
      comments: "so delicious i think i saw god",
    },
    {
      id: 2,
      itemId: 2,
      reviewerEmail: "julia_lin@ucsb.edu",
      stars: 2,
      dateReviewed: "2025-11-01T23:04:00",
      comments: "was edible",
    },
    {
      id: 3,
      itemId: 3,
      reviewerEmail: "julia_lin@ucsb.edu",
      stars: 1,
      dateReviewed: "2025-11-01T23:04:20",
      comments: "this is not for humans",
    },
  ],
};

export { menuItemReviewFixtures };
