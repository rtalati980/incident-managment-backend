const multer = require('multer');
const path = require('path');
const Incident = require('../models/incidentModel');
const IncidentHistory = require('../models/incidentHistory');
const Notification = require('../models/notificationModel');
const jwt = require('jsonwebtoken');

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('Setting file destination to uploads/');
        cb(null, 'uploads/'); // Directory where files will be saved
    },
    filename: (req, file, cb) => {
        const uniqueFilename = Date.now() + '-' + file.originalname;
        console.log(`Generated unique filename: ${uniqueFilename}`);
        cb(null, uniqueFilename); // Create a unique file name
    }
});

// Initialize multer with storage configuration
const upload = multer({ storage });


exports.createIncident = [
  upload.array('files', 10),
  async (req, res) => {
    try {
      console.log('Request received for incident creation');

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

      if (req.body.assignments) {
        newIncident.assignedUsers = req.body.assignments.join(',');
      }

      if (!newIncident.No || !newIncident.workLocation || !newIncident.userId) {
        return res.status(400).json({ message: 'Required fields are missing' });
      }

      // ✅ Step 1: Create incident
      const incidentId = await Incident.create(newIncident);

      // ✅ Step 2: Create notification for each assigned user
      if (req.body.assignments && Array.isArray(req.body.assignments)) {
        for (const userId of req.body.assignments) {
          await Notification.create({
            user_id: userId,
            message: `You have been assigned to a new incident (#${uniqueNo}).`,
            type: 'incident',
          });
        }
      }

      // ✅ Step 3: Create notification for reporter as well
      await Notification.create({
        user_id: req.userId,
        message: `Your incident (#${uniqueNo}) has been successfully created.`,
        type: 'incident',
      });

      // ✅ Step 4: (optional) Upload files & update incident
      if (req.files && req.files.length > 0) {
        const filesData = req.files.map((file, index) => ({
          filename: file.filename,
          path: file.path,
          type: req.body[`file${index}Type`] || 'unknown',
        }));
        await Incident.update(incidentId, { files: filesData });
      }

      // ✅ Step 5: Add incident history
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
  }
];


// Function to generate unique incident number
function generateUniqueNo() {
    const timestamp = Date.now();
    const uniqueNo = `INC-${timestamp}`;
    console.log('Generated unique incident number:', uniqueNo);
    return uniqueNo;
}


exports.getIncidents = (req, res) => {
    const page = parseInt(req.query.page) || 1; // default page = 1
    const limit = 10; // fetch only 10 records at a time
    const offset = (page - 1) * limit;
    Incident.findAll(limit,offset,(err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(results);
    });
};

exports.getIncident = (req, res) => {
    const page = parseInt(req.query.page) || 1; // default page = 1
    const limit = 10; // fetch only 10 records at a time
    const offset = (page - 1) * limit;
    Incident.findById(limit,offset,req.params.id, (err, results) => {
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
    console.log('from that user',req.headers['authorization']);
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
    console.log("from users id", userId);
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

