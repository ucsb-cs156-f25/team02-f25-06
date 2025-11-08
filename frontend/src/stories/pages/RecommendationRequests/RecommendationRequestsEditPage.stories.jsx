import React from "react";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import { http, HttpResponse } from "msw";

import RecommendationRequestsEditPage from "main/pages/RecommendationRequests/RecommendationRequestsEditPage";
import { recommendationRequestFixtures } from "fixtures/recommendationRequestFixtures";

export default {
  title: "pages/RecommendationRequests/RecommendationRequestsEditPage",
  component: RecommendationRequestsEditPage,
};

const Template = () => <RecommendationRequestsEditPage storybook={true} />;

export const Default = Template.bind({});
Default.parameters = {
  msw: [
    http.get("/api/currentUser", () => {
      return HttpResponse.json(apiCurrentUserFixtures.userOnly, {
        status: 200,
      });
    }),
    http.get("/api/systemInfo", () => {
      return HttpResponse.json(systemInfoFixtures.showingNeither, {
        status: 200,
      });
    }),
    http.get("/api/recommendationrequests", () => {
      return HttpResponse.json(
        recommendationRequestFixtures.threeRecommendationRequest[0],
        {
          status: 200,
        },
      );
    }),
    http.put("/api/recommendationrequests", () => {
      //window.alert("PUT: " + req.url + " and body: " + req.body);
      return HttpResponse.json(
        {
          id: 17,
          requesterEmail: "abhiram_agina@ucsb.edu.edit",
          professorEmail: "ziad.matni@ucsb.edu.edit",
          explanation: "This is required for M.S. Applications. I think",
          dateRequested: "2025-11-04T03:16",
          dateNeeded: "2025-12-25T01:00",
          done: true,
        },
        { status: 200 },
      );
    }),
  ],
};
