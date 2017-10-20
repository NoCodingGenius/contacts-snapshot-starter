process.env.DATABASE_URL = 'postgres://localhost:5432/contacts_test';
const app = require('../../src/server.js');

const chai = require('chai');
const expect = require('chai').expect;
const test = require('selenium-webdriver/testing');
webdriver = require('selenium-webdriver');

test.describe('UI Test: Use a headless browser testing library', function () {
  test.it('I should see a form which lets me create a new contact', function () {
    this.timeout(10000);

    var driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

    driver.get('http://localhost:3000/contacts/new')

    driver.executeScript('return document.getElementById("new-contact-form").elements.length')
    .then((return_value) => {
      expect(return_value).to.equal(3);
    });
    driver.quit();
  })
  test.it('I should see a list of contacts on the page', function () {
    this.timeout(10000);

    var driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

    driver.get('http://localhost:3000/')

    driver.executeScript('return document.getElementsByClassName("contact-link")')
    .then((return_value) => {
      expect(return_value[100].id_.state_).to.equal('fulfilled');
    });
    driver.quit();
  })
})
