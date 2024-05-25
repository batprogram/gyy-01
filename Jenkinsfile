pipeline {
    agent any

    tools {
        // Tentukan alat yang dibutuhkan
        jdk 'JDK 21' // Sesuaikan dengan nama JDK yang Anda tambahkan di Jenkins
    }

    environment {
        // Tentukan environment variables jika diperlukan
        JAVA_HOME = tool 'JDK 21'
        PATH = "${env.PATH};${JAVA_HOME}\\bin"
    }

    stages {
        stage('Checkout') {
            steps {
                // Clone repository dari SCM (misalnya GitHub)
                git url: 'https://github.com/batprogram/gyy-01.git', branch: 'main'
            }
        }

        stage('Test') {
            steps {
                // Install dependensi JavaScript
                bat 'npm install'
                // Jalankan pengujian Jest
                bat 'npm test'
            }
            post {
                always {
                    // Mengarsipkan laporan tes Jest dalam format JUnit XML
                    junit '**/jest-test-results.xml'
                }
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying to production...'
                // Tambahkan langkah-langkah deploy Anda di sini
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
