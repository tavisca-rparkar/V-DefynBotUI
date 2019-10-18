pipeline {
    agent any
    parameters {
        string(name : 'DOCKERHUB_USERNAME', defaultValue: 'rohit1998')
        string(name : 'BUILD_NUMBER', defaultValue: '1.0')
        string(name : 'PROJECT_NAME', defaultValue: 'angular')
        string(name : 'DOCKERHUB_PASSWORD', defaultValue: 'rohit1998password')             
        }
    stages {
        stage('Build') {  
            steps {              
            	bat 'npm install'
				bat 'npm run ng -- build --prod'
             }
            }
        stage('Test') {
            steps {
               bat'npm run ng -- test --watch=false'
                }
            }
        stage('Preparing_Docker_Image') {
        	steps {
                    bat 'docker build --tag=%PROJECT_NAME%:%BUILD_NUMBER% .'
                    bat 'docker login --username=%DOCKERHUB_USERNAME% --password=%DOCKERHUB_PASSWORD%'
                             
                    bat 'docker tag %PROJECT_NAME%:%BUILD_NUMBER% rohit1998/%PROJECT_NAME%:%BUILD_NUMBER%'
                    bat 'docker push rohit1998/%PROJECT_NAME%:%BUILD_NUMBER%'
            	}	
           }
       }   
}