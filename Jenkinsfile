pipeline {
    agent any
    tools {
        nodejs "node"
    }
    environment {
        CACHE_DIR = 'node_modules'
        VERCEL_TOKEN = credentials('vercel-id')
    }
    stages {
        stage('Build') {
            steps {
                script {
                    def packageLockExists = fileExists('package-lock.json')
                    def nodeModulesExists = fileExists(CACHE_DIR)

                    if (!nodeModulesExists || !packageLockExists) {
                        echo 'node_modules or package-lock.json missing. Running npm install...'
                        sh 'npm install'
                    } else {
                        def changes = sh(script: 'git diff --quiet HEAD~1 HEAD package-lock.json || echo "CHANGED"', returnStdout: true).trim()
                        if (changes == "CHANGED") {
                            echo 'package-lock.json has changed. Running npm install...'
                            sh 'npm install'
                        } else {
                            echo 'No dependency changes detected. Skipping npm install.'
                        }
                    }
                }
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
                sh 'npm run build'
            }
        }

        stage('Deploy to Vercel') {
            steps {
                echo 'Deploying to Vercel...'
                sh 'npm install -g vercel' 
                sh 'vercel deploy --prod --token $VERCEL_TOKEN --yes'
            }
        }
    }
}
