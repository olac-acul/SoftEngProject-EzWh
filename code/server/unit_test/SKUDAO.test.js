const SKUDAO = require('../modules/SKUDAO');

describe('testSKUDao', () => {
    beforeEach(async () => {
        await SKUDAO.deleteSKUs();
    });

    test('delete all SKUs', async () => {
        var res = await SKUDAO.getAllSKUs();
        expect(res.length).toStrictEqual(0);
    });

    testAddSKU_And_GetAllSKUs_And_GetSKU(1, ["d1", 100, 50, "n1", 50, 10.99]);
    testModifySKUPositionAndGetSKUPosition(1, ["d1", 100, 50, "n1", 50, 10.99], "800234523412");
    testDeleteSKU(1, ["d1", 100, 50, "n1", 50, 10.99]);
});

function testAddSKU_And_GetAllSKUs_And_GetSKU(id, SKU) {
    test('create new SKU and get all SKUs and get an SKU by id', async () => {
        await SKUDAO.addSKU(SKU);
        var res = await SKUDAO.getAllSKUs();
        expect(res.length).toStrictEqual(1);
        res = await SKUDAO.getSKU(id);
        expect(res.id).toStrictEqual(id);
        expect(res.description).toStrictEqual(SKU.description);
        expect(res.weight).toStrictEqual(SKU.weight);
        expect(res.volume).toStrictEqual(SKU.volume);
        expect(res.notes).toStrictEqual(SKU.notes);
        expect(res.availableQuantity).toStrictEqual(SKU.availableQuantity);
        expect(res.price).toStrictEqual(SKU.price);
    });
}

function testModifySKUPositionAndGetSKUPosition(id, SKU, newPosition) {
    test('mmodify position of an SKU and get position of it', async () => {
        await SKUDAO.addSKU(SKU);
        await SKUDAO.modifySKUPosition(id, newPosition);
        res = await SKUDAO.getSKUPosition(id);
        expect(res).toStrictEqual(newPosition);
    });
}

// function testModifySKU(item, newStatus){
//     test("modify an item", async () => {
//         await SKUDAO.createItem(item);
//         await SKUDAO.modifyItem(item.id, newStatus);   
//         var res = await SKUDAO.getItemById(item.id);
//         expect(res.length).toStrictEqual(1);
//         expect(res.id).toStrictEqual(item.id);
//         expect(res.description).toStrictEqual(newStatus.description);
//         expect(res.price).toStrictEqual(newStatus.price);
//         expect(res.SKUId).toStrictEqual(item.SKUId);
//         expect(res.supplierId).toStrictEqual(item.supplierId);
//     });
// }

function testDeleteSKU(id, SKU){
    test("delete an SKU", async () => {
        await SKUDAO.addSKU(SKU);
        await SKUDAO.deleteSKU(id);   
        var res = await SKUDAO.getSKU(id);
        expect(res.length).toStrictEqual(0);
    });
}
