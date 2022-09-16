/// <reference types="Cypress" />
import HomePage from "../support/pageObject/HomePage.js";
import UserProfilePage from "../support/pageObject/userProfilePage.js";

describe("User profile page", () => {
  beforeEach(() => {
    cy.fixture("user.json").then(({ login, password }) => {
      cy.loginAPI(login, password);
    });
    cy.visit(Cypress.env("url"));
    cy.addNewArticle().then(() => {
      cy.visit(Cypress.env("url"));
      HomePage.clickMyAccountBtn();
      UserProfilePage.clickMyArticlesTab();
    });
  });

  it.only("displays liked articles in favorited articles tab", () => {
    UserProfilePage.clickLikeBtnOnCreatedArticle();
    UserProfilePage.verifyMyArticleAddedToFavorited();
  });
  it("doesn't display unfavorited article in favorited articles tab", () => {
    UserProfilePage.verifyMyArticleDeletedFromFavorited();
  });
});
