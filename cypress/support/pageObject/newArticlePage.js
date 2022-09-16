class NewArticlePage {
  get newArticleBtn() {
    return cy.get(".ion-compose").parent();
  }

  get newArticleTitleInput() {
    return cy.get('input[placeholder="Article Title"]');
  }

  get newAticleAboutInput() {
    return cy.get('input[placeholder="What\'s this article about?"]');
  }

  get newArticleBodyInput() {
    return cy.get("textarea[placeholder='Write your article (in markdown)']");
  }

  get newArticleTagsInput() {
    return cy.get('input[placeholder="Enter tags"]');
  }

  get publishNewArticleBtn() {
    return cy.contains("Publish");
  }

  enterNewArticleTitle(text) {
    const currentTime = new Date().toLocaleString();
    this.newArticleTitleInput.type(text + " " + currentTime);
  }

  enterNewArticleAbout(text) {
    this.newAticleAboutInput.type(text);
  }

  enterNewArticleBody(text) {
    this.newArticleBodyInput.type(text);
  }

  enterNewArticleTags(text) {
    this.newArticleTagsInput.type(text);
    this.newArticleTagsInput.type("{enter}");
  }

  clickNewArticleBtn() {
    this.newArticleBtn.click();
  }

  clickPublishArticleBtn() {
    this.publishNewArticleBtn.click();
  }

  fillInArticleForm(articleData) {
    cy.fixture("article.json").then((article) => {
      const { title, body, about, tags } = article[articleData];
      this.enterNewArticleTitle(title);
      this.enterNewArticleAbout(about);
      this.enterNewArticleBody(body);
      this.enterNewArticleTags(tags);
    });
  }

  clearArticleForm() {
    this.newArticleTitleInput.clear();
    this.newAticleAboutInput.clear();
    this.newArticleBodyInput.clear();
    this.newArticleTagsInput.clear();
  }
}

export default new NewArticlePage();
