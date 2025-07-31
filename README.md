# 📝 BloggIt

**BloggIt** is a modern, component-driven blogging platform built using the latest frontend technologies. It allows users to create, read, and explore blogs in an interactive and clean interface. This project serves as a full-stack playground to understand real-world software engineering practices, including CI/CD, testing, branching strategies, and automated deployments.

---

## 🚀 Tech Stack

- **Framework**: Vite + React + TypeScript  
- **Styling**: Shadcn 
- **Testing**: Vitest   
- **Deployment**: Netlify  
- **CI/CD**: GitHub Actions  


## 💻 Local Development Setup

```bash
git clone https://github.com/your-username/bloggit.git
cd bloggit
npm install
npm run dev


## To run tests: npm run test 

## 🔀 Branching Strategy & Workflow
As a solo developer, I follow a feature-branch workflow for consistency and discipline.

Steps to Add a New Feature (e.g., Contact Page)

1. Check existing branches: git branch

2. Create a new branch: git branch contact_us_page:
     git branch -c contact_us_page

3. Switch to the new branch: git checkout contact_us_page

4. Commit & push changes: git add . git commit -m "Add contact page" git push origin contact_us_page


## 🔄 CI/CD Pipeline with GitHub Actions + Netlify
CI/CD (Continuous Integration and Continuous Deployment) is set up using GitHub Actions and Netlify.

How it Works:
Whenever a change is pushed to the main branch:

GitHub Actions triggers a workflow to lint, test, and build the project

Netlify detects the change and triggers a deployment

If all checks pass, the site is automatically deployed

##Netlify Setup:
Go to Netlify

Connect your GitHub repo

Set build command to npm run build and output directory to dist (or out)

Add environment variables if needed

Netlify will listen for changes in main and auto-deploy


##📄 BloggIt Development Journey
The platform name is BloggIt and as the name suggests, it's a blogging website. During the development of this project, I've practiced and understood:

How to create and configure a CI/CD pipeline

How to create and manage Pull Requests

How to merge branches safely

How to automatically deploy using Netlify and GitHub Actions

Initial Setup
Started with a Vite + Tailwind template from MagicPatterns

Pushed the initial version to GitHub on the main branch

Every new feature is developed on a separate branch and merged through a PR

Example: Contact Page
Created contact_us_page branch

Tested it locally on localhost

Pushed the branch

Created a PR and merged it after review

I’ve followed this same process for all new features including the test cases.

Made with ❤️ by Pranav Vatsa