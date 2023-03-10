const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: 'This field is required.',
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
  city: {
    type: String,
  },
  rsvp: {
    // ['yes', 'no', 'pending']
    type: String,
    default: 'pending',
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Events',
  },
  meals: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Meals',
  },
});

// Custom validation for email
guestSchema.path('email').validate((val) => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, 'Invalid e-mail.');

const Guests = mongoose.model('Guests', guestSchema);

module.exports = Guests;
