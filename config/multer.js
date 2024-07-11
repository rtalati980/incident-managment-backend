const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Configure multer
const upload = multer({ storage });

app.post('/api/incidents', upload.array('files'), async (req, res) => {
    const files = req.files;
    const fileData = files.map(file => ({
        filename: file.filename,
        path: file.path,
        type: req.body[`file${files.indexOf(file)}Type`]
    }));

    console.log('Files:', fileData);

    // Add file data to your incident data processing logic
    // ...
});
