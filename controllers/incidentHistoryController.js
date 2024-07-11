const IncidentHistory = require('../models/incidentHistory');

// Get all incident history records
exports.getIncidentHistory = async (req, res) => {
    try {
        const incidentHistory = await IncidentHistory.findAll();
        res.json(incidentHistory);
       console.log(  "Error", res);
    } catch (error) {
        console.error('Error fetching incident history:', error);
        res.status(500).json({ error: 'Failed to fetch incident history' });
    }
};

// Create a new incident history record
exports.createIncidentHistory = async (req, res) => {

    console.log()
    const { IncidentID, PreviousStatus, NewStatus, PreviousAssigneeID, NewAssigneeID, Comment, UserID } = req.body;
    try {
        const incidentHistory = await IncidentHistory.create({
            IncidentID,
            PreviousStatus,
            NewStatus,
            PreviousAssigneeID,
            NewAssigneeID,
            Comment,
            UserID
        });
        res.status(201).json(incidentHistory);
    } catch (error) {
        console.error('Error creating incident history:', error);
        res.status(500).json({ error: 'Failed to create incident history record' });
    }
};

// Update an existing incident history record
exports.updateIncidentHistory = async (req, res) => {
    const historyId = req.params.historyId;
    const { IncidentID, PreviousStatus, NewStatus, PreviousAssigneeID, NewAssigneeID, Comment, UserID } = req.body;
    try {
        const incidentHistory = await IncidentHistory.update({
            IncidentID,
            PreviousStatus,
            NewStatus,
            PreviousAssigneeID,
            NewAssigneeID,
            Comment,
            UserID
        }, {
            where: { HistoryID: historyId }
        });
        res.json({ message: 'Incident history record updated successfully' });
    } catch (error) {
        console.error('Error updating incident history:', error);
        res.status(500).json({ error: 'Failed to update incident history record' });
    }
};

// Delete an incident history record
exports.deleteIncidentHistory = async (req, res) => {
    const historyId = req.params.historyId;
    try {
        await IncidentHistory.destroy({ where: { HistoryID: historyId } });
        res.json({ message: 'Incident history record deleted successfully' });
    } catch (error) {
        console.error('Error deleting incident history:', error);
        res.status(500).json({ error: 'Failed to delete incident history record' });
    }
};


exports.getIncidentHistoryByIncidentId = async (req, res) => {
    const incidentId = req.params.incidentId; // Assuming the incident ID is passed as a URL parameter
    try {
        const incidentHistory = await IncidentHistory.findByIncidentId(incidentId);
        res.json(incidentHistory);
    } catch (error) {
        console.error('Error fetching incident history by incident ID:', error);
        res.status(500).json({ error: 'Failed to fetch incident history by incident ID' });
    }
};