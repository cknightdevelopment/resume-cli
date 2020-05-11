# Resume CLI

https://resumecli.com

| Build Status (Travis CI) | Code Coverage Status (Coveralls) |
|--------------------|----------------------|
| [![Build Status](https://travis-ci.org/cknightdevelopment/resume-cli.svg?branch=master)](https://travis-ci.org/cknightdevelopment/resume-cli) | [![Coverage Status](https://coveralls.io/repos/github/cknightdevelopment/resume-cli/badge.svg?branch=master)](https://coveralls.io/github/cknightdevelopment/resume-cli?branch=master) |

## Table of Contents

* [Overview](#overview)
* [Configuring Your Resume CLI](#configuring)
* [JSON Schema](#schema)
* [License](#license)

## <a id="overview"></a> Overview

Technology professionals need to have a resume that stands out among the crowd. Resume CLI can be one step toward that goal by providing an online command line interface (CLI) version of your resume, which employers and hiring managers can use to learn more about you. In addition to your traditional resume you supply to companies, Resume CLI is a fun and interactive way for you to stand out among the other applicants. Users can run the following commands to learn more about you:

- `contact` - Find ways to contact you
- `education` - Learn about your education
- `help` - View documentation for using the Resume CLI (not customizable)
- `issue` - Log a GitHub issue for the Resume CLI (not customizable)
- `links` - View links to some of your external profiles & resources
- `random` - Learn some random facts about you
- `skills` - View your skill levels across a number of languages, frameworks, etc.
- `workhistory` - View your work history

## <a id="configuring"></a> Configuring Your Resume CLI

Configuring your Resume CLI is easy! To have your own personal Resume CLI instance all you need to do is set the `resumeDataUrl` query string parameter to a [JSON resource that adheres to our schema](#schema):

`https://resumecli.com?resumeDataUrl={{url_to_my_resume_json}}`

That's it! Here is a working example: 

https://www.resumecli.com?resumeDataUrl=https://www.resumecli.com/assets/example.json

## <a id="schema"></a> JSON Schema

The easiest way to construct your JSON data is to download our [sample file](https://github.com/cknightdevelopment/resume-cli/blob/master/src/assets/example.json) and update it with your own information. If you need more granular detail on the JSON schema you can download our [JSON schema file](https://github.com/cknightdevelopment/resume-cli/blob/master/resume-data-schema.json).

Pretty much all of the JSON properties should be self-explainable, but here are a few helpful tips:

- The default name of the CLI is `resume` and a command is executed like this: `resume command_name`. However, you can update the name of the CLI via the `options.cliName` property in your JSON data to whatever you want. So, if you set `options.cliName` to be `"jerry"`, then commands would be execute like this: `jerry command_name`
- The `options.initHelp` property controls when a user viewing your resume will automatically see the output of the `help` command on load. This `help` output shows the user information about the available commands, the arguments they take, and the syntax of how to run commands. The availble options for the `options.initHelp` property are below:
  - `"always"` - (default) Help will be shown **every time** the user loads the page
  - `"never"` - Help will **never be shown** to the user when they load the page (they can of course run the `help` command explicity to see help though)
  - `"first"` - Help will be shown **only the first time** that a user visits your resume (tracked via `localStorage`)
- The icon used for an item in the `links` array is controlled by the array item's `iconClass` property. This can be a string of class name(s) separated by a space. [Font Awesome](https://fontawesome.com/) (non-Pro version) is pre-loaded into the Resume CLI and all of it's icons are available for you to use. For example, if you wanted to use the [smiley face icon](https://fontawesome.com/icons/smile?style=regular) for a link you would set its `iconClass` property to  `"far fa-smile"`
- If you don't want to have certain information on your resume (for example, education), just exclude that property from your JSON data. This will auto-update the built in `help` command to not list `education` as an available command.

## <a id="license"></a> License

We use the standard [MIT License](https://github.com/cknightdevelopment/ng-form-rules/blob/master/LICENSE)
