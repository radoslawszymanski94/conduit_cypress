class HomePage {
  get bannerTitleText() {
    return cy.get(".banner").find("h1");
  }

  get bannerSecondaryText() {
    return cy.get(".banner").find("p");
  }

  get popularTags() {
    return cy.get(".tag-list").children();
  }

  get myAccountBtn() {
    return cy.get(".user-pic").parent();
  }

  get articleAuthorName() {
    return cy.get(".info").find(".author");
  }

  get articleDate() {
    return cy.get(".info").find(".date");
  }

  get articleTitle() {
    return cy.get(".preview-link").find("h1");
  }

  get articleDescription() {
    return cy.get(".preview-link").find("h1");
  }

  get articleReadMoreBtn() {
    return cy.get(".preview-link").find("span").eq(0);
  }

  get articleLikeCountBtn() {
    return cy.get(".ion-heart").parent().eq(0);
  }

  get yourFeedTab() {
    return cy.get(".feed-toggle").find("a.nav-link").contains("Your Feed");
  }

  get globalFeedTab() {
    return cy.get(".feed-toggle").find("a.nav-link").contains("Global Feed");
  }

  clickNewArticleBtn() {
    this.newArticleBtn.click();
  }

  clickMyAccountBtn() {
    this.myAccountBtn.click();
  }

  verifyBannerTitleText(text) {
    this.bannerTitleText.should("have.text", text);
  }

  verifyBannerSecondaryText(text) {
    this.bannerSecondaryText.should("have.text", text);
  }

  verifyCustomTagsText() {
    cy.intercept("GET", "**/tags", {
      fixture: "tags.json",
    }).as("tagRequest");
    cy.wait("@tagRequest");
    this.popularTags
      .should("contain", "javascript")
      .and("contain", "python")
      .and("contain", "java")
      .and("contain", "html");
  }

  verifyArticleAuthor(name) {
    this.articleAuthorName.should("have.text", name);
  }

  verifyArticleDate(date) {
    this.articleDate.should("have.text", date);
  }

  verifyArticleTitle(title) {
    this.articleTitle.should("have.text", title);
  }

  verifyArticleDescription(description) {
    this.articleDescription.should("have.text", description);
  }

  clickArticleReadMoreBtn() {
    this.articleReadMoreBtn.click({ force: true });
  }

  clickArticleLikeCountBtn() {
    this.articleLikeCountBtn.click();
  }

  verifyYourFeedTabText() {
    this.yourFeedTab.should("contain.text", "Your Feed");
  }

  clickYourFeedTab() {
    this.yourFeedTab.click();
  }

  clickGlobalFeedTab() {
    this.globalFeedTab.click();
  }

  verifyArticleLikeCount() {
    this.articleLikeCountBtn.then((btn) => {
      const btnNumber = parseInt(btn.text());
      cy.intercept("**/favorite", { statusCode: 200 }).as("likeBtnRequest");

      this.clickArticleLikeCountBtn();

      cy.wait("@likeBtnRequest").then(() => {
        const btnNumberClicked = parseInt(btn.text());
        if (btn.hasClass("btn-outline-primary")) {
          expect(btnNumberClicked).to.equal(btnNumber - 1);
        } else {
          expect(btnNumberClicked).to.equal(btnNumber + 1);
        }
      });
    });
  }
}

export default new HomePage();
