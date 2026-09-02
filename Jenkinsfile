pipeline {
    agent {
        label "agent-1"
    }

    environment {
        IMAGE_NAME = "abhishekkargeti/chatapp-frontend-image"
        NAMESPACE  = "production-namespace"
        DEPLOYMENT = "chatapp-frontend-deployment"
        CONTAINER  = "chat-app-frontend"
    }

    stages {

        stage("Code Cloning") {
            steps {
                echo "Code Cloning"

                git(
                    url: "https://github.com/abhishekkargeti1/ChatApplication-FrontEnd.git",
                    branch: "main"
                )
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

                sh '''
                    echo "Checking React build..."
                    grep -o "/chatapp" dist/assets/*.js | head
                '''
            }
        }

        stage("Testing") {
            steps {
                echo "Code Testing"
            }
        }

        stage("Building Docker Image") {
            steps {
                echo "Building Docker image"

                sh """
                    docker build \
                    -t ${IMAGE_NAME}:${BUILD_NUMBER} \
                    .
                """
            }
        }

        stage("Pushing Docker Image") {
            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: 'DockerCred',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {

                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login \
                        -u "$DOCKER_USERNAME" \
                        --password-stdin
                    '''

                    sh """
                        docker push ${IMAGE_NAME}:${BUILD_NUMBER}
                    """
                }
            }
        }

        stage("Deployment") {
            steps {

                echo "Deploying React application..."

                sh """
                    kubectl apply \
                    -f /home/ubuntu/kubernetes/chat-application-frontend/${DEPLOYMENT}.yml

                    kubectl set image deployment/${DEPLOYMENT} \
                    ${CONTAINER}=${IMAGE_NAME}:${BUILD_NUMBER} \
                    -n ${NAMESPACE}

                    kubectl rollout status deployment/${DEPLOYMENT} \
                    -n ${NAMESPACE}
                """
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