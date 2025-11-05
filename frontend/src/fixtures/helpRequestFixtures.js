const helpRequestsFixtures = {
    oneHelpRequest: {
        id: 1,
        requesterEmail: "andrewshen@ucsb.edu",
        teamId: "team06",
        tableOrBreakoutRoom: "table06",
        requestTime: "2025-11-03T13:00:00",
        explanation: "I need help",
        solved: false
    },
    threeHelpRequest: [
        {
            id: 1,
            requesterEmail: "natalieforte@ucsb.edu",
            teamId: "team06",
            tableOrBreakoutRoom: "table06",
            requestTime: "2025-10-31T09:00:00",
            explanation: "My computer exploded",
            solved: false
        },
        {
            id: 2,
            requesterEmail: "abhiram_agina@ucsb.edu",
            teamId: "team07",
            tableOrBreakoutRoom: "table07",
            requestTime: "2025-10-30T12:00:00",
            explanation: "Please help me",
            solved: false
        },
        {
            id: 3,
            requesterEmail: "austinchan@ucsb.edu",
            teamId: "team08",
            tableOrBreakoutRoom: "table08",
            requestTime: "2025-10-29T16:00:00",
            explanation: "I have no Wifi",
            solved: true
        },
    ],
};

export { helpRequestsFixtures };
