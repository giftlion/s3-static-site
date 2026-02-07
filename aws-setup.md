# AWS S3 Static Site Setup Guide

This guide will help you set up AWS S3 for hosting your static website and configure it for GitHub Actions deployment.

## Prerequisites

- AWS Account
- AWS CLI installed (optional, for local testing)
- GitHub repository

## Step 1: Create S3 Bucket

1. Log in to the AWS Console
2. Navigate to **S3** service
3. Click **Create bucket**
4. Configure the bucket:
   - **Bucket name**: Choose a unique name (e.g., `my-static-site-2026`)
   - **Region**: Choose your preferred region (e.g., `us-east-1`)
   - **Block Public Access**: **Uncheck** "Block all public access" (required for static website hosting)
   - Acknowledge the warning
   - Leave other settings as default
5. Click **Create bucket**

## Step 2: Enable Static Website Hosting

1. Select your bucket
2. Go to **Properties** tab
3. Scroll to **Static website hosting**
4. Click **Edit**
5. Enable static website hosting:
   - **Hosting type**: Static website hosting
   - **Index document**: `index.html`
   - **Error document**: `index.html` (optional, for SPA routing)
6. Click **Save changes**
7. Note the **Bucket website endpoint** URL (you'll need this later)

## Step 3: Configure Bucket Policy

1. Go to **Permissions** tab
2. Click **Bucket policy**
3. Add the following policy (replace `YOUR-BUCKET-NAME` with your actual bucket name):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

4. Click **Save changes**

## Step 4: Create IAM User for GitHub Actions

1. Navigate to **IAM** service in AWS Console
2. Click **Users** → **Create user**
3. User name: `github-actions-deploy` (or your preferred name)
4. Click **Next**
5. **Attach policies directly**:
   - Search and select: `AmazonS3FullAccess` (or create a custom policy with minimal permissions)
6. Click **Next** → **Create user**
7. Click on the newly created user
8. Go to **Security credentials** tab
9. Click **Create access key**
10. Select **Application running outside AWS**
11. Click **Next** → **Create access key**
12. **IMPORTANT**: Copy both:
    - **Access key ID**
    - **Secret access key** (you won't be able to see it again!)

## Step 5: Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add the following:

   - **Name**: `AWS_ACCESS_KEY_ID`
     **Value**: Your IAM user's access key ID

   - **Name**: `AWS_SECRET_ACCESS_KEY`
     **Value**: Your IAM user's secret access key

   - **Name**: `AWS_REGION`
     **Value**: Your S3 bucket region (e.g., `us-east-1`)

   - **Name**: `S3_BUCKET_NAME`
     **Value**: Your S3 bucket name (e.g., `my-static-site-2026`)

   - **Name**: `CLOUDFRONT_DISTRIBUTION_ID` (Optional)
     **Value**: Your CloudFront distribution ID (if using CloudFront)

## Step 6: Test Deployment

1. Push your code to the `main` branch:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Go to **Actions** tab in GitHub to see the deployment workflow running

3. Once complete, visit your bucket's website endpoint URL:
   - Format: `http://YOUR-BUCKET-NAME.s3-website-REGION.amazonaws.com`
   - Or find it in S3 → Your bucket → Properties → Static website hosting

## Optional: CloudFront Setup (Recommended for Production)

CloudFront provides:
- HTTPS/SSL certificate
- Custom domain support
- Better performance with CDN
- Lower costs

### Setup CloudFront:

1. Navigate to **CloudFront** service
2. Click **Create distribution**
3. **Origin domain**: Select your S3 bucket (not the website endpoint)
4. **Origin access**: Select "Origin access control settings (recommended)"
5. **Viewer protocol policy**: Redirect HTTP to HTTPS
6. **Default root object**: `index.html`
7. Click **Create distribution**
8. Wait for deployment (15-20 minutes)
9. Update your bucket policy to allow CloudFront access
10. Add `CLOUDFRONT_DISTRIBUTION_ID` to GitHub secrets

## Troubleshooting

### 403 Forbidden Error
- Check bucket policy allows public read access
- Verify static website hosting is enabled
- Ensure files are uploaded correctly

### GitHub Actions Fails
- Verify all GitHub secrets are set correctly
- Check IAM user has S3 permissions
- Review workflow logs in GitHub Actions tab

### Files Not Updating
- Check CloudFront cache (if using CloudFront)
- Verify `--delete` flag in sync command is working
- Check file paths and names match exactly

## Security Best Practices

1. **Use IAM roles with minimal permissions** instead of full S3 access
2. **Enable CloudFront** for HTTPS and better security
3. **Use environment-specific buckets** (dev, staging, prod)
4. **Enable S3 versioning** for backup and recovery
5. **Set up CloudWatch alarms** for monitoring

## Custom IAM Policy (Minimal Permissions)

Instead of `AmazonS3FullAccess`, use this custom policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::YOUR-BUCKET-NAME",
        "arn:aws:s3:::YOUR-BUCKET-NAME/*"
      ]
    }
  ]
}
```

Replace `YOUR-BUCKET-NAME` with your actual bucket name.
