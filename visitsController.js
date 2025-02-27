// visitsController.js
const { incrementVisit } = require('./visitsModel');

async function getVisits(req, res) {
    try {
        const visitData = await incrementVisit();
        res.json({ visits: visitData.count, mode: visitData.mode });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getVisits };
