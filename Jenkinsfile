pipeline {
    agent any

    tools {
        // Tentukan alat yang dibutuhkan
        maven 'Maven 3.9.6' // Sesuaikan dengan nama Maven yang Anda tambahkan di Jenkins
        jdk 'JDK 21'        // Sesuaikan dengan nama JDK yang Anda tambahkan di Jenkins
    }

    environment {
        // Tentukan environment variables jika diperlukan
        MAVEN_HOME = tool 'Maven 3.9.6'
        JAVA_HOME = tool 'JDK 21'
        PATH = "${env.PATH};${MAVEN_HOME}\\bin;${JAVA_HOME}\\bin"
    }

    stages {
        stage('Checkout') {
            steps {
                // Clone repository dari SCM (misalnya GitHub)
                git url: 'https://github.com/batprogram/gyy-01.git', branch: 'main'
            }
        }

        stage('Build') {
            steps {
                bat "${MAVEN_HOME}\\bin\\mvn clean package"
            }
        }

        stage('Test') {
            steps {
                bat "${MAVEN_HOME}\\bin\\mvn test"
            }
            post {
                always {
                    junit '/target/surefire-reports/*.xml'
                }
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying to production...'
                // Menggunakan start untuk menjalankan proses di latar belakang di Windows
                bat 'start java -jar target/test-project-1.0.0.jar'
            }
        }
    }

    post {
        always {
            emailext(
                subject: "Build ${currentBuild.fullDisplayName} - ${currentBuild.result}",
                body: "Build ${currentBuild.fullDisplayName} finished with status: ${currentBuild.result}. Check console output at ${env.BUILD_URL} to view the results.",
                recipientProviders: [[$class: 'DevelopersRecipientProvider']]
            )
        }
        success {
            echo 'Build was successful!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
