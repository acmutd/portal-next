/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/
use('portal-prod');
db.getCollection('event_reservations').find().forEach(function(reservation) {
  var profileExists = db.getCollection('profiles').findOne({ _id: reservation.profileId });
  if (profileExists) {
    print('Profile exists for reservation ID: ' + reservation._id);
  } else {
    print('Profile does not exist for reservation ID: ' + reservation._id);
  }
});
