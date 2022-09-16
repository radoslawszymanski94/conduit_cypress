class UserProfilePage {
  get myArticlesTab() {
    return cy.contains("My Articles");
  }

  get lastCreatedArticleTitle() {
    return cy.get(".article-preview").find("h1").eq(0);
  }

  get favoritedArticlesTab() {
    return cy.contains("Favorited Articles");
  }

  get likeArticleBtn() {
    return cy.get("favorite-btn").find("button").eq(0);
  }

  clickFavoritedArticlesTab() {
    this.favoritedArticlesTab.click();
  }

  clickMyArticlesTab() {
    this.myArticlesTab.click();
  }

  clickLastCreatedArticleTitle() {
    this.lastCreatedArticleTitle.click({ force: true });
  }

  clickLikeBtnOnCreatedArticle() {
    this.likeArticleBtn.click({ force: true });
  }

  verifyMyArticleAddedToFavorited() {
    this.lastCreatedArticleTitle.then((element) => {
      this.clickFavoritedArticlesTab();
      cy.contains(element.text());
    });
  }

  verifyMyArticleDeletedFromFavorited() {
    this.lastCreatedArticleTitle.then((element) => {
      let createdArticleTitle = element.text();
      this.clickLikeBtnOnCreatedArticle();
      this.clickFavoritedArticlesTab();
      this.clickLikeBtnOnCreatedArticle();
      cy.reload();
      this.clickFavoritedArticlesTab();
      expect(createdArticleTitle).to.not.be.visible();
    });
  }
}

export default new UserProfilePage();
