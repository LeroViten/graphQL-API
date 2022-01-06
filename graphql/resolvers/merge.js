const Event = require('../../models/event');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');

async function events(eventsIds) {
  try {
    const events = await Event.find({ _id: { $in: eventsIds } });
    return events.map((event) => {
      return transformEvent(event);
    });
  } catch (error) {
    throw error;
  }
}

async function singleEvent(eventId) {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (error) {
    throw error;
  }
}

async function user(userId) {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: events.bind(this, user._doc.createdEvents),
    };
  } catch (error) {
    throw error;
  }
}

function transformEvent(event) {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event._doc.creator),
  };
}

function transformBooking(booking) {
  return {
    ...booking._doc,
    _id: booking.id,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
  };
}

module.exports = {
  transformEvent,
  transformBooking,
};
