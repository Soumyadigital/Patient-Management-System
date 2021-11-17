const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Patientdb', {useNewUrlParser: true, useUnifiedTopology: true});
//connection
const db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('open', function() {
  // we're connected!
});

