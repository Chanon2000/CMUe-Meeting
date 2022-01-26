const express = require('express');
const meetingController = require('./../controllers/meetingController');

const router = express.Router();

router.get('/', meetingController.getMeeting);
router.get('/:id', meetingController.getMeetingById);
router.post('/', meetingController.createMeeting);
router.put('/:id', meetingController.updateMeeting);
router.delete('/:id', meetingController.deleteMeeting);

router.post('/getMeetingMe', meetingController.getMeetingByCurrentUser);

module.exports = router;
