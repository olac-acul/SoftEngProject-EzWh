const InternalOrderService = require("../services/internalOrderService");
const internalOrderDAO = require("../mockDAOs/mockInternalOrderDAO");
const internalOrderService = new InternalOrderService(internalOrderDAO);

describe("get internalOrders", () => {
    internalOrderDAO.getInternalOrders.mockReturnValue(  {
        id:1,
        issueDate:"2021/11/29 09:33",
        state: "ACCEPTED",
        products: [{"SKUId":12,"description":"a product","price":10.99,"qty":2},
                    {"SKUId":180,"description":"another product","price":11.99,"qty":3}],
        customerId : 1
        }
  );
    test("get internalOrders", async () => {
        let res = await internalOrderService.getInternalOrders();
        expect(res).toEqual({
            id:1,
            issueDate:"2021/11/29 09:33",
            state: "ACCEPTED",
            products: [{"SKUId":12,"description":"a product","price":10.99,"qty":2},
                        {"SKUId":180,"description":"another product","price":11.99,"qty":3}],
            customerId : 1
        });
    });
});

describe("get an internalOrder", () => {
    internalOrderDAO.getInternalOrderById.mockReturnValue({
        id:1,
        issueDate:"2021/11/29 09:33",
        state: "ACCEPTED",
        products: [{"SKUId":12,"description":"a product","price":10.99,"qty":2},
                    {"SKUId":180,"description":"another product","price":11.99,"qty":3}],
        customerId : 1
    });
    test("get an internalOrder", async () => {
        const id = 1;
        let res = await internalOrderService.getInternalOrderById(id);
        expect(res).toEqual({
            id:1,
            issueDate:"2021/11/29 09:33",
            state: "ACCEPTED",
            products: [{"SKUId":12,"description":"a product","price":10.99,"qty":2},
                        {"SKUId":180,"description":"another product","price":11.99,"qty":3}],
            customerId : 1
        });
    });
});

describe("create an internalOrder", () => {
    test("create an internalOrder", async () => {
        const internalOrder = {
            issueDate:"2021/11/29 09:33",
            products: [{"SKUId":12,"description":"a product","price":10.99,"qty":2},
                        {"SKUId":180,"description":"another product","price":11.99,"qty":3}],
            customerId : 1
        };
        await internalOrderService.createInternalOrder(internalOrder);
        expect(internalOrderDAO.createInternalOrder.mock.call).toBe(internalOrder);
    });
});

describe("modify an internalOrder with state ACCEPTED", () => {
    test("modify an internalOrder with state ACCEPTED", async () => {
        const id = 1;
        const newState = "ACCEPTED";
        await internalOrderService.changeStateInternalOrder(id, newState);
        expect(internalOrderDAO.changeStateInternalOrder.mock.calls[0]).toBe(id);
        expect(internalOrderDAO.changeStateInternalOrder.calls[1]).toBe(newState);
    });
});

describe("modify an internalOrder with state COMPLETED and products arrary", () => {
    test("modify an internalOrder with state COMPLETED and products arrary", async () => {
        const id = 1;
        const products = [{"SKUId":12,"description":"a product","price":10.99,"qty":2},
            {"SKUId":180,"description":"another product","price":11.99,"qty":3}];
        const newState = ["COMPLETED", products];
        await internalOrderService.changeStateInternalOrder(id, newState);
        expect(internalOrderDAO.changeStateInternalOrder.mock.calls[0]).toBe(id);
        expect(internalOrderDAO.changeStateInternalOrder.calls[1]).toBe(newState);
    });
});

describe("modify an internalOrder with state ACCEPTED and products arrary (the products array should be ignored)", () => {
    test("modify an internalOrder with state ACCEPTED and products arrary (the products array should be ignored)", async () => {
        const id = 1;
        const products = [{"SKUId":12,"description":"a product","price":10.99,"qty":2},
            {"SKUId":180,"description":"another product","price":11.99,"qty":3}];
        const newState = ["ACCEPTED", products];
        await internalOrderService.changeStateInternalOrder(id, newState);
        expect(internalOrderDAO.changeStateInternalOrder.mock.calls[0]).toBe(id);
        expect(internalOrderDAO.changeStateInternalOrder.calls[1]).toBe(newState);
    });
});

describe("delete an internalOrder", () => {
    test("delete an internalOrder", async () => {
        const id = 1;
        await internalOrderService.deleteInternalOrder(id);
        expect(internalOrderDAO.deleteInternalOrder.mock.call).toBe(id);
    });
});
