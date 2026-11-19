const express = require('express');
const router = express.Router();

const patientControllers = require("../Controllers/patient");

// ✅ IMPORT MIDDLEWARE
const { verifyToken, isAdmin } = require("../middleware/auth");

// 🔐 ADMIN ONLY ROUTES
router.post('/post', verifyToken, isAdmin, patientControllers.postPatient);
router.put('/:id', verifyToken, isAdmin, patientControllers.updatePatient);
router.delete('/:id', verifyToken, isAdmin, patientControllers.deletePatient);

// 🌐 PUBLIC ROUTES
router.get('/get/:id', patientControllers.getPatientById);
router.get('/getStatus/:statusFind', patientControllers.getPatientByStatus);
router.get('/:id/testDetails', patientControllers.getpatientTestDetails);

module.exports = router;

// const express = require('express');
// const router = express.Router();

// const patientControllers = require("../Controllers/patient");

// router.post('/post', patientControllers.postPatient);

// router.get('/get/:id', patientControllers.getPatientById);
// router.get('/getStatus/:statusFind', patientControllers.getPatientByStatus);
// router.put('/:id', patientControllers.updatePatient);
// router.get('/:id/testDetails', patientControllers.getpatientTestDetails);
// router.delete('/:id', patientControllers.deletePatient);

// module.exports = router;










// const express = require('express');
// const router=express.Router();

// const patientControllers=require("../Controllers/patient");


// router.post('/post',patientControllers.postPatient)
// router.get('/get/:id',patientControllers.getPatientById)
// router.get('/getStatus/:statusFind',patientControllers.getPatientByStatus)
// router.put('/:id',patientControllers.updatePatient)
// router.get('/:id/testDetails',patientControllers.getpatientTestDetails)
// router.delete('/:id',patientControllers.deletePatient)

// module.exports=router;
