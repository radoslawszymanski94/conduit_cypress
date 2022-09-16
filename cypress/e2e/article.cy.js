/// <reference types="Cypress" />
import NewArticlePage from "../support/pageObject/newArticlePage.js";
import HomePage from "../support/pageObject/HomePage.js";
import UserProfilePage from "../support/pageObject/userProfilePage.js";
import ArticlePage from "../support/pageObject/ArticlePage.js";
import CreatedArticlePage from "../support/pageObject/CreatedArticlePage.js";

describe.only("Article page (not logged in user)", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("url")).then(() => {
      HomePage.clickGlobalFeedTab();
      HomePage.clickArticleReadMoreBtn();
    });
  });

  it("displays article page", () => {
    cy.url().should("include", "/article/");
    ArticlePage.followUserBtn.should("be.visible");
  });
});

describe.only("Article page (logged in user)", () => {
  beforeEach(() => {
    cy.fixture("user.json").then(({ secondLogin, secondPassword }) => {
      cy.loginAPI(secondLogin, secondPassword);
    });
    cy.visit(Cypress.env("url")).then(() => {
      HomePage.clickGlobalFeedTab();
      HomePage.clickArticleReadMoreBtn();
    });
  });

  it("has follow/unfollow functional button", () => {
    ArticlePage.verifyUserFollow();
  });

  it("allows to comment article", () => {
    const commentText = "Test comment";
    ArticlePage.fillInCommentField(commentText);
    ArticlePage.clickPostCommentBtn();
    ArticlePage.verifyPostSubmission(commentText);
  });

  it("allows to delete added comment", () => {
    cy.fixture("article.json").then(({ comment }) => {
      ArticlePage.addCommentToArticle(comment);
      cy.reload();
      cy.contains(comment).parents(".card").find("i.ion-trash-a").click();
    });
  });

  it("allows to add article to favorite", () => {
    ArticlePage.vertifyArticleFavouriteCount();
  });
});

describe("Created article page", () => {
  beforeEach(() => {
    cy.fixture("user.json").then(({ login, password }) => {
      cy.loginAPI(login, password);
    });
    cy.addNewArticle().then(() => {
      cy.visit(Cypress.env("url"));
      HomePage.clickMyAccountBtn();
      UserProfilePage.clickLastCreatedArticleTitle();
    });
  });

  it("allows to delete created article", () => {
    ArticlePage.clickDeleteArticleBtn();
    HomePage.verifyYourFeedTabText();
  });

  it("allows to edit created article", () => {
    ArticlePage.clickEditArticleBtn();
    NewArticlePage.clearArticleForm();
    CreatedArticlePage.deleteArticleTags();
    NewArticlePage.fillInArticleForm("editedArticle");
    NewArticlePage.clickPublishArticleBtn();
    CreatedArticlePage.verifyArticleCreation();
    CreatedArticlePage.verifyEditedArticle();
  });
});

describe("New article page", () => {
  beforeEach(() => {
    cy.fixture("user.json").then(({ login, password }) => {
      cy.loginAPI(login, password);
    });
    cy.visit(Cypress.env("url"));
  });

  it("allows to create new article", () => {
    NewArticlePage.clickNewArticleBtn();
    NewArticlePage.fillInArticleForm("newArticle");
    NewArticlePage.clickPublishArticleBtn();
    NewArticlePage.verifyArticleCreation();
  });
});
