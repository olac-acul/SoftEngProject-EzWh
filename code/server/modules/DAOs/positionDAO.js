'use strict';
const sqlite = require('sqlite3');

const db = new sqlite.Database('EzWh', (err) => {
    if (err) throw err;
});

exports.dropTable = () => {
    return new Promise((resolve, reject) => {
        const sql = 'DROP TABLE IF EXISTS POSITIONS';
        db.run(sql, function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.changes);
        });
    });
}

exports.newTable = () => {
    return new Promise((resolve, reject) => {
        const sql = `CREATE TABLE IF NOT EXISTS POSITIONS(POSITION_ID VARCHAR(20) PRIMARY KEY, 
                AISLE_ID VARCHAR(20), ROW VARCHAR(20), COL VARCHAR(20), MAX_WEIGHT INTEGER, MAX_VOLUME INTEGER, OCCUPIED_WEIGHT INTEGER, OCCUPIED_VOLUME INTEGER)`;
        db.run(sql, function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
}

exports.getPositions = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM POSITIONS';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const positions = rows.map((p) => (
                {
                    positionID: p.POSITION_ID,
                    aisleID: p.AISLE_ID,
                    row: p.ROW,
                    col: p.COL,
                    maxWeight: p.MAX_WEIGHT,
                    maxVolume: p.MAX_VOLUME,
                    occupiedWeight: p.OCCUPIED_WEIGHT,
                    occupiedVolume: p.OCCUPIED_VOLUME
                }
            ));
            resolve(positions);
        });
    });
}

exports.createPosition = (position) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO POSITIONS(POSITION_ID, AISLE_ID, ROW, COL, MAX_WEIGHT, MAX_VOLUME) VALUES(?, ?, ?, ?, ?, ?)';
        db.run(sql, [position.positionID, position.aisleID, position.row, position.col, position.maxWeight, position.maxVolume], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
}



exports.deletePosition = (POSITION_ID) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM POSITIONS WHERE POSITIONS.POSITION_ID = ?';
        db.run(sql, [POSITION_ID], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.changes);
        });
    });
}

// }

// deletePositions = () => {
//     return new Promise((resolve, reject) => {
//       const sql = 'DELETE FROM POSITIONS';
//       db.run(sql, [], function (err) {
//         if (err) {
//           reject(err);
//           return;
//         }
//         resolve(true);
//       })
//     })
//   };