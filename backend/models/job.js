const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    required: true},

  location: {
      type: String,
      required: true},

  jobType: {
      type: String,
      required: true},

  firm: {
      type: String,
      required: true}

});

module.exports = mongoose.model('Job', postSchema);
