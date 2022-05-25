const dayjs = require('dayjs');
dayjs().format();
class ReturnOrderService {
    dao;

    constructor(dao) {
        this.dao = dao;
    }

    getReturnOrders = async () => {
        // 401 Unauthorized (not logged in or wrong permissions)
        // const returnOrders = [];
        const returnOrders = await this.dao.getReturnOrders();
        // for (let i of orders) {
        //     let returnOrder = await this.dao.getReturnOrderById(i.id);
        //     returnOrders.push(returnOrder);
        // }
        return returnOrders;
    }

    getReturnOrderById = async (id) => {
        // 401 Unauthorized (not logged in or wrong permissions)
        if (isNaN(id) || Number(id) <= 0)
            return '422';
        const validatedId = Number(id);
        const returnOrder = await this.dao.getReturnOrderById(validatedId);
        if (returnOrder === 'Not Found')
            return '404';
        const filterId = {
            returnDate: returnOrder.returnDate,
            restockOrderId: returnOrder.restockOrderId
        }
        return filterId;
    }

    getRestockOrderById = async (id) => {
        if (typeof id != "number" || id <= 0)
            return '422';
        const restockOrder = await this.dao.getRestockOrderById(id);
        return restockOrder;
    }

    getItemById = async (SKUId) => {
        const item = await this.dao.getItemById(SKUId);
        return item;
    }

    createReturnOrder = async (returnOrder) => {
        // 401 Unauthorized (not logged in or wrong permissions)
        if (Object.keys(returnOrder).length !== 3)
            return '422';
        if (returnOrder.returnDate === undefined || returnOrder.products === undefined || returnOrder.restockOrderId === undefined)
            return '422';
        const validatedReturnOrder = {
            returnDate: returnOrder.returnDate,
            products: returnOrder.products,
            restockOrderId: returnOrder.restockOrderId
        };
        if (!dayjs(validatedReturnOrder.returnDate).isValid() || (validatedReturnOrder.returnDate.length !== 10 && validatedReturnOrder.returnDate.length !== 16))
            return '422';
        if (validatedReturnOrder.products.length == 0)
            return '422';
        for (let i of validatedReturnOrder.products) {
            if (Object.keys(i).length !== 4)
                return '422';
            if (i.SKUId === undefined || i.description === undefined || i.price === undefined || i.RFID === undefined)
                return '422';
            if (typeof i.SKUId != "number" || i.SKUId <= 0)
                return '422';
            if (typeof i.description != "string")
                return '422';
            if (typeof i.price != "number" || i.price <= 0)
                return '422';
            if (isNaN(i.RFID) || i.RFID.length !== 32)
                return '422';
        }
        // END OF VALIDATION
        await this.dao.newReturnOrderTable();
        const returnOrderId = await this.dao.createReturnOrder(returnOrder);
        return returnOrderId;
    }

    createReturnOrder_join_Product = async (SKUId, returnOrderId) => {
        await this.dao.newReturnOrder_join_ProductTable();
        await this.dao.createReturnOrder_join_Product(SKUId, returnOrderId);
    }

    deleteReturnOrder = async (id) => {
        // 401 Unauthorized (not logged in or wrong permissions)
        if (isNaN(id) || Number(id) <= 0)
            return '422';
        const validatedId = Number(id);
        const deletedElements = await this.dao.deleteReturnOrder(validatedId);
        if (deletedElements === 0)
            return '422';
        await this.dao.deleteReturnOrder_join_Product(validatedId);
        return '204';
    }

    deleteReturnOrders = async () => {
        await this.dao.deleteReturnOrders();
        }
}

module.exports = ReturnOrderService;