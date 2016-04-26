var request = require('request-promise'),
    chalk = require('chalk'),
    Promise = require("bluebird");

function HCPConfiguration(account, password) {
  this._account = account;
  this._url =  "https://iotrdmsiotservices-" + this._account + "trial.hanatrial.ondemand.com/com.sap.iotservices.dms/api/";
  this._authInfo = {
    'user': account,
    'pass': password
  };
  this.data = {
    
  }
}

HCPConfiguration.prototype.setup = function () {
  var that = this;
  that._readDimension()
  .catch(function (err) {
    return that._createDimension();
  })
  .then(function () {
    //return that._readOrCreateElement();
  });/*
    .then(function () {
      that._readOrCreateDeviceType()
    })
    .then(function () {
      console.log(that.data);
      //this._readOrCreateDevice()
    });/*
    .then(function () {
      this._readOrCreateMessageTypes()
    });*/
}

HCPConfiguration.prototype._readDimension = function () {
  var config = this;
  var dimensionName = 'Sphero Hierarchy';
  
  return new Promise(function(resolve, reject) {  
    request({
      'method': 'get',
      'url': config._url + 'dimensions',
      'auth': config._authInfo
    }).then(function (body){
      var body = JSON.parse(body);
      var found = false;
      body.forEach(function(dim) {
        if(dim.name == dimensionName) {
          found = true;
          console.log(chalk.green('HCP notice: '), "Dimension already existing");
          resolve();
        } 
      });
      
      if (!found) {
        console.log(chalk.red('HCP notice: '), "Dimension not found!");
        reject(404);
      }

    });
  });
}

HCPConfiguration.prototype._createDimension = function () {
  var config = this;
  var dimensionName = 'Sphero Hierarchy';
  
  return new Promise(function(resolve) {  
    request({
      'method': 'post',
      'url': config._url + 'dimensions',
      'auth': config._authInfo,
      'json': { 'name': 'Sphero Hierarchy' }  
    }).then(function (body){
      config.data.dimensionId = body.id;
      console.log(chalk.green('notice: '), "Created new dimension");
      resolve();
    });
  });
}

HCPConfiguration.prototype._readOrCreateElement = function () {
    var config = this;
    return new Promise(function(resolve) {
      request.post({
        'url': config._url + 'dimensions/' + config.data.dimensionId + '/elements',
        'auth': config._authInfo,
        'json': { 'name': 'Spheros' }
      }).then(function (body) {
        config.data.elementId = body.id;
        console.log(chalk.green('notice: '), "Created new element");
        resolve();
      })
      .catch(function (err) {
        console.log(err);
      });
    });
}

HCPConfiguration.prototype._readOrCreateDeviceType = function () {
    var config = this;
    return new Promise(function(resolve) {
      request.post({
        'url': config._url + 'devicetypes',
        'auth': config._authInfo,
        'json': { 'name': 'Sphero' }
      }).then(function (body) {
        config.data.deviceTypeId = body.id;
        console.log(chalk.green('notice: '), "Created new device type");
        resolve();
      })
      .catch(function (err) {
        console.log(err);
      });
    });
}

config = new HCPConfiguration("s0012102547", "sYn7mIs!");
config.setup();



// First create the device type
/*
request.post({
  'url': url + 'devicetypes',
  'auth': autoInfo,
  'json': { 'name': 'Sphero' }
}, function (err, httpResponse, body) {
  console.log(err);
  console.log(body.id);
  console.log(body.token);
});*/