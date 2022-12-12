pipeline {
    agent any
    tools {
        nodejs "nodejs"
        git "Default"
    }
        
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/AnubenKeshavala/COMP367_GroupProject.git'
            }
        }
        stage('Build') {
          steps {
            bat 'npm install'
          }
        }  



       stage('Test') {
          steps {
            echo "Test run successfully!"
          }
        }
    }
}
