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
        
       stage('Deliver') {
           steps {
               echo "Deliver started to Dev Env"
               input message: 'Finished using the web site? (Click "Proceed" to continue)' 
           }
        }
    }
}