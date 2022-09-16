/// <reference types="Cypress" />
import HomePage from "../support/pageObject/homePage.js";

describe("Home page (not logged in user)", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("url"));
  });

  it("displays banner title", () => {
    HomePage.verifyBannerTitleText("conduit");
  });

  it("displays benner secondary text", () => {
    HomePage.verifyBannerSecondaryText("A place to share your knowledge.");
  });

  it("displays mocked tags", () => {
    HomePage.verifyCustomTagsText();
  });
});

describe("Home page (logged in user)", () => {
  beforeEach(() => {
    cy.fixture("user.json").then(({ login, password }) => {
      cy.loginAPI(login, password);
    });

    cy.visit(Cypress.env("url"));
  });

  it("displays your feed", () => {
    HomePage.verifyYourFeedTabText();
  });

  it("displays global feed", () => {
    HomePage.clickGlobalFeedTab();
  });

  it("displays increased like count for article after clicking button", () => {
    HomePage.clickGlobalFeedTab();
    HomePage.vertiyArticleLikeCount();
  });
});
