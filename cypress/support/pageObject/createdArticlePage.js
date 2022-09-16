class CreatedArticlePage {
  get articleTitle() {
    return cy.get(".container").find("h1");
  }

  get articleBody() {
    return cy.get(".article-content").find("p").parents(".ng-binding");
  }

  get articleTags() {
    return cy.get(".tag-list").find("li");
  }

  get editArticleBtn() {
    return cy.contains("Edit Article");
  }

  get deleteArticleBtn() {
    return cy.contains("Delete Article");
  }

  get deleteTagBtn() {
    return cy.get(".ion-close-round");
  }

  verifyArticleCreation() {
    cy.url().should("contain", "article");
    this.editArticleBtn.should("be.visible");
    this.deleteArticleBtn.should("be.visible");
  }

  deleteArticleTags() {
    this.deleteTagBtn.each((btn) => btn.click());
  }

  verifyEditedArticle() {
    this.articleTitle.should("contain.text", "edited");
    this.articleBody.should("contain.text", "edited");
    this.articleTags.should("contain.text", "edited");
  }
}

export default new CreatedArticlePage();
