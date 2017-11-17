var embedly = require('../index.js');
var winston = require('winston');

var logger = new (winston.Logger)({
  transports: [new (winston.transports.Console)({ level: 'info' })]
});

describe('embedly', function() {
  this.timeout(30000);

  describe('oembed', function() {
    it('should call the oembed endpoint', function(done) {
      var api = new embedly({key: process.env.EMBEDLY_KEY, logger: logger}),
          params = {
            urls: [
              'www.google.com',
              'www.yahoo.com',
              'http://www.youtube.com/watch?v=-ywcu1rzPik'
            ]
          };
      api.oembed(params, function(err, res) {
        if (err) {
          if (err.message === 'Forbidden') {
            console.error("Make sure you set environmental variable EMBEDLY_KEY to a valid api key");
          }
          console.error(err.stack);
          res && console.error(res.text);
        } else {
          console.log(res);
        }
        done(err);
      });
    });
  });
});
