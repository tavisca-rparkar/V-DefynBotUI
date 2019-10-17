pipeline
	{
	agent any
		stages{		
			stage('Build') 
				{
				steps{
					echo'building....'
				       }
				  }
			stage('Test') 
			         {
				steps{
					echo'Testing...'
				      }
				  }
			  stage('Publish')
				 {
				 steps{
					echo'Publishing.....'
				      }
				   }
			}
	 post{
		always{
			deleteDir()
		}
	  }
  }
	
		
					
					
