let orphanedOfficers = [];
db.officers.find().forEach(function(officer) {
  let profileDoc = db.profiles.findOne({ _id: officer.profileId });
  if (!profileDoc) {
    orphanedOfficers.push(officer);
  }
});
printjson(orphanedOfficers);