const chai = require('chai');
const chaiHttp = require('chai-http');
const { modifySKUItem } = require('../modules/DAOs/SKUItemDAO');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);

describe('test SKUItem APIs', () => {

    beforeEach(async () => {
        await agent.delete('/api/skuitems');
    })

    getAllSKUItems(200, '123123123', ['123123123', 1, 10, '2021/11/29 12:30']);
    getSKUItem(200, '123123123', ['123123123', 1, 10, '2021/11/29 12:30']);
    getSKUItem(422);
    getSKUItemsBySKUId(200, 1, ['123123123', 1, 1, '2021/11/29 12:30']);
    getSKUItemsBySKUId(422);
    addSKUItem(201, '123123123', ['123123123', 1, 10, '2021/11/29 12:30']);
    addSKUItem(422);
    modifySKUItem(200, '123123123', ['123123123', 1, 10, '2021/11/29 12:30'], ['321321', 1, '2021/11/22 12:30']);
    modifySKUItem(422);
    deleteSKUItem(200, '123123123', ['123123123', 1, 10, '2021/11/29 12:30']);
    deleteSKUItem(422);
});

function getAllSKUItems(expectedHTTPStatus, RFID, SKUItem) {
    it('getting all SKUItems data from the system', function (done) {
        agent.post('/api/skuitem')
            .send(SKUItem)
            .then(function (res) {
                res.should.have.status(201);
                agent.get('/api/skuitems')
                    .then(function (r) {
                        r.should.have.status(expectedHTTPStatus);
                        r.body.RFID.should.equal(RFID);
                        r.body.SKUId.should.equal(SKUItem.SKUId);
                        r.body.available.should.equal(SKUItem.available);
                        r.body.dateOfStock.should.equal(SKUItem.dateOfStock);
                        done();
                    });
            });
    });
}

function getSKUItemsBySKUId(expectedHTTPStatus, SKUId, SKUItem) {
    it('getting SKUItem data from the system', function (done) {
        if (RFID !== undefined) {
            agent.post('/api/skuitem')
                .send(SKUItem)
                .then(function (res) {
                    res.should.have.status(201);
                    agent.get('/api/skuitems/sku/' + SKUId)
                        .then(function (r) {
                            r.should.have.status(expectedHTTPStatus);
                            r.body.RFID.should.equal(SKUItem.RFID);
                            r.body.SKUId.should.equal(SKUId);
                            r.body.available.should.equal(SKUItem.available);
                            r.body.dateOfStock.should.equal(SKUItem.dateOfStock);
                            done();
                        });
                });
        }
        else {
            agent.get('/api/skuitems/sku/') //we are not sending the id
                .then(function (res) {
                    res.should.have.status(expectedHTTPStatus);
                    done();
                });
        }
    });
}

function getSKUItem(expectedHTTPStatus, RFID, SKUItem) {
    it('getting SKUItem data from the system', function (done) {
        if (RFID !== undefined) {
            agent.post('/api/skuitem')
                .send(SKUItem)
                .then(function (res) {
                    res.should.have.status(201);
                    agent.get('/api/skuitems/'+ RFID)
                        .then(function (r) {
                            r.should.have.status(expectedHTTPStatus);
                            r.body.RFID.should.equal(RFID);
                            r.body.SKUId.should.equal(SKUItem.SKUId);
                            r.body.available.should.equal(SKUItem.available);
                            r.body.dateOfStock.should.equal(SKUItem.dateOfStock);
                            done();
                        });
                });
        }
        else {
            agent.get('/api/skuitems/') //we are not sending the id
                .then(function (res) {
                    res.should.have.status(expectedHTTPStatus);
                    done();
                });
        }
    });
}

function addSKUItem(expectedHTTPStatus, RFID, SKUItem) {
    it('creating an SKUItem', function (done) {
        if (SKUItem !== undefined) {
            agent.post('/api/skuitem')
                .send(SKUItem)
                .then(function (res) {
                    res.should.have.status(expectedHTTPStatus);
                    done();
                });
        } else {
            agent.post('/api/skuitem') //we are not sending any data
                .then(function (res) {
                    res.should.have.status(expectedHTTPStatus);
                    done();
                });
        }

    });
}

function modifySKUItem(expectedHTTPStatus, RFID, SKUItem, newStatus) {
    it('modifying an SKUItem', function (done) {
        if (id !== undefined) {
            agent.post('/api/skuitem')
                .send(SKUItem)
                .then(function (res) {
                    res.should.have.status(201);
                    agent.put('/api/skuitems/'+ RFID)
                        .send(newStatus)
                        .then(function (r) {
                            r.should.have.status(expectedHTTPStatus);
                            done();
                        });
                        
                });
        }
        else {
            agent.put('/api/skuitems/') //we are not sending the id
                .then(function (res) {
                    res.should.have.status(expectedHTTPStatus);
                    done();
                });
        }
    });
}

function deleteSKUItem(expectedHTTPStatus, RFID, SKUItem) {
    it('deleting an SKU', function (done) {
        if (RFID !== undefined) {
            agent.post('/api/skuitem')
                .send(SKUItem)
                .then(function (res) {
                    res.should.have.status(201);
                    agent.delete('/api/skuitems/'+ RFID)
                        .then(function (r) {
                            r.should.have.status(expectedHTTPStatus);
                            done();
                        });
                        
                });
        }
        else {
            agent.delete('/api/skuitems/') //we are not sending the id
                .then(function (res) {
                    res.should.have.status(expectedHTTPStatus);
                    done();
                });
        }
    });
}