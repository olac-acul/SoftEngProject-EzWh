const ItemService = require("../services/itemService");
const itemDAO = require("../mockDAOs/mockItemDAO");
const itemService = new ItemService(itemDAO);

describe("get items", () => {
    itemDAO.getItems.mockReturnValue(  {
        id:12,
        description : "d1",
        price : 10.99,
        SKUId : 8,
        supplierId : 10
    }
  );
    test("get items", async () => {
        let res = await itemService.getItems();
        expect(res).toEqual({
            id:12,
            description : "d1",
            price : 10.99,
            SKUId : 8,
            supplierId : 10
        });
    });
});

describe("get an Item", () => {
    itemDAO.getItem.mockReturnValue({
        id:12,
        description : "d1",
        price : 10.99,
        SKUId : 8,
        supplierId : 10
    });
    test("get an item", async () => {
        const id = 12;
        let res = await itemService.getItem(id);
        expect(res).toEqual({
            id:12,
            description : "d1",
            price : 10.99,
            SKUId : 8,
            supplierId : 10
        });
    });
});

describe("create an item", () => {
    test("create an item", async () => {
        const item = {
            id:12,
            description : "d1",
            price : 10.99,
            SKUId : 8,
            supplierId : 10
        };
        await itemService.createItem(item);
        expect(itemDAO.createItem.mock.call).toBe(item);
    });
});

describe("modify an item", () => {
    test("modify an item", async () => {
        const id = 12;
        const newStatus = {
            newPrice: 9.99,
            newDescription: "d2"
        };
        await itemService.modifyItem(id, newStatus);
        expect(itemDAO.modifyItem.mock.calls[0]).toBe(id);
        expect(itemDAO.modifyItem.mock.calls[1]).toBe(newStatus);
    });
});

describe("delete an item", () => {
    test("delete an item", async () => {
        const id = 12;
        await itemService.deleteItem(id);
        expect(itemDAO.deleteItem.mock.call).toBe(id);
    });
});
