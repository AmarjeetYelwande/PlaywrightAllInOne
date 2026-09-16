const apiMonitor = require('./apimonitor.js');

process.stdout.write("Waiting for RBP to turn on");

apiMonitor.checkForLife('http', 'http://localhost:3000/booking/actuator/health');
apiMonitor.checkForLife('http', 'http://localhost:3001/room/actuator/health');
apiMonitor.checkForLife('http', 'http://localhost:3002/branding/actuator/health');
apiMonitor.checkForLife('http', 'http://localhost:3003/');
apiMonitor.checkForLife('http', 'http://localhost:3004/auth/actuator/health');
apiMonitor.checkForLife('http', 'http://localhost:3005/report/actuator/health');
apiMonitor.checkForLife('http', 'http://localhost:3006/message/actuator/health');
