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

### 3. Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these secrets:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `HOSTINGER_REPO_URL` | `ssh://u123456789@server.hostinger.com:65002/~/repository.git` | The Git URL from Hostinger |
| `HOSTINGER_SSH_KEY` | Your SSH private key | See step 4 below |
| `HOSTINGER_SSH_HOST` | `server.hostinger.com` | Extract from Git URL |
| `HOSTINGER_SSH_PORT` | `65002` | Extract from Git URL (optional, defaults to 65002) |

### 4. Setup SSH Authentication

Hostinger Git uses SSH for authentication. You need to use your existing SSH key or generate a new one:

#### Option A: Use Existing Hostinger SSH Access

If you already have SSH access to your Hostinger account:

1. Find your private key (usually in `~/.ssh/id_rsa` or `~/.ssh/id_ed25519`)
2. Copy the entire private key content
3. Add it to GitHub Secrets as `HOSTINGER_SSH_KEY`

#### Option B: Generate New SSH Key

```bash
# Generate SSH key pair
ssh-keygen -t ed25519 -C "github-actions@brahmapradipam" -f ./deploy_key -N ""
```

This creates two files:
- `deploy_key` (private key)
- `deploy_key.pub` (public key)

**Important**: You need to add the public key to your Hostinger account:

1. Copy content of `deploy_key.pub`
2. Log in to Hostinger via SSH or use File Manager
3. Add the public key to `~/.ssh/authorized_keys`:
   ```bash
   # Via SSH
   cat deploy_key.pub >> ~/.ssh/authorized_keys
   chmod 600 ~/.ssh/authorized_keys
   ```
   Or use **File Manager** in hPanel to edit `.ssh/authorized_keys`

4. Add private key (`deploy_key`) to GitHub Secrets:
   - Go to GitHub **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `HOSTINGER_SSH_KEY`
   - Value: Copy entire content of `deploy_key` file (including headers)
   - Click **Add secret**

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

### 6. Alternative: Direct Git Push (Without GitHub Actions)

If you prefer to deploy manually without GitHub Actions:

```bash
# One-time setup: Add your SSH key to Hostinger's authorized_keys
# Then add Hostinger as a remote
git remote add hostinger ssh://u123456789@server.hostinger.com:65002/~/repository.git

# Deploy manually
cd /path/to/brahmapradipam
npm run build
cd dist
git init
git add -A
git commit -m "Deploy $(date)"
git push hostinger master:main --force
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
5. **Moniyour SSH key is in Hostinger's `~/.ssh/authorized_keys`
- Check `HOSTINGER_SSH_KEY` secret contains the correct private key (with headers)
- Ensure the Git URL is correct in `HOSTINGER_REPO_URL`
- Test SSH connection: `ssh -p 65002 u123456789@server.hostinger.com`
- Make sure SSH key has no passphrase (or use ssh-agent)

### Permission Denied (publickey)
- Your public key is not in Hostinger's authorized_keys
- Add it via SSH or File Manager: `cat your_key.pub >> ~/.ssh/authorized_keys`
- Ensure `.ssh` folder permissions: `chmod 700 ~/.ssh` and `chmod 600 ~/.ssh/authorized_keys`

### How to Add Public Key to Hostinger

Since Hostinger doesn't have an "Add SSH Key" button in Git settings:

1. **Via SSH** (if you have existing SSH access):
   ```bash
   ssh u123456789@server.hostinger.com -p 65002
   nano ~/.ssh/authorized_keys
   # Paste your public key on a new line
   # Save and exit (Ctrl+X, Y, Enter)
   ```

2. **Via File Manager**:
   - Go to hPanel → **Files** → **File Manager**
   - Navigate to home directory
   - Show hidden files (toggle . files)
   - Find or create `.ssh` folder
   - Edit `authorized_keys` file
   - Add your public key on a new line
   - Sav

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
