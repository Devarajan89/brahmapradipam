# Deployment Guide for Hostinger Shared Hosting

This guide explains how to deploy Brahmapradipam to Hostinger using their built-in Git deployment feature.

## 🚀 Setup Instructions

### 1. Setup Git Repository on Hostinger

1. Log in to your Hostinger **hPanel**
2. Go to **Advanced** → **Git**
3. Click **Create Repository**
4. Fill in the details:
   - **Repository Name**: `brahmapradipam` (or your preferred name)
   - **Repository Path**: Choose where files will be deployed (e.g., `/public_html`)
   - **Branch**: `main`
5. Click **Create**
6. **Copy the Git URL** shown (looks like: `ssh://username@server.hostinger.com:port/~/repository.git`)

### 2. Create Deploy Branch Locally

```bash
# Create and checkout deploy branch
git checkout -b deploy

# Push to GitHub
git push -u origin deploy
```

### 3. Configure GitHub Secret

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add this secret:

| Secret Name | Value |
|-------------|-------|
| `HOSTINGER_REPO_URL` | The Git URL from Hostinger (e.g., `ssh://u123456789@server.hostinger.com:65002/~/repository.git`) |

### 4. Setup SSH Key (Important!)

#### Option A: Generate New SSH Key for GitHub Actions

```bash
# Generate SSH key pair
ssh-keygen -t ed25519 -C "github-actions@brahmapradipam" -f ./deploy_key -N ""
```

This creates two files:
- `deploy_key` (private key)
- `deploy_key.pub` (public key)

#### Add Public Key to Hostinger

1. Go to Hostinger **hPanel** → **Advanced** → **SSH Keys**
2. Click **Add SSH Key**
3. Paste content of `deploy_key.pub`
4. Click **Add Key**

#### Add Private Key to GitHub

1. Go to GitHub **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `HOSTINGER_SSH_KEY`
4. Value: Copy entire content of `deploy_key` file (including `-----BEGIN` and `-----END` lines)
5. Click **Add secret**

#### Update Workflow to Use SSH Key

The workflow needs the SSH key. Update `deploy-hostinger.yml`:

```yaml
- name: Setup SSH Key
  run: |
    mkdir -p ~/.ssh
    echo "${{ secrets.HOSTINGER_SSH_KEY }}" > ~/.ssh/id_ed25519
    chmod 600 ~/.ssh/id_ed25519
    ssh-keyscan -p ${{ secrets.HOSTINGER_SSH_PORT || 65002 }} ${{ secrets.HOSTINGER_SSH_HOST }} >> ~/.ssh/known_hosts

- name: Deploy to Hostinger
  env:
    HOSTINGER_REPO_URL: ${{ secrets.HOSTINGER_REPO_URL }}
  run: |
    git remote add hostinger $HOSTINGER_REPO_URL || git remote set-url hostinger $HOSTINGER_REPO_URL
    git push hostinger deploy:main --force
```

### 5. Deploy Your Site

#### Method 1: Push to Deploy Branch
```bash
# Make changes on main branch
git checkout main
# ... make your changes ...
git add .
git commit -m "Your changes"
git push

# Merge to deploy branch and trigger deployment
git checkout deploy
git merge main
git push origin deploy
```

#### Method 2: Manual Trigger
1. Go to **Actions** tab on GitHub
2. Click **Deploy to Hostinger via Git**
3. Click **Run workflow**
4. Select `deploy` branch
5. Click **Run workflow**

### 6. Alternative: Simple Push Method

If you prefer simpler deployment without GitHub Actions:

```bash
# Add Hostinger as a remote (one time setup)
git remote add hostinger ssh://u123456789@server.hostinger.com:65002/~/repository.git

# Deploy directly
git checkout deploy
git merge main
git push hostinger deploy:main
```

## 🔧 Hostinger Git Configuration

### Post-Receive Hook (Optional)

If you need to run build commands on Hostinger after deployment:

1. SSH into your Hostinger account
2. Navigate to repository: `cd ~/repository.git`
3. Create/edit hook: `nano hooks/post-receive`
4. Add build script:

```bash
#!/bin/bash
GIT_WORK_TREE=/home/u123456789/domains/yourdomain.com/public_html git checkout -f
cd /home/u123456789/domains/yourdomain.com/public_html

# If you need to run build on server (not recommended, build locally instead)
# npm install
# npm run build
```

5. Make executable: `chmod +x hooks/post-receive`

**Note**: It's better to build locally/on GitHub Actions and push the built files.

## 📁 Directory Structure on Hostinger

Your files will be deployed to the path you specified:
```
/home/u123456789/domains/yourdomain.com/
└── public_html/          # Your deployment path
    ├── index.html
    ├── about/
    ├── library/
    ├── assets/
    └── ...
```

## 🛡️ Security Best Practices

1. **Protect SSH Keys**: Never commit private keys to repository
2. **Use GitHub Secrets**: Store all credentials securely
3. **Limit Access**: Create separate SSH key just for deployment
4. **Regular Updates**: Keep dependencies updated
5. **Monitor Logs**: Check GitHub Actions logs for issues

## 🐛 Troubleshooting

### Authentication Failed
- Verify SSH key is added to Hostinger
- Check `HOSTINGER_SSH_KEY` secret is correct (including headers)
- Ensure SSH key has no passphrase

### Wrong Directory
- Check repository path in Hostinger Git settings
- Verify deployment path in post-receive hook

### Files Not Updating
- Clear browser cache
- Check if build was successful in Actions log
- Verify Git push completed successfully
- SSH to server and check files manually

### Build Fails
- Check Node.js version compatibility
- Verify package.json scripts
- Check for missing dependencies in package-lock.json

## 📞 Hostinger Support

If you encounter Hostinger-specific issues:
- **Knowledge Base**: https://support.hostinger.com
- **Live Chat**: Available in hPanel
- **Tutorials**: Search for "Hostinger Git deployment"

## ✅ Deployment Checklist

- [ ] Git repository created in Hostinger hPanel
- [ ] Deploy branch created and pushed to GitHub
- [ ] `HOSTINGER_REPO_URL` added to GitHub Secrets
- [ ] SSH key generated and added to both Hostinger and GitHub
- [ ] Workflow file committed to repository
- [ ] Test deployment completed successfully
- [ ] Website loads correctly on your domain
- [ ] All assets (images, fonts) loading properly

---

## 🙏 Need Help?

For project-specific issues, check the GitHub repository issues section.

**श्री गुरुभ्यो नमः**
