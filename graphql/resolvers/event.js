const { transformEvent } = require('./merge');
const Event = require('../../models/event');
const User = require('../../models/user');

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => {
        return transformEvent(event);
      });
    } catch (error) {
      throw error;
    }
  },
  createEvent: async (args) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: '61d5a8fa27368c503158bb79',
    });
    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = transformEvent(result);
      const creator = await User.findById('61d5a8fa27368c503158bb79');
      if (!creator) {
        throw new Error('User not found');
      }
      creator.createdEvents.push(event);
      await creator.save();
      return createdEvent;
    } catch (error) {
      throw error;
    }
  },
};
