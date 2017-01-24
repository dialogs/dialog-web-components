/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

 const pattern = /(Mac)/i;

 function isMac(): boolean {
   if(typeof(navigator) === 'undefined') {
     return false;
   }

   return pattern.test(navigator.platform);
 }

 export default isMac;
