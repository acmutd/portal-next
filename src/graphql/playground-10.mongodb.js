/* global use, db */
use('portal-prod');

// Example inputs
const targetNetId = "SXS210541";
const targetDivisionNames = ["Projects"]; 
// Could be a single name as well, e.g. ["Development"]

// 1. Find the profile by netId
const profileDoc = db.Profile.findOne({ netid: targetNetId });
if (!profileDoc) {
  console.log(`No profile found for netId: ${targetNetId}`);
} else {
  // 2. Find matching divisions by name
  const divisionDocs = db.divisions.find({ deptName: { $in: targetDivisionNames } }).toArray();
  if (!divisionDocs.length) {
    console.log(`No divisions found for the names: ${targetDivisionNames.join(', ')}`);
  } else {
    // 3. Map divisionDocs to their _ids
    const divisionIds = divisionDocs.map(d => d._id);

    // Insert the officer with the found profile ID and divisions
    const officerInsertResult = db.officers.insertOne({
      profileId: profileDoc._id,
      divisionIds: divisionIds,
      // You can add timestamps or any additional fields here
    });

    console.log(`Inserted Officer with _id: ${officerInsertResult.insertedId}`);

    // After inserting officer above:
const officerId = officerInsertResult.insertedId;

// If you also need to add a director record:
db.directors.insertOne({
  officerId: officerId,
  divisionIds: divisionIds, // Same divisions, or adapt as needed
});
console.log(`Inserted Director with officerId: ${officerId}`);


//projects: 659c58f3f818350360da3a59
//research: 659c58f3f818350360da3a58


  }
}
