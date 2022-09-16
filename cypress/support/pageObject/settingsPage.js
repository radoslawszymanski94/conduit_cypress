class SettingsPage {
  get settingsBtn() {
    return cy.get(".ion-gear-a").parent();
  }

  get settingsProfilePictureInput() {
    return cy.get("input[placeholder='URL of profile picture']");
  }

  get settingsUsernameInput() {
    return cy.get("input[placeholder='Username']");
  }

  get settingsShortBioInput() {
    return cy.get("textarea[placeholder='Short bio about you']");
  }

  get settingsEmailInput() {
    return cy.get("input[placeholder='Email']");
  }

  get settingsNewPasswordInput() {
    return cy.get("input[placeholder='New Password']");
  }

  get settingsUpdateSettingsBtn() {
    return cy.get("button").contains("Update Settings");
  }

  get settingsLogoutBtn() {
    return cy.get(".btn-outline-danger");
  }

  clickSettingsBtn() {
    this.settingsBtn.click();
  }

  enterProfilePictureUrl(text) {
    this.settingsProfilePictureInput.type(text);
  }

  enterUsername(text) {
    this.settingsUsernameInput.type(text);
  }

  enterShortBio(text) {
    this.settingsShortBioInput.type(text);
  }

  enterEmail(text) {
    this.settingsEmailInput.type(text);
  }

  enterNewPassword(text) {
    this.settingsNewPasswordInput.type(text);
  }

  clickUpdateSettingsBtn() {
    this.settingsUpdateSettingsBtn.click();
  }

  clickLogoutBtn() {
    this.settingsLogoutBtn.click();
  }

  fillInUserSettingsInputs() {
    this.clearSettingsForm();
    cy.fixture("user.json").then(
      ({
        userProfile: { profilePictureUrl, username, bio, email, newPassword },
      }) => {
        this.enterProfilePictureUrl(profilePictureUrl);
        this.enterUsername(username);
        this.enterShortBio(bio);
        this.enterEmail(email);
        this.enterNewPassword(newPassword);
      }
    );
    this.clickUpdateSettingsBtn();
  }

  clearSettingsForm() {
    this.settingsProfilePictureInput.clear();
    this.settingsUsernameInput.clear();
    this.settingsShortBioInput.clear();
    this.settingsEmailInput.clear();
    this.settingsNewPasswordInput.clear();
  }

  verifyUpdatedUserProfile() {
    cy.fixture("user.json").then(({ userProfile: { username } }) => {
      cy.url().should("include", username);
    });
  }

  logoutUser() {
    this.clickLogoutBtn();
  }
}

export default new SettingsPage();
