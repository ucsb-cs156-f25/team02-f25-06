const recommendationRequestFixtures = {
  oneRecommendationRequest: {
    "id": 1,
    "requesterEmail": "abhiram_agina@ucsb.edu",
    "professorEmail": "ziad.matni@ucsb.edu",
    "explanation": "This is required for M.S. Applications.",
    "dateRequested": "2025-11-04T02:16:00",
    "dateNeeded": "2025-12-25T00:00:00",
    "done": false
  },
  threeRecommendationRequest: [
    {
      "id": 1,
      "requesterEmail": "abhiram_agina@ucsb.edu",
      "professorEmail": "ziad.matni@ucsb.edu",
      "explanation": "This is required for M.S. Applications.",
      "dateRequested": "2025-11-04T02:16:00",
      "dateNeeded": "2025-12-25T00:00:00",
      "done": false
    },
    {
      "id": 2,
      "requesterEmail": "abhiram_agina@ucsb.edu",
      "professorEmail": "phtcon@ucsb.edu",
      "explanation": "This is required for M.S. Applications.",
      "dateRequested": "2025-11-10T00:00:00",
      "dateNeeded": "2025-12-30T00:00:00",
      "done": false
    },
    {
      "id": 3,
      "requesterEmail": "abhiramagina@gmail.com",
      "professorEmail": "phtcon@ucsb.edu",
      "explanation": "This is required for P.H.D. Applications.",
      "dateRequested": "2025-11-10T00:00:00",
      "dateNeeded": "2026-01-01T00:00:00",
      "done": true
    }
  ],
};

export { ucsbRecommendationRequestsFixtures };
