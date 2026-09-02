pipeline{
    agent {
        label "agent-1"
    }
    environment {
        IMAGE_NAME = "abhishekkargeti/chatapp-frontend-image"
        NAMESPACE  = "production-namespace"
        DEPLOYMENT = "chataap-frontend-deployment"
        CONTAINER  = "chat-app-frontend"
    }
    stages{
        stage("Code Cloning"){
            steps{
                sh 'echo "Code Cloning"'
                git url :"https://github.com/abhishekkargeti1/ChatApplication-FrontEnd.git", branch:"main"
            }
        }
       stage("Install Dependencies") {
            steps {
                echo "Installing React dependencies"

                sh 'npm install'
            }
        }
        stage("Build React Application") {
            steps {
                echo "Building React application"

                sh 'npm run build'
            }
        }
        stage("Testing"){
            steps{
                sh 'echo "Code Testing"'
            }
        }
        stage("Building Docker Image") {
            steps {
                echo "Building Docker image"

                sh '''
                    docker build \
                    -t ${IMAGE_NAME}:${BUILD_NUMBER} \
                    -t ${IMAGE_NAME}:latest \
                    .
                '''
            }
        }
        stage("Pushing-Docker-Image"){
            steps{
                sh 'echo "Pushing Docker Image"'
            withCredentials([
             usernamePassword(
                 credentialsId: 'DockerCred',
                 usernameVariable: 'DOCKER_USERNAME',
                 passwordVariable: 'DOCKER_PASSWORD'
            )
                ]){
                    sh 'echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin'
                    sh 'docker image tag ${IMAGE_NAME}:latest  abhishekkargeti/chatapp-frontend-image:latest'
                    sh 'docker push abhishekkargeti/chatapp-frontend-image:latest '
                    sh 'echo "Image Push Successfully"'
                }
            }
        } 
        stage("Deployment"){
            steps{
                sh 'echo "Code Deployment"'
                sh 'kubectl apply -f  /home/ubuntu/kubernetes/chat-application-backend/${DEPLOYMENT}.yml '
                
        }
    }
        stage("Verify Deployment") {
            steps {
                echo "Checking Kubernetes deployment..."

                sh """
                    kubectl get nodes
                    kubectl get pods -n ${NAMESPACE} -o wide
                    kubectl get svc -n ${NAMESPACE}
                    kubectl get deployment -n ${NAMESPACE}
                """
            }
        }
    }


 post {

        success {
            echo "CI/CD pipeline completed successfully!"
        }

        failure {
            echo "CI/CD pipeline failed!"
        }
    }
}


