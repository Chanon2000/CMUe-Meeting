/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
const Meeting = require("./../models/meetingModel");
const User = require('./../models/userModel');
const catchAsync = require("./../utils/catchAsync");

// Get meeting All
exports.getMeeting = catchAsync(async (req, res, next) => {
  const doc = await Meeting.find();
  console.log(doc);

  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      data: doc
    }
  });
});

// Get meeting by id
exports.getMeetingById = catchAsync(async (req, res, next) => {
  const doc = await Meeting.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      data: doc
    }
  });
});

// Create meeting
exports.createMeeting = catchAsync(async (req, res, next) => {
  const meeting = await Meeting.create(req.body);

  // Update User ทุกคนที่อยู่ใน meeting
  meeting.participant_id.forEach(async participant_id => {
    const user = await User.findById(participant_id);

    // update ที่ meeting_id โดยการเพิ่มลงไป 1 element
    user.meeting_id = [ ...user.meeting_id, meeting._id ];
    await User.findByIdAndUpdate(participant_id, user);
  });

  res.status(201).json({
    status: 'success',
    data: {
      // data: meeting
      data: null
    }
  });
});

// Update meeting
exports.updateMeeting = catchAsync(async (req, res, next) => {
  const meeting = await Meeting.findByIdAndUpdate(req.params.id, req.body);

  const meetingUpdated = await Meeting.findById(req.params.id); // ยิงเอา meeting ที่ update แล้วมา (เพราะเหมือนอันบน findByIdAndUpdate จะ return meeting ก่อน update มา ซึ่ง participant_id มันเป็นของเก่า นั้นทำให้ต้องยิง 2 ครั้งถึงจะ ไป update ที่ user collection ด้วย)

  // Update User ทุกคนที่อยู่ใน meeting
  meetingUpdated.participant_id.forEach(async participant_id => {
    const user = await User.findById(participant_id);

    // ถ้าไม่มี id ของ meeting
    if (user.meeting_id.indexOf(meetingUpdated._id) === -1) {
      user.meeting_id = [ ...user.meeting_id, meetingUpdated._id ];

      await User.findByIdAndUpdate(participant_id, user);
    }
  });

  
  let users = await User.find();
  users = users.filter(user => meetingUpdated.participant_id.indexOf(user._id) === -1); // user ที่ไม่ได้อยู่ใน meeting

  // หาว่าแต่ละคนเก็บ meeting อยู่หรือป่าว
  users.forEach((user) => {
    // console.log(user);
    user.meeting_id.forEach(async (id) => {
      // console.log(typeof JSON.stringify(id))
      if (JSON.stringify(id) === JSON.stringify(meeting._id)) {
        user.meeting_id = user.meeting_id.filter(meeting_id => JSON.stringify(meeting_id) !== JSON.stringify(meeting._id));
        await User.findByIdAndUpdate(user._id, user);
        // await User.findByIdAndUpdate(id, user); // ใช้ id อันนี้แล้วมันเทียบหน้า id ใน db ไม่เจอ
      }
    });
  });

  res.status(201).json({
    status: 'success',
    data: {
      // data: meeting
      data: null
    }
  });
});

// delete meeting
exports.deleteMeeting = catchAsync(async (req, res, next) => {
  await Meeting.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// ดึง meeting ตาม user ที่ login อยู่
exports.getMeetingByCurrentUser = catchAsync(async (req, res, next) => {
  // เอา currentUser_id มา
  let doc = await Meeting.find();
  // console.log(req.body.currentUser_id);
  doc = doc.filter(meeting => {
    if (meeting.participant_id.indexOf(req.body.currentUser_id) !== -1) return true;
    return false;
  });
  // console.log(doc);

  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});
