process.env.DATABASE_URL = 'postgres://localhost:5432/contacts_test';
const app = require('../../../src/server.js');
const contacts = require('../../../src/models/db/contacts.js');
const db = require('../../../src/models/db/db.js');

const chai = require('chai');
const expect = require('chai').expect;

describe('Testing Snapshot 446', () => {

  describe('Intergration tsting: write test to test all the database functions', () => {
    it('a test to test the create function', () => {
      return contacts.create({ first_name: 'Fode', last_name: 'Diop' }).then((result) => {
        expect(result).to.be.an('array');
      })
    })
    it('a test to test the findAll function', () => {
      return contacts.findAll().then((result) => {
        expect(result[0].first_name).to.equal('Jared');
      })
    })
    it('a test to test the findById function', () => {
      return contacts.findById('3').then((result) => {
        expect(result).to.deep.equal({ id: 3, first_name: 'NeEddra', last_name: 'James' });
      })
    })
    it('a test to test the destroy function', () => {
      return contacts.destroy('2').then((result) => {
        expect(result).to.deep.equal([]);
    })
  })
  it('a test to test the search function', () => {
    return contacts.search('alex').then((result) => {
      expect(result).to.deep.equal([{ id: 6, first_name: 'Alex', last_name: 'Waite' }]);
  })
})
})
})
