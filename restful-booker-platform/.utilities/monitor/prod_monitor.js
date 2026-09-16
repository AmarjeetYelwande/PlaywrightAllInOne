const apiMonitor = require('./apimonitor.js');

process.stdout.write("Waiting for RBP to turn on");

apiMonitor.checkForLife('https', 'https://automationintesting.online/booking/actuator/health');
apiMonitor.checkForLife('https', 'https://automationintesting.online/room/actuator/health');
apiMonitor.checkForLife('https', 'https://automationintesting.online/branding/actuator/health');
apiMonitor.checkForLife('https', 'https://automationintesting.online/');
apiMonitor.checkForLife('https', 'https://automationintesting.online/auth/actuator/health');
apiMonitor.checkForLife('https', 'https://automationintesting.online/report/actuator/health');
apiMonitor.checkForLife('https', 'https://automationintesting.online/message/actuator/health');