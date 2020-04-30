node {
  try {
    stage('Build test'){
     sh 'npm run build'
    }
    stage('Test'){
      sh 'npm test'
    }
  }
  catch (err) {
    throw err
  }
}
