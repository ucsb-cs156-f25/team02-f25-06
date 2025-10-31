import React from "react";
import ArticlesTable from "main/components/Articles/ArticlesTable";
import { articlesFixtures } from "fixtures/articlesFixtures";
import { currentUserFixtures } from "fixtures/currentUserFixtures";
import { http, HttpResponse } from "msw"; // mock interactions with the backend even if its not actually connected

export default {
  title: "components/Articles/ArticlesTable",
  component: ArticlesTable,
};

const Template = (args) => {
  return <ArticlesTable {...args} />;
};

export const Empty = Template.bind({});

Empty.args = {
  articles: [],
  currentUser: currentUserFixtures.userOnly,
}; // no articles, user has logged in

export const ThreeItemsOrdinaryUser = Template.bind({});

ThreeItemsOrdinaryUser.args = {
  articles: articlesFixtures.threeArticles,
  currentUser: currentUserFixtures.userOnly,
};

export const ThreeItemsAdminUser = Template.bind({});
ThreeItemsAdminUser.args = {
  articles: articlesFixtures.threeArticles,
  currentUser: currentUserFixtures.adminUser,
};

ThreeItemsAdminUser.parameters = {
  msw: [
    http.delete("/api/articles", () => {
      return HttpResponse.json(
        { message: "Article deleted successfully" },
        { status: 200 },
      ); // back bankend to test delete based on the fixtures
    }),
  ],
};
