const PositionService = require("../services/positionService");
const positionDAO = require("../mockDAOs/mockPositionDAO");
const positionService = new PositionService(positionDAO);

describe("get positions", () => {
    positionDAO.getPositions.mockReturnValue({
        positionID: "800234543412",
            aisleID: "8002",
            row: "3454",
            col: "3412",
            maxWeight: 1000,
            maxVolume: 1000
    });
    test("get positions", async () => {
        let res = await positionService.getPositions();
        expect(res).toEqual({
            positionID: "800234543412",
            aisleID: "8002",
            row: "3454",
            col: "3412",
            maxWeight: 1000,
            maxVolume: 1000
        });
    });
});

describe("create a position", () => {
    test("create a position", async () => {
        const position = {
            positionID: "800234543412",
            aisleID: "8002",
            row: "3454",
            col: "3412",
            maxWeight: 1000,
            maxVolume: 1000
        }
        await positionService.createPosition(position);
        expect(positionDAO.createPosition.mock.call).toBe(position);
    });
});

describe("modify a position", () => {
    test("modify a position", async () => {
        const oldPositionID = "800234543412";
        const position = {
            aisleID: "8012",
            row: "3454",
            col: "3412",
            maxWeight: 1000,
            maxVolume: 1000,
            occupiedWeight: 300,
            occupiedVolume:150
        }
        await positionService.modifyPosition(oldPositionID, position);
        expect(positionDAO.deletePosition.mock.calls[0]).toBe(oldPositionID);
        expect(positionDAO.deletePosition.mock.calls[1]).toBe(position);
    });
});

describe("change positionID", () => {
    test("change positionID", async () => {
        const oldPositionID = "800234543412";
        const newPositionID = "801234543412";
        await positionService.changePositionId(oldPositionID, newPositionID);
        expect(positionDAO.deletePosition.mock.calls[0]).toBe(oldPositionID);
        expect(positionDAO.deletePosition.mock.calls[1]).toBe(newPositionID);
    });
});

describe("delete a position", () => {
    test("delete a position", async () => {
        const positionID = "800234543412";
        await positionService.deletePosition(positionID);
        expect(positionDAO.deletePosition.mock.call).toBe(positionID);
    });
});
