#!/usr/bin/env groovy
pipeline {
  agent any
  tools {nodejs "latest"}
  stages {
    stage('preflight') {
      steps {
        echo sh(returnStdout: true, script: 'env')
        sh 'node -v'
      }
    }
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
}
