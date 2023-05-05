const sonarqubeScanner = require('sonarqube-scanner');
sonarqubeScanner({
     serverUrl: 'http://localhost:9000',
     options: {
          'sonar.sources': '.',
          'sonar.inclusions': 'src/**',
          'sonar.login': 'admin',
          'sonar.password': 'sonar',

     }
}, () => { });

// Analyze "blog-frontend": sqp_39ece11867821d924b5a6e8ac906908d77def7bc
// sonar-scanner.bat -D"sonar.projectKey=blog-frontend" -D"sonar.sources=." -D"sonar.host.url=http://localhost:9005" -D"sonar.login=sqp_39ece11867821d924b5a6e8ac906908d77def7bc"