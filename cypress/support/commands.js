// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
Cypress.Commands.add("loginAPI", (email, password) => {
  cy.request({
    method: "POST",
    url: Cypress.env("urlApi") + "api/users/login",
    body: {
      user: { email, password },
    },
  }).then((res) => {
    window.localStorage.setItem("jwtToken", res.body.user.token);
  });
});

Cypress.Commands.add("getLoginToken", (email, password) => {
  cy.request({
    method: "POST",
    url: Cypress.env("urlApi") + "api/users/login",
    body: {
      user: { email, password },
    },
  }).then((res) => {
    return res.body.user.token;
  });
});

Cypress.Commands.add("addCommentToArticle", (articleName, commentText) => {
  cy.fixture("user.json").then(({ login, password }) => {
    cy.getLoginToken(login, password).then((token) => {
      cy.request({
        method: "POST",
        url:
          Cypress.env("urlApi") + "api/articles/" + articleName + "/comments",
        body: {
          comment: { body: commentText },
        },
        headers: {
          authorization: "Token " + token,
        },
      }).then(() => {
        cy.log("Comment added successfully to article named " + articleName);
      });
    });
  });
});

Cypress.Commands.add("addNewArticle", () => {
  cy.fixture("article.json").then(
    ({ newArticle: { title, about, body, tags } }) => {
      cy.fixture("user.json").then(({ login, password }) => {
        cy.getLoginToken(login, password).then((token) => {
          const time = new Date().toLocaleString();
          cy.request({
            method: "POST",
            url: Cypress.env("urlApi") + "api/articles/",
            body: {
              article: {
                title: title + " " + time,
                description: about,
                body,
                tagList: [tags],
              },
            },
            headers: {
              authorization: "Token " + token,
            },
          }).then(() => {
            cy.log("Article added successfully");
          });
        });
      });
    }
  );
});
