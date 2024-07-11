const Incident = require('../models/incidentModel');
const jwt = require('jsonwebtoken');
const IncidentHistory = require('../models/incidentHistory');

// Generate a unique number for the incident
function generateUniqueNo() {
    const timestamp = Date.now();
    return `INC-${timestamp}`;
}

exports.createIncident = async (req, res) => {
    const uniqueNo = generateUniqueNo();
    const todayDate = new Date().toISOString().split('T')[0];

    const newIncident = {
        No: uniqueNo,
        workLocation: req.body.workLocation,
        observerDescription: req.body.observerDescription,
        type: req.body.type,
        category: req.body.category,
        subcategory: req.body.subcategory,
        status: 'Open',
        actionTaken: req.body.actionTaken,
        userId: req.userId,
        inciDate: req.body.inciDate,
        inciTime: req.body.inciTime,
        repoDate: todayDate,
    };

     console.log(newIncident);
     
    // Check if assignedUsers exists and process it
    if (req.body.assignedUsers) {
        try {
            newIncident.assignedUsers = JSON.stringify(req.body.assignedUsers.flat().map(Number));
        } catch (error) {
            return res.status(400).json({ message: 'Invalid assignedUsers format' });
        }
    }

    // Validate required fields
    if (!newIncident.No || !newIncident.workLocation || !newIncident.userId) {
        return res.status(400).json({ message: 'Required fields are missing' });
    }

    try {
        // Create the incident
        const incidentId = await Incident.create(newIncident);

        // Create the incident history
        const newIncidentHistory = {
            IncidentID: incidentId,
            PreviousStatus: null,
            NewStatus: 'Open',
            PreviousAssigneeID: null,
            NewAssigneeID: null,
            Comment: 'Incident created',
            UserID: req.userId,
        };

        await IncidentHistory.create(newIncidentHistory);

        res.status(201).json({ message: 'Incident created successfully', No: uniqueNo });
    } catch (err) {
        console.error('Error creating incident:', err);
        res.status(500).json({ message: 'Error creating incident', error: err.message });
    }
};

exports.getIncidents = (req, res) => {
    Incident.findAll((err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(results);
    });
};

exports.getIncident = (req, res) => {
    Incident.findById(req.params.id, (err, results) => {
        if (err) return res.status(500).send(err);
        console.log(req);
        if (results.length === 0) return res.status(404).send({ message: 'Incident not found' });
        res.status(200).send(results[0]);
    });
};

exports.updateIncident = (req, res) => {
    Incident.update(req.params.id, req.body, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: 'Incident updated' });
    });
};

exports.deleteIncident = (req, res) => {
    Incident.delete(req.params.id, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: 'Incident deleted' });
    });
};

function generateUniqueNo() {
   
    const timestamp = Date.now(); // This returns a timestamp as a unique number
    const uniqueNo = `INC-${timestamp}`; // Appending "INC" to the timestamp
    return uniqueNo;
}

exports.getUserIncidents = (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    
    console.log( "token ",token);
    const decodedToken = jwt.verify(token, 'secret'); // Replace 'your_secret_key' with your actual secret key
    const userId = decodedToken.id;

    console.log('Token:', token);
    console.log('User ID:', userId); // Log the user ID obtained from the token

    if (!userId) {
        return res.status(400).json({ message: 'User ID is missing' });
    }

    Incident.findByUser(userId, (err, results) => {
        if (err) {
            console.error('Error fetching user incidents:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('Results:', results);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Incidents not found for this user' });
        }
        res.status(200).json(results);
    });
};

exports.getIncedentByNo = (req, res) => {
    Incident.findByNo(req.params.No, (err, results) => {
        if (err) return res.status(500).send(err);
        console.log(req);
        if (results.length === 0) return res.status(404).send({ message: 'Incident not found' });
        res.status(200).send(results[0]);
    });
};

exports.getIncdentAssignedUser= (req,res)=>{
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'secret'); // Replace 'your_secret_key' with your actual secret key
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    const userId = decodedToken.id;
    if (!userId) {
        return res.status(400).json({ message: 'User ID is missing in token' });
    }

    Incident.findByUserId(userId, (err, incidents) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching incidents', error: err });
        }
        res.status(200).json(incidents);
    });
};