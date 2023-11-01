# Welcome to Contribution Page!

There are different ways you can contribute, all of which are valuable. Here's a few guidelines that should help you as you prepare your contribution.

## Setup the Project

The following steps will get you up and running to contribute to lekkalu-frontend

1.  Fork the repo (click the Fork button at the top right of [this page](https://github.com/GVR-Secure-Solutions/lekkalu-frontend))
2.  Clone your fork locally
3.  Setup all the dependencies and packages by running `npm install`. This command will install dependencies.

## Branch naming conventions

1. Use issue tracker IDs in branch names
2. Add a short descriptor of the task
3. Use hyphens as separators

some examples :

>

     720-submodules-rc
     722-add-billing-module
     728-fix-homepage-css

## Commit Convention

Before you create a Pull Request, please check whether your commits comply with the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention `category(scope or module): message` in your commit message while using one of the following categories:

- `feat / feature`: all changes that introduce completely new code or new features
- `fix`: changes that fix a bug (ideally you will additionally reference an issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e. github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above categories

  e.g. `feat(components): add new prop to the avatar component`

for the above use `npx cz` can help. (optional)
if you are interested in the detailed specification you can visit [https://www.conventionalcommits.org/](https://www.conventionalcommits.org/)

## PR Submission

While raising the PR follow the below example:
**iusse-number : name of the issue**
description with the attachment should be there if require, it should be give a small idea what developer had done into the code change.

## Structure

```
		  src
		    ├── assets
		    ├── components (reusable)
		    ├── hooks
		    └── pages
		        ├── Expenses
		        │   ├── compoents
		        │   └── Expenses.tsx
		        └── Budget
		            ├── components
		            └── Budget.tsx
```
