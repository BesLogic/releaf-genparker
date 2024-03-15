import './routers/setup.route.js';

process.on('uncaughtException', function (error) {
  console.error(`The app crashed ${error.message}`);
  console.log("test")
});
