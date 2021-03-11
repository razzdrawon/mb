'use strict';
/*eslint no-process-env:0*/

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP
    || process.env.ip
    || undefined,

  // Server port
  port: 9101,

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://metrobusadmin:Qwerty123MetroBusPelon@198.136.56.82:27017/metrobus?readPreference=primary'
  }
};
