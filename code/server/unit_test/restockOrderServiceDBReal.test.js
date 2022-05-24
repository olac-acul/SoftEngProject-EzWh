const RestockOrderService = require("../services/restockOrderService");
const restockOrderDAO = require("../DAOs/restockOrderDAO");
const restockOrderService = new RestockOrderService(restockOrderDAO);

describe("get restockOrders", () => {
    beforeEach(async () => {
        await restockOrderDAO.deleteRestockOrders();
        await restockOrderDAO.createRestockOrder({issueDate: "2021/11/29 09:33", products: [{"SKUId":12,"description":"a product","price":10.99,"qty":30},
        {"SKUId":180,"description":"another product","price":11.99,"qty":20}],  supplierId: 1});
    });
    testGetRestockOrders();
    testGetRestockOrderById();
});

async function testGetRestockOrders(){
    test("get restockOrders", async () => {
        let res = await restockOrderService.testGetRestockOrders();
        expect(res).toEqual({
            id:1,
            issueDate:"2021/11/29 09:33",
            state: "ISSUED",
            products: [{"SKUId":12,"description":"a product","price":10.99,"qty":30},
                    {"SKUId":180,"description":"another product","price":11.99,"qty":20}],
            supplierId : 1,
            transportNote: {"deliveryDate":"2021/12/29"},
            skuItems: null
        });
    });
}

async function testGetRestockOrderById(){
    test("get a restockOrder", async () => {
        const id = 1;
        let res = await restockOrderService.getRestockOrderById(id);
        expect(res).toEqual({
            id:1,
            issueDate:"2021/11/29 09:33",
            products: [{"SKUId":12,"description":"a product","price":10.99,"qty":30},
                    {"SKUId":180,"description":"another product","price":11.99,"qty":20}],
            state: "ISSUED",
            supplierId : 1,
            transportNote: {"deliveryDate":"2021/12/29"},
            skuItems: null
        });
    });
}

describe("create a restockOrder", () => {
    beforeEach(async () => {
        await restockOrderDAO.deleteRestockOrders();
    });
    testCreateRestockOrder();
});

async function testCreateRestockOrder(){
    test("create a restockOrder", async () => {
        const id = 1;
        const restockOrder = {
            issueDate:"2021/11/29 09:33",
            products: [{"SKUId":12,"description":"a product","price":10.99,"qty":30},
                    {"SKUId":180,"description":"another product","price":11.99,"qty":20}],
            supplierId : 1,
        }
        let res = await restockOrderService.createRestockOrder(restockOrder);
        res = await restockOrderService.getRestockOrderById(id);
        expect(res).toEqual({
            id:1,
            issueDate:"2021/11/29 09:33",
            state: "ISSUED",
            products: [{"SKUId":12,"description":"a product","price":10.99,"qty":30},
                    {"SKUId":180,"description":"another product","price":11.99,"qty":20}],
            supplierId : 1,
            transportNote: null,
            skuItems: null
        });
    });
}

describe("change a restockOrder state", () => {
    beforeEach(async () => {
        await restockOrderDAO.deleteRestockOrders();
        await restockOrderDAO.createRestockOrder({issueDate: "2021/11/29 09:33", products: [{"SKUId":12,"description":"a product","price":10.99,"qty":30},
        {"SKUId":180,"description":"another product","price":11.99,"qty":20}],  supplierId: 1});
    });
    testChangeRestockOrderState();
});

async function testChangeRestockOrderState(){
    test("change a restockOrder state", async () => {
        const id = 1;
        const newState = "DELIVERED";
        let res = await restockOrderService.changeStateRestockOrder(id, newState);
        res = await restockOrderService.getRestockOrderById(id);
        expect(res).toEqual({
            id:1,
            issueDate:"2021/11/29 09:33",
            state: "DELIVERED",
            products: [{"SKUId":12,"description":"a product","price":10.99,"qty":30},
                    {"SKUId":180,"description":"another product","price":11.99,"qty":20}],
            supplierId : 1,
            transportNote: null,
            skuItems: null
        });
    });
}

describe("add transportNote to a restockOrder", () => {
    beforeEach(async () => {
        await restockOrderDAO.deleteRestockOrders();
        await restockOrderDAO.createRestockOrder({issueDate: "2021/11/29 09:33", products: [{"SKUId":12,"description":"a product","price":10.99,"qty":30},
        {"SKUId":180,"description":"another product","price":11.99,"qty":20}],  supplierId: 1});
    });
    testAddTransportNote();
});

async function testAddTransportNote(){
    test("add transportNote to a restockOrder", async () => {
        const id = 1;
        const transportNote = {deliveryDate:"2021/12/29"};
        let res = await restockOrderService.addTransportNoteRestockOrder(id, transportNote);
        res = await restockOrderService.getRestockOrderById(id);
        expect(res).toEqual({
            id:1,
            issueDate:"2021/11/29 09:33",
            state: "ISSUED",
            products: [{"SKUId":12,"description":"a product","price":10.99,"qty":30},
                    {"SKUId":180,"description":"another product","price":11.99,"qty":20}],
            supplierId : 1,
            transportNote: {deliveryDate:"2021/12/29"},
            skuItems: null
        });
    });
}

describe("delete a restockOrder", () => {
    beforeEach(async () => {
        await restockOrderDAO.deleteRestockOrders();
        await restockOrderDAO.createRestockOrder({issueDate: "2021/11/29 09:33", products: [{"SKUId":12,"description":"a product","price":10.99,"qty":30},
        {"SKUId":180,"description":"another product","price":11.99,"qty":20}],  supplierId: 1});
    });
    testDeleteRestockOrder();
});

async function testDeleteRestockOrder(){
    test("delete a restockOrder", async () => {
        const id = 1;
        let res = await restockOrderService.deleteRestockOrder(id);
        res = await restockOrderService.getRestockOrderById(id);
        expect(res).toEqual("404");
    });
}
