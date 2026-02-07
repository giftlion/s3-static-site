# Static Site Deployment to AWS S3

A modern static website with automated CI/CD deployment to AWS S3 using GitHub Actions.

## 🚀 Features

- **Modern Design**: Clean, responsive design with smooth animations
- **Automated Deployment**: GitHub Actions workflow for seamless CI/CD
- **AWS S3 Hosting**: Reliable and scalable cloud hosting
- **Zero Configuration**: Ready to deploy with minimal setup

## 📁 Project Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── index.html                  # Main HTML file
├── styles.css                  # Stylesheet
├── script.js                   # JavaScript
├── aws-setup.md               # Detailed AWS setup guide
└── README.md                  # This file
```

## 🛠️ Quick Start

### 1. Clone and Setup

```bash
git clone <your-repo-url>
cd s3-static-site
```

### 2. AWS Setup

Follow the detailed guide in [`aws-setup.md`](./aws-setup.md) to:

1. Create an S3 bucket
2. Enable static website hosting
3. Configure bucket permissions
4. Create IAM user for GitHub Actions
5. Set up GitHub secrets

**Quick Summary:**
- Create S3 bucket with public access
- Enable static website hosting
- Create IAM user with S3 permissions
- Add AWS credentials to GitHub secrets

### 3. Configure GitHub Secrets

In your GitHub repository, go to **Settings** → **Secrets and variables** → **Actions** and add:

- `AWS_ACCESS_KEY_ID` - Your IAM user access key
- `AWS_SECRET_ACCESS_KEY` - Your IAM user secret key
- `AWS_REGION` - Your S3 bucket region (e.g., `us-east-1`)
- `S3_BUCKET_NAME` - Your S3 bucket name
- `CLOUDFRONT_DISTRIBUTION_ID` - (Optional) CloudFront distribution ID

### 4. Deploy

Push to the `main` branch:

```bash
git add .
git commit -m "Initial deployment"
git push origin main
```

The GitHub Actions workflow will automatically:
1. Checkout your code
2. Configure AWS credentials
3. Sync files to S3
4. Invalidate CloudFront cache (if configured)

## 📝 Customization

### Update Content

Edit `index.html`, `styles.css`, and `script.js` to customize your site.

### Modify Deployment

Edit `.github/workflows/deploy.yml` to customize the deployment process.

### Add Files

Add any static files (images, fonts, etc.) to the root directory. They'll be automatically deployed.

## 🔧 Local Development

Simply open `index.html` in your browser or use a local server:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## 🌐 Accessing Your Site

After deployment, access your site via:

- **S3 Website Endpoint**: `http://YOUR-BUCKET-NAME.s3-website-REGION.amazonaws.com`
- **CloudFront URL** (if configured): `https://YOUR-DISTRIBUTION-ID.cloudfront.net`
- **Custom Domain** (if configured): Your custom domain

## 📚 Documentation

- [AWS Setup Guide](./aws-setup.md) - Detailed AWS configuration instructions
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 🔒 Security Notes

- Never commit AWS credentials to the repository
- Use IAM roles with minimal required permissions
- Consider using CloudFront for HTTPS and better security
- Enable S3 versioning for backup and recovery

## 🐛 Troubleshooting

### Deployment Fails

1. Check GitHub Actions logs for errors
2. Verify all secrets are set correctly
3. Ensure IAM user has proper S3 permissions
4. Check bucket name and region match

### 403 Forbidden

1. Verify bucket policy allows public read access
2. Check static website hosting is enabled
3. Ensure files are uploaded correctly

### Files Not Updating

1. Check CloudFront cache (if using CloudFront)
2. Verify `--delete` flag in sync command
3. Check file paths match exactly

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Happy Deploying! 🚀**
