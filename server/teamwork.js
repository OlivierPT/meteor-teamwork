/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// Support for playing D&D: Roll 3d6 for dexterity
Accounts.onCreateUser(function(options, user) {
  var email = user.emails[0].address;
  var defaultNames = email.split('@')[0];
  // Initializing a new userProfile from the new user        
  UserProfile.insert({nickname: defaultNames.substr(0, 7), name: defaultNames, email:email, userId: user._id});
  
  return user;
});