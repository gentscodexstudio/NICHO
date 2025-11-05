# Vercel Deployment Guide for NICHO

This guide provides step-by-step instructions for deploying the NICHO application to Vercel.

## Step 1: Push Your Code to a Git Repository

Before deploying, ensure your project code is pushed to a Git repository (e.g., GitHub, GitLab, Bitbucket). Vercel uses this repository to build and deploy your application.

## Step 2: Import Your Project into Vercel

1.  **Sign up or Log in** to your [Vercel account](https://vercel.com/).
2.  From your Vercel dashboard, click the **"Add New..."** button and select **"Project"**.
3.  **Connect your Git provider** (e.g., GitHub) and select the repository for your NICHO application.
4.  Vercel will automatically detect that you are using **Next.js** and configure the project settings. You typically do not need to change these default settings.

## Step 3: Configure Environment Variables

This is a critical step to ensure your application can connect to the YouTube API.

1.  In the **"Configure Project"** screen, expand the **"Environment Variables"** section.
2.  You will need to add your YouTube API key.

    *   **Key**: Enter `YOUTUBE_API_KEY`
    *   **Value**: Paste your actual YouTube API key here.

    **Example:**
    *   **Key**: `YOUTUBE_API_KEY`
    *   **Value**: `YOUR_YOUTUBE_API_KEY_GOES_HERE`

    ![Vercel Environment Variable Setup](https://i.imgur.com/example.png)  *(Note: This is an example image link. The key and value fields are what's important.)*

3.  Ensure you have added the variable correctly, then click **"Add"**.

## Step 4: Deploy the Application

1.  After configuring the environment variable, click the **"Deploy"** button.
2.  Vercel will now start building your project. You can monitor the progress in the build logs.
3.  Once the deployment is complete, Vercel will provide you with a unique URL for your live application (e.g., `nicho-app.vercel.app`).

## Step 5: Verify Your Deployment

1.  Click on the Vercel-provided URL to open your live application.
2.  **Test the core functionality**:
    *   Try searching for a keyword in the main search bar.
    *   Click on a video to see the analysis panel.
    *   Use the "NICHE Finder" feature.
3.  **Troubleshooting a 404 Error**:
    *   A common reason for a 404 error on Vercel is an incorrect project structure. This project has been configured with all files in the root directory, which is what Vercel expects.
    *   If you still encounter a 404 error, double-check that your `package.json` file and the `src/app` directory are in the root of your Git repository.
    *   Check the Vercel deployment logs for any build errors. An error during the build process can sometimes lead to a failed deployment and a 404 page.

By following these steps, you should be able to deploy your NICHO application to Vercel successfully.
