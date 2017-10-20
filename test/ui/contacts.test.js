process.env.DATABASE_URL = 'postgres://localhost:5432/contacts_test';
const app = require('../../src/server.js');
const dbHelper = require('../helpers/db')

const chai = require('chai');
const expect = require('chai').expect;
const test = require('selenium-webdriver/testing');
webdriver = require('selenium-webdriver');

const By = webdriver.By;

test.describe('UI Test: Use a headless browser testing library', function () {

  beforeEach('reset the DB', () => {
    return dbHelper.initDB()
  });

  after('reset the test', () => {
    driver.close();
    driver.quit();
  })

  const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

  test.it('I should see a form which lets me create a new contact', function () {
    this.timeout(10000);

    driver.get('http://localhost:3000/contacts/new')
    driver.findElement(By.className('new-contact-form'))
    .then(element => element.isDisplayed())
    .then(isFormDisplayed => {
      expect(isFormDisplayed).to.equal(true);
    })
  })
  test.it('I should see a list of contacts on the page', function () {
    this.timeout(10000);

    driver.get('http://localhost:3000/')
    driver.findElement(By.className('contact-link'))
    .then(element => element.isDisplayed())
    .then(isContactDisplayed => {
      expect(isContactDisplayed).to.equal(true);
    })
  })
})
