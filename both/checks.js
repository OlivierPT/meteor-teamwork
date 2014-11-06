/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

NonEmptyString = Match.Where(function (x) {
  check(x, String);
  return x.length > 0;
});
