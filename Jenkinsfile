pipeline {
    agent any
    parameters {
        string(name : 'DOCKERHUB_USERNAME', defaultValue: 'rohit1998')
        string(name : 'BUILD_VERSION', defaultValue: '1.0')
        string(name : 'PROJECT_NAME', defaultValue: 'angular')
        string(name : 'DOCKERHUB_PASSWORD', defaultValue: 'rohit1998password')             
        }
    stages {
        stage('Build') {  
            steps {              
            	powershell '''
                	npm install
                	npm run ng build --prod '''
             }
            }
        stage('Test') {
            steps {
               powershell''' 
                npm run ng test --watch=false
                '''
                }
            }
        stage('Preparing_Docker_Image') {
        	steps {
                    powershell "docker build --tag=${PROJECT_NAME}:${BUILD_NUMBER} ."
                    powershell "docker login --username=${DOCKERHUB_USERNAME} --password=${DOCKERHUB_PASSWORD}"
                             
                    powershell "docker tag ${PROJECT_NAME}:${BUILD_VERSION} rohit1998/${PROJECT_NAME}:${BUILD_NUMBER}"
                    powershell "docker push rohit1998/${PROJECT_NAME}:${BUILD_NUMBER}"
            	}	
           }
       }   
}