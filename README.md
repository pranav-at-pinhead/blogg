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


##My original Blog (without any modification of any LLM)
BloggIt

The platform name is Bloggit and as the name says its a blogging website. During the development of this website, we will get to understand how we can:

- Create a CI/CD pipeline
- How to Create a PR
- How to merge your code with the main branch
- Publish it to Netlify

So, for the initial version  of the website to get ready  I have used MagicPatterns. Then I will create a repo and after this I will push my code to the main branch, so that the initial version of my website will be safe. Now, with every new feature I will create a branch and then send a Pull Request to myself because I am working alone and then if there are no conflicts with the main branch, It will automatically merge.

So, after making an initial website I have pushed my code on Github and now i am working on test cases. I am writing test  cases for each and every component in my codebase to check whether each component is working as it has to be or not ? 

With every new changes which I am doing, I will create a new branch for it and then create a PR and if there are no conflicts then only I should merge the code. 

So, now I have made a contact page and after checking on my [localhost](http://localhost) browser, I got to know that it is working well. So, now I have to push it onto Github and for doing that I have to make a new branch called contact_us_page. Why we did that ? Of course I also had this same issue earlier but after studying things I got to know that with every new feature you add you have to push your changes to github by creating a new branch and then you have to push your code onto that branch and create a pull request. We do this to make sure that it should not affect the main branch of our code.

For doing this:

1. Check for the branches you have. For doing that you need to write git branch. It will show you all the branches you have in your project repo.
2. Create a new branch called contact_us_page and to do that you have to write git branch -c contact_us_page.
3. Now, you have to go to contact_us_page branch which we created earlier and you can go to this branch by git checkout contact_us_page command.
4. We have to push our new feature onto this branch. We will write git push and after doing that almost all of you will get a error so dont worry. We, will then write git push origin HEAD. It will push your changes onto that branch.
5. Now, go to Github and create a PR with the comments of what changes or new feature you have made.

I have followed this step for 2 features i.e one for Contact Page and another is for my test cases.

Now, I have to make CI/CD pipeline using Github Actions.  So, CI & CD pipeline are used for auto deployment. Basically, you dont have to build your codebase or manually set up every time your codebase for deployment. Using this pipeline, it will automatically do it for you. So,here we are using Netlify. Using Netlify with CI/CD pipeline is very easy, first you have to set up your netlify and connect your repo with your Netlify account and after doing that deploy your site. Your CI/CD pipeline will automatically configured and will start working. What does it mean ? It means that whenever you change anything in your main branch, Netlify will automatically detect it and will start a build command and test cases which you have configured and then if there are no issues it will automatically deploy your site. 

I have finally completed my website with a very good understanding of how to create PR’s, creating CI/CD pipelines and publishing the site on Netlify.
