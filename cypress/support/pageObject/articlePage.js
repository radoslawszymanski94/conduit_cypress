class ArticlePage {
  get followUserBtn() {
    return cy.get(".ion-plus-round").parent().eq(0);
  }

  get editArticleBtn() {
    return cy.get(".ion-edit").parent().eq(0);
  }

  get deleteArticleBtn() {
    return cy.get(".ion-trash-a").parent().eq(0);
  }

  get articleAuthorName() {
    return cy.get(".banner").find("a.author");
  }

  get addArticleToFavoriteBtn() {
    return cy.contains("Favorite").eq(0);
  }

  get favoriteCountNumber() {
    return cy.get(".counter");
  }

  get commentField() {
    return cy.get(".card-block").find("textarea");
  }

  get postCommentBtn() {
    return cy.get(".card-footer").find("button");
  }

  get deleteCommentBtn() {
    return cy.get(".card-footer").find("i.ion-trash-a");
  }

  get commentCard() {
    return cy.get(".card");
  }

  deleteComment() {
    this.deleteCommentBtn.click();
  }

  clickFollowUserBtn() {
    this.followUserBtn.click();
  }

  clickEditArticleBtn() {
    this.editArticleBtn.click();
  }

  clickDeleteArticleBtn() {
    this.deleteArticleBtn.click();
  }

  fillInCommentField(text) {
    this.commentField.type(text);
  }

  clickPostCommentBtn() {
    this.postCommentBtn.click();
  }

  clickArticleFavoriteBtn() {
    this.addArticleToFavoriteBtn.click();
  }

  verifyPostSubmission(text) {
    cy.contains(text).should("be.visible");
  }

  verifyArticleCommentVisibility(comment) {
    cy.contains(comment)
      .parents(this.commentCard)
      .find("i.ion-trash-a")
      .click();
  }

  addCommentToArticle(comment) {
    cy.intercept("GET", "**/comments").as("comments");
    cy.wait("@comments").then((res) => {
      let articleName = res.response.url.split("/");
      cy.addCommentToArticle(articleName[articleName.length - 2], comment);
    });
  }

  verifyUserFollow() {
    this.followUserBtn.then((followBtn) => {
      this.clickFollowUserBtn();
      const followBtnText = followBtn.text();
      this.articleAuthorName.then((author) => {
        const articleAuthorText = author.text();
        if (followBtnText.includes("Follow")) {
          expect(followBtnText).to.contain("Follow " + articleAuthorText);
        } else {
          expect(followBtnText).to.contain("Unfollow " + articleAuthorText);
        }
      });
    });
  }

  vertifyArticleFavouriteCount() {
    this.addArticleToFavoriteBtn.then((btn) => {
      const btnText = btn.text().match(/\d/g).join("");
      const btnNumber = parseInt(btnText);
      cy.intercept("**/favorite", { statusCode: 200 }).as("favoriteBtnRequest");

      this.clickArticleFavoriteBtn();

      cy.wait("@favoriteBtnRequest").then(() => {
        const clickedBtnText = btn.text().match(/\d/g).join("");
        const clickedBtnNumber = parseInt(clickedBtnText);
        if (btn.hasClass("btn-outline-primary")) {
          expect(clickedBtnNumber).to.equal(btnNumber - 1);
        } else {
          expect(clickedBtnNumber).to.equal(btnNumber + 1);
        }
      });
    });
  }
}

export default new ArticlePage();
