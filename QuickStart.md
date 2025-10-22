# Quick Start: Deploying Your Web App

This guide will walk you through deploying your Next.js application using Firebase App Hosting and connecting it to your own custom domain.

## Prerequisites

Before you begin, make sure you have the following:

1.  **A Firebase Account**: If you don't have one, you can sign up for free at [firebase.google.com](https://firebase.google.com).
2.  **Node.js and npm**: This project requires Node.js. You can download it from [nodejs.org](https://nodejs.org/).
3.  **Firebase CLI**: You'll need the Firebase Command Line Interface to deploy your app. Install it globally by running this command in your terminal:
    ```bash
    npm install -g firebase-tools
    ```

## Step 1: Log in to Firebase

First, log in to your Firebase account through the CLI. Run this command and follow the prompts in your browser:

```bash
firebase login
```

## Step 2: Initialize Firebase in Your Project

Navigate to your project's root directory in the terminal and initialize Firebase.

```bash
firebase init
```

You will be asked a series of questions. Here’s how to answer them:

1.  **Which Firebase features do you want to set up?**
    - Use the arrow keys to navigate to `App Hosting: Manage and deploy backends for your web apps` and press the spacebar to select it. Then, press Enter.

2.  **Please select an option:**
    - Choose `Use an existing project` and select the Firebase project you want to use from the list. If you haven't created one yet, you can choose `Create a new project`.

3.  **What is the public directory?**
    - The default is `.apphosting`. You can press Enter to accept it.

Firebase will create a `.firebaserc` file to link your local project to your Firebase project.

## Step 3: Deploy Your Application

Now you're ready to deploy! The project is already configured for deployment with the `apphosting.yaml` file.

1.  **Build your Next.js app for production:**
    ```bash
    npm run build
    ```

2.  **Deploy to Firebase App Hosting:**
    ```bash
    firebase apphosting:backends:deploy
    ```
    This command will upload your built application to Firebase. Once it's finished, the CLI will provide you with a URL where your live app can be viewed (e.g., `https://<your-app-name>--<backend-id>-<region>.web.app`).

## Step 4: Connect a Custom Domain

To make your app accessible via your own domain (e.g., `www.yourdomain.com`):

1.  **Go to the Firebase Console**: Open your project in the Firebase Console.
2.  **Navigate to App Hosting**: In the left-hand menu under the "Build" section, click on **App Hosting**.
3.  **Add Custom Domain**: Click the **"Add custom domain"** button.
4.  **Enter Your Domain**: Type in the domain you want to connect (e.g., `www.yourdomain.com`) and click "Continue".
5.  **Verify Ownership**: Firebase needs to verify that you own the domain. It will provide you with a **TXT record**. You'll need to add this record to your domain's DNS settings through your domain registrar (e.g., GoDaddy, Namecheap, Google Domains).
6.  **Add A Records**: After your domain is verified, Firebase will provide you with one or more **A records**. Add these records to your domain's DNS settings as well. These records point your domain to Firebase's servers.

**That's it!** DNS changes can take anywhere from a few minutes to 48 hours to propagate across the internet. Once they do, your web app will be live on your custom domain with a free SSL certificate automatically provided by Firebase.
