// @Library('geomart@master') _
@Library('geomart@feature_0000_test') _

pipeline {
  agent any

  environment {
    REFERER = 'xzC1fcjr0IORrXATPShhzhpyhI3wwB'
    STACKSET_NAME='jenkinstack-gis-geomartcloud-geohub'
    NAME = 'geohub'
  }
  
  stages {
    stage('Clone') {
      steps {
        firstStage()
      }
    }

    stage('Setup Environment variables') {
      steps {
        script {
            echo "Branch: $env.BRANCH_NAME"
            if(env.BRANCH_NAME == 'master') {
              env.DOMAINNAME = '.ss.pge.com'
              env.VERSION = 'GH-02'
            }
             // Branch hotfix
            else if (env.BRANCH_NAME.startsWith("hotfix")) {
              env.DOMAINNAME = '.nonprod.pge.com'
              env.VERSION = 'GH-01'
             }
              // Branch release
            else if (env.BRANCH_NAME.startsWith("release")) {
              env.DOMAINNAME = '.nonprod.pge.com'
              env.VERSION = 'GH-01'
             }
            // Branch feature
             else if (env.BRANCH_NAME.startsWith("feature_")) {
              env.DOMAINNAME = '.nonprod.pge.com'
              env.VERSION = 'GH-01'
            }
            else if(env.BRANCH_NAME == 'develop') {
              env.DOMAINNAME = '.nonprod.pge.com'
              env.VERSION = 'GH-01'
            }
          }
        }
      }
    
    stage('Install node dependencies of the web app') {
        steps {
        cliDockerRun("npm install", false)
      }
    }
/*
    stage('Lint') {
      steps {
        cliDockerRun("npm run lint", false)
      }
    }

    stage('Unit Tests') {
      steps {
        cliDockerRun("CI=true npm run test")
      }
    }
 */   
    stage('Build') {   
      steps {
        /* script {
          if(env.test_deploy == 'true') {
            env.BUILD = 'testing'
          }
          else {
           env.BUILD = "${ENVIRONMENT_NAME}"
          }
          */
         cliDockerRun("npm run build --env=${ENVIRONMENT_NAME}")
       // }
      }
    }
    
    stage('Create Infrastructure') {
      steps {
        script {
          uicloudformation(STACKSET_NAME)
        }
      }
    }

    stage('Deployments') {
      steps {
        cpToS3("./build", "s3://${env.FQDN}", "--recursive")
      }
    }
  }
  
  post {
    always {
      postStage() 
    }
  }
}
