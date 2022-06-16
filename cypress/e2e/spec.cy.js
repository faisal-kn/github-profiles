const userData = {
  login: "faisal-kn",
  id: 78290493,
  node_id: "MDQ6VXNlcjc4MjkwNDkz",
  avatar_url: "https://avatars.githubusercontent.com/u/78290493?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/faisal-kn",
  html_url: "https://github.com/faisal-kn",
  followers_url: "https://api.github.com/users/faisal-kn/followers",
  following_url:
    "https://api.github.com/users/faisal-kn/following{/other_user}",
  gists_url: "https://api.github.com/users/faisal-kn/gists{/gist_id}",
  starred_url: "https://api.github.com/users/faisal-kn/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/faisal-kn/subscriptions",
  organizations_url: "https://api.github.com/users/faisal-kn/orgs",
  repos_url: "https://api.github.com/users/faisal-kn/repos",
  events_url: "https://api.github.com/users/faisal-kn/events{/privacy}",
  received_events_url: "https://api.github.com/users/faisal-kn/received_events",
  type: "User",
  site_admin: false,
  name: null,
  company: null,
  blog: "",
  location: null,
  email: null,
  hireable: null,
  bio: null,
  twitter_username: null,
  public_repos: 32,
  public_gists: 0,
  followers: 9,
  following: 19,
  created_at: "2021-01-31T04:51:33Z",
  updated_at: "2022-06-12T19:14:02Z",
};

import repoData from "../fixtures/repoData.json";

describe("githib-profiles application testing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("should display search", () => {
    cy.get("#search").should("be.visible");
  });
  it("should have github users data", () => {
    cy.intercept("GET", "https://api.github.com/users/faisal-kn", {
      status: "OK",
      ...userData,
      code: 200,
    }).as("getUser");
    cy.intercept(
      "GET",
      "https://api.github.com/users/faisal-kn/repos?sort=created",
      repoData
    ).as("getRepos");
    cy.get("#search").type("faisal-kn{enter}");
    cy.wait("@getUser");
    cy.wait("@getRepos");
    cy.get("#user-card").should("be.visible");
    cy.get("#follower-count").should("have.text", 9);
    cy.get("#following-count").should("have.text", 19);
    cy.get("#repo-count").should("have.text", 32);
    cy.get("#repo-container")
      .children()
      .each(($el, index, $list) => {
        cy.wrap($el).should("exist");
        cy.wrap($el).should("have.text", repoData[index].name);
      });
  });
});
