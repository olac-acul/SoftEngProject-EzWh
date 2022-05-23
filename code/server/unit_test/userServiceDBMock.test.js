const userService = require("../services/userService");
const userDAO = require("../mockDAOs/mockUserDAO");
const user_Service = new userService(userDAO);

describe("get users", () => {
    userDAO.getUsers.mockReturnValue(   {
        id: 1,
        email: 'mail1',
        name: 'mario',
        surname: 'rossi',
        password: 'alz',
        type: 'customer'
    });

    test("get users", async () => {
        let res = await user_Service.getUsers();
        expect(res).toEqual({
            id: 1,
            email: 'mail1',
            name: 'mario',
            surname: 'rossi',
            password: 'alz',
            type: 'customer'
        });
    });
});

describe("get a user", () => {
    userDAO.showUserDetails.mockReturnValue({
        id: 1,
        email: 'mail1',
        name: 'mario',
        surname: 'rossi',
        password: 'alz',
        type: 'customer'
    });
    test("get a user", async () => {
        const email = 'mail1';
        let res = await user_Service.showUserDetails(email);
        expect(res).toEqual({
            id: 1,
            email: 'mail1',
            name: 'mario',
            surname: 'rossi',
            password: 'alz',
            type: 'customer'
        });
    });
});

describe("create a user", () => {
    test("create a user", async () => {
        const user = {
            id: 1,
            email: 'mail1',
            name: 'mario',
            surname: 'rossi',
            password: 'alz',
            type: 'customer'
        };
        await user_Service.addUser(user);
        expect(userDAO.addUser.mock.call).toBe(user);
    })
});

describe("login a user", () => {
    userDAO.loginUser.mockReturnValue({
        id: 1,
        email: 'mail1',
        name: 'mario'
    });
    test("login a user", () => {
        const email = 'mail1';
        const password = 'alz';
        const type = 'customer';
        let res = await user_Service.loginUser(email, password, type);
        expect(res).toEqual({
            id: 1,
            email: 'mail1',
            name: 'mario'
        });
    })
});

describe("modify user rights", () => {
    test("modify user rights", async () => {
        const email = 'mail1';
        const oldType = 'customer';
        const newType = 'supplier';
        await user_Service.modifyUserRights(email, oldType, newType);
        expect(userDAO.modifyUserRights.mock.calls[0]).toBe(email);
        expect(userDAO.modifyUserRights.mock.calls[1]).toBe(oldType);
        expect(userDAO.modifyUserRights.mock.calls[2]).toBe(newType);
    });
});

describe("delete a user", () => {
    test("delete a user", async () => {
        const email = 'mail1';
        const type = 'customer';
        await user_Service.deleteUser(email, type);
        expect(userDAO.deleteUser.mock.call[0]).toBe(email);
        expect(userDAO.deleteUser.mock.call[1]).toBe(type);
    });
});



