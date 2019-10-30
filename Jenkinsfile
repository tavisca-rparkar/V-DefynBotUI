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
              bat 'npm audit fix'
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
                    bat 'docker build --tag=rohit1998/%PROJECT_NAME% .'
                    bat 'docker login --username=%DOCKERHUB_USERNAME% --password=%DOCKERHUB_PASSWORD%'
                             
                    bat 'docker push rohit1998/%PROJECT_NAME%'
                    bat 'docker run -d -p 4000:80 rohit1998/%PROJECT_NAME%'
            	}	
           }
       }   
}
