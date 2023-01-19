# POC
  
## Prerequisites <sub><sup>(Note: do not use Yarn for this project)</sup></sub>  
  
- node, v19.4+  
- yarn, v1.22+  

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

### Prerequistes

Create a .env file with the following content:

```
EXTEND_ESLINT=true
REACT_APP_CONFIG_API_URL=http://localhost:8888
REACT_APP_ROOM_API_URL=http://localhost:8083
```

### Installing

Open your terminal, go to te project folder and install de packages running the following command

```
yarn install
```

Now start the development server using

```
yarn start
```

When everything is up and running in:

```
http://localhost:5173/
```

### Testing

To run all the project test run the following command

```
yarn test
```

### PRODUCTION

To generate a production ready version, we'll need to execute the following commands

```
yarn build
```

## Code standards and workflow

**JavaScript and TypeScript rules for the project**
 - Use arrow functions instead of the function declaration
 - Import each entity individually, avoid dot-notation. Bad `React.useEffect`, good `useEffect`
 - Non-sharable types and interfaces must be declared at the top of the file
 - Complete typing is required for all functionality
 - Avoid using weak types
 - Each added functionality should contain unit testing
 - Use React functional components, no Class Components
	```
	// example of the React component
	import { FC } from 'react';  
  
	interface HeaderProps {  
	  headerText: string;  
	}  
	  
	export const Header: FC<HeaderProps> = (props) => {  
	  const { headerText } = props;  
	  return <header className="App-header">{headerText}</header>;  
	};
	```

**Code style**
The developer needs to install `eslint` for IDE and activate it. ESlint package path is `/node_modules/eslint` with configuration file at `.eslintrc`. The suggestion is to run eslint --fix on safe in your IDE.

**Git**.
*Branch types*
 - `main`- is the branch containing the latest stable code for service. Merges into  the  "main" branch are being done by a mantainer, only from a release branch, if the release branch has been approved by the mantainer
 - `develop` - contains the latest merged changes in the development process. The code should be merged into develop only after an approved merge request, and all unit tests and integration tests are running successfully
 
 *When coding*
 - `feature/<TASK_ID>-short-description` - branch for feature development (`feature/198099-add-api-endpoint`) 
 - `bugfix/<TASK_ID>-short-description` - branch for bug fixes development discovered after deployemnt (`bugfix/198100-adjust-button`) 

*Merge requests*
 - If a merge request is not finished and shouldn't be merged mark as [WIP] / WIP/ wip (Work In Progress)
 - Common rules 2 approvals if possible
 - Reject merge if there are unresolved comments
 - Drop approvals after new commits

*Linking tickets*
When developing a new user interface, the frontend team should collaborate with the backend team and link tickets for the same feature - this will make discoveries of blocked development work quicker.
 

### Libs/tools used  
  
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://facebook.github.io/react/)
- [React Testing Library](https://testing-library.com/)
- [Jest](http://facebook.github.io/jest/)
- [ESLint](http://eslint.org/)
- [Prettier](https://prettier.io/)
  
## License  
  
To be defined.
 
