process.env.DATABASE_URL = 'postgres://localhost:5432/contacts_test';
const app = require('../../src/server.js');
const contacts = require('../../src/models/db/contacts.js');
const dbHelper = require('../helpers/db')

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);

const db = require('../../src/models/db/db.js');
const testApi = chai.request('http://localhost:3000');

describe('Testing snapshot 446', () => {
  describe('end to end testing: test the http routes exposed in the server', () => {

    beforeEach('reset the DB', () => {
      return dbHelper.initDB()
    });

    it('index page is rendered and all contacts are being received', done => {
      testApi.get('/').end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.include("<h1>Contacts</h1>");
        expect(res.text).to.include(`<a class="contact-link" href="/contacts/6">`);
        done();
      });
    });
    it('checks that the correct page is rendered', done => {
      testApi.get('/contacts/new')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.include("<h1>New Contact</h1>")
        done()
      })
    })
    it('saves contact data to the database', done => {
      testApi.post('/contacts')
      .type('form')
      .send({ first_name: 'Justin', last_name: 'Haaheim' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.redirectTo('http://localhost:3000/contacts/11');
        done();
     })
  })
  it('makes sure the correct data is returned', done => {
    testApi.get('/contacts/6')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.text).to.include(`<form action="/contacts/6?_method=DELETE" method="POST">`);
      done()
    })
  })
  it('makes sure the correct data is deleted', done => {
    testApi.delete('/contacts/5')
    .end((err, res) => {
      expect(res).to.redirectTo('http://localhost:3000/');
      done()
    })
  })
  it('checks that the search is returning the correct data and rendering the correct page', done => {
    testApi.get('/contacts/search')
    .type('form')
    .query({ q: 'LaToya'})
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.text).to.include('LaToya&nbsp;Williams');
      done()
    })
  })
})
})
