node () {
    stage('build') {
      steps {
        sh 'npm --version'
        sh 'git log --reverse -1'
        sh 'npm run deploy'
      }
    }
    stage('test') {
      steps {
        sh 'npm test'
      }
    }
  }
