pipeline {
    agent any
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'Dev',
                    credentialsId: 'POC-GIT',
                    url: 'https://gitlab.com/Mahir2k2/backend-node.git'
            }
        }
        stage('CodeScan') {
            steps {
                withSonarQubeEnv('sonarqube') {
                    sh '/opt/sonar-scanner/bin/sonar-scanner'
                }
            }
        }
        stage("Quality gate") {            
            steps {                
                waitForQualityGate abortPipeline: true           
            }        
        }
          
        stage('Build') {
            steps {
                sh 'npm install --force'
                sh 'CI=false npm run build'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t mahirmansuri/poctest2:backend-$BUILD_NUMBER .'
            }
        }
        stage('Push Image') {
            steps {
                sh 'docker login -u mahirmansuri -p 123@itims3013'
                sh 'docker push mahirmansuri/poctest2:backend-$BUILD_NUMBER'
            }
        }
        stage('Deploy to Minikube') {
            steps {
kubeconfig(caCertificate: '''-----BEGIN CERTIFICATE-----
MIIDITCCAgmgAwIBAgIBAjANBgkqhkiG9w0BAQsFADAVMRMwEQYDVQQDEwptaW5p
a3ViZUNBMB4XDTIzMDIwMTA4NDQ1M1oXDTI2MDIwMTA4NDQ1M1owMTEXMBUGA1UE
ChMOc3lzdGVtOm1hc3RlcnMxFjAUBgNVBAMTDW1pbmlrdWJlLXVzZXIwggEiMA0G
CSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC6HoeXMsyqGiYywpF4D81ov9IeI20r
7eguw5+oZ8NSPQUWC0z3E75KcQ5gVFHktrS2ULuCdz4ESap8GM37eYulc2GcHzF8
E2zSjTWH0nmsrYpJAZybYVYlNGjDl3mwSThDbdl5IRD3YOdsPOxO3lxJLoU7+7L6
Mcdsas9xp4nQZEhONh44lPy5+oCDxLMHWMh+xB8rKXgy4n8knr53+NM+KHYizsm9
p6qAXtakfPYtsT0ZT72DbLC90xq5Yc9gpbPtayYvnbMRzjhbniiD7UvMEU9X1zss
6DXTBLMOCfECxjiUKPpdBlNItywTvmDodvl3NNWGpJ6LPnbHzW5zwRcrAgMBAAGj
YDBeMA4GA1UdDwEB/wQEAwIFoDAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUH
AwIwDAYDVR0TAQH/BAIwADAfBgNVHSMEGDAWgBQXglAzAj/lmPxg5wm+fVYIpGou
njANBgkqhkiG9w0BAQsFAAOCAQEAhDt+PndXZ8xTR4gJzuwql0UWLdtq+dV35IrW
Zkhkbns95QSlJjWR0H9JPn5C9hL8+ftQaBYGiIqoa+dz+4xq38z3p+5dk/jCcQSe
KN7v8Vn/XowkY1m+aiZTnOyeyr/u7gfmXoy/6er6tqHzNC+bJF6eoHQEAuepJPpF
PhF1qiazHhiUdUs3aFJwM5CUaNpS4ORI6NK6qwKE2r5DOxCaRXEDAxyCcW4t57oW
jDh4KiPpEnHZXm1vcw86W/4aFumMMKPdQSl7EsT+6V/AAKyjgzuQVOdWKuCq/hZY
uzJGLYNNkb3zz1pwndWk4yEER+TnFTQbyQk3IOv5oceOPKYRzg==
-----END CERTIFICATE-----''', credentialsId: 'a3aa575d-8edf-42a0-84dc-24d504176131', serverUrl: 'https://192.168.49.2:8443') {
    // some block

                    sh 'kubectl set image deployment/backend backend=mahirmansuri/poctest2:backend-$BUILD_NUMBER'
                    sh "sed -i 's|image: mahirmansuri/poctest2:backend.*|image: mahirmansuri/poctest2:backend-$BUILD_NUMBER|' backend.yml"
                    sh 'kubectl apply -f backend.yml'
                }
            }
        }       
    }
}

