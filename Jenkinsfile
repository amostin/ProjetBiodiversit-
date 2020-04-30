pipeline {
  agent any

  tools {nodejs "node"}

  stages {

    stage('Cloning Git') {
      steps {
        git 'https://github.com/Cyril-Etyk/ProjetBiodiversit-'
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
         sh 'npm test'
      }
      stage('Deploy') {
        steps {
           sh 'npm run deploy'
        }
    }
  }
}
