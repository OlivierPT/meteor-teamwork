/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// Support for playing D&D: Roll 3d6 for dexterity
Accounts.onCreateUser(function(options, user) {
  UserProfile.insert({name: user.emails[0].address, email:user.emails[0].address, userId: user._id});
  return user;
});