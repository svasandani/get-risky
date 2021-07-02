Contributing
========
Thanks for contributing to this repository! Before making any changes, please open a Github issue so that maintainers can take a look. Feel free to start writing code, but keep in mind that we may require changes to the implementation and/or scope of your feature/fix.

We also have a code of conduct. Please abide by it when contributing or representing this project and community.

Making changes
--------
We use the standard fork and pull request workflow, with some minor variations:

1. Fork the repository
2. Pull the latest updates from upstream (reach out if you're unsure!) 
3. Make a branch based on an existing issue, or open a new one (see [Branches](#branches) for _suggestions_ on how to name your branch)
4. Make changes in your branch
5. Test your changes locally before pushing to your fork!
6. Make a PR to the correct branch (either `staging` or `main`)
7. Repeat from Step 2

### Branches

Currently, we have two main branches: `main` and `staging`. Other branches appear from time to time, usually with semantic prefixes:

| Prefix | Merge into | Use for |
|-----|-----|-----|
| `feature/` | `staging` | adding new functionality |
| `fix/` | `staging` | fixing all bugs on staging **AND** non-critical bugs on production |
| `hotfix/` | `main` | fixing critical bugs on production |

Branches should be merged by maintainers whenever they are deemed ready (passing tests, etc.), and should be deleted immediately after.

Ideally, `staging` will be merged into `main` on Mondays, to avoid unexpected bugs festering over the weekend.

### Deployment

While we are not currently actively deploying the project, we plan to eventually (hence the need for a `staging` branch). If you want to contribute to the CI/CD of this project, make an issue or reach out directly to a maintainer.

### Troubleshooting

Go is pretty good at complaining. You should be able to debug syntax errors by looking at the trace.

If there are any database errors, make sure you've [followed these steps](README.md#running-it-locally), including [migrating your database](README.md#migration).

If tests are failing, consider using the `-v` flag and printing `t.Log` everywhere; that usually seems to help.

Code of Conduct
--------
### Our Pledge
In the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to make participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards
Examples of behavior that contributes to creating a positive environment include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

- The use of sexualized language or imagery and unwelcome sexual attention or advances
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others’ private information, such as a physical or electronic address, without explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

### Our Responsibilities
Project maintainers are responsible for clarifying the standards of acceptable behavior and are expected to take appropriate and fair corrective action in response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct, or to ban temporarily or permanently any contributor for other behaviors that they deem inappropriate, threatening, offensive, or harmful.

### Scope
This Code of Conduct applies within all project spaces, and it also applies when an individual is representing the project or its community in public spaces. Examples of representing a project or community include using an official project e-mail address, posting via an official social media account, or acting as an appointed representative at an online or offline event. Representation of a project may be further defined and clarified by project maintainers.

### Enforcement
Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team at [INSERT EMAIL ADDRESS]. All complaints will be reviewed and investigated and will result in a response that is deemed necessary and appropriate to the circumstances. The project team is obligated to maintain confidentiality with regard to the reporter of an incident. Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good faith may face temporary or permanent repercussions as determined by other members of the project’s leadership.

### Attribution
This Code of Conduct is adapted from the [Contributor Covenant, version 1.4](https://www.contributor-covenant.org/version/1/4/code-of-conduct.html).