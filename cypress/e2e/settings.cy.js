/// <reference types="Cypress" />
import SettingsPage from "../support/pageObject/SettingsPage.js";
import HomePage from "../support/pageObject/HomePage.js";

describe("Settings page", () => {
  beforeEach(() => {
    cy.fixture("user.json").then(({ login, password }) => {
      cy.loginAPI(login, password);
    });
    cy.visit(Cypress.env("url"));
    SettingsPage.clickSettingsBtn();
  });

  it("allows to update user profile data", () => {
    SettingsPage.fillInUserSettingsInputs();
    SettingsPage.verifyUpdatedUserProfile();
  });

  it("allows to logout logged in user", () => {
    SettingsPage.logoutUser();
    HomePage.verifyBannerTitleText("conduit");
  });
});
