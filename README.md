__*GfK Front End Code Challenge*__

__*Scenario*__

You have been recently hired as a senior developer on a startup that is trying to build a web application using GitHub's search API. There are concerns over the quality of the existing codebase; moreover, your architect has decided that the application should use [GitHub's GraphQL API](https://developer.github.com/v4/) instead of its REST API in future.

*Please submit your solution once you deem it production ready.*

__*App refactor process*__

App has been refactor in order to retreive data from github's Graphql API as requested

Your first ticket is as follows: 

__User Story__

*As a:* User 

*I want:* to be able to search GitHub by user name and display a list of matches.

*So that:* I can find my friends.

__User Story result__

The app has been built with a feature "search" which allow users to type the name of the user to search for


__User Story__

*As a:* User 

*I want:* to see a user's avatar.

*So that:* I can recognise my friends.

__User Story result__

Search results render each element as a profile card with its avatar included

__User Story__

*As a:* User 

*I want:* to see information about a user's activity.

*So that:* I can understand their commit history.

__User Story result__

Once the github user is identify as the subject it is presented with a button: "Show Activity" which request the last 10 repositories and display their names and available branches associated to them, so commits can be listed by branch selected





