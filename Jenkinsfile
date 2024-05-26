pipeline {
    agent any

    tools {
        // Tentukan alat yang dibutuhkan
        NodeJS'NodeJS 20.13.1' // Sesuaikan dengan nama JDK yang Anda tambahkan di Jenkins
    }

    environment {
        // Tentukan environment variables jika diperlukan
        NODE_HOME = tool name: 'NodeJS', type: 'NodeJSInstallation'
        PATH = "${env.NODE_HOME}/bin:${env.PATH}"
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
