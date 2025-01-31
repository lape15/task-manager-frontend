pipeline {
    agent any
     tools {
        nodejs "node"  
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                echo 'Building..'
            }
        }
        stage('Test') {
            steps {
                 sh 'npm run test' 
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}