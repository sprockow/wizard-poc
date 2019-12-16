# Application tour

This application provides a proof of concept on how a database launching  wizard could be built. 

- The wizard should demonstrate that the wizard can be started and abandoned. 
- You can navigate back and forward in the wizard
- Once the database launch process is started, the wizard is complete, and you should not be abel to re-edit, or re-launch the database via the wizard
- The launch process will happen in the background, and you should be able to start another database creation wizard during this time.

A few things to be aware of:

- The browser does not persist any information. Each hard refresh will remove all previously created dummy databases.
- The proof of concept is probably not bullet proof, and if you try hard enough, I imagine you will be able to find bugs. You can always refresh if this happpens, and start the demo from scratch.
- The demo doesn't provide any actions that allow you to interact with launched/operational databases (ie can't edit or tear-down)

## Library choices

For this assignment I decided to use a few of the libraries/tools that I've used within past client engagements and personal projects. These choices have helped me get prototypes and proof of concepts up quickly before, and I believe they also have a lot of potential in larger scale projects.

### Create-React-App starter kit

This is an invaluable tool for getting started. I've certainly hit limits with this boilerplate, but its quite easy to extend its wepback and babel configurations. 

### Informed

Form libraries suffer from a common infliction of trying to provide too much UI out of the box. This ultimately causes problems where developers have to write lots configuration or workaround code to meet their own unique UI requirements. Informed is a great library that provides powerful form state management, but allows you to bring in your own UI libraries or custom code (for example, all of my form fields use Material UI. Take a look at the `common` folder to see examples on how I integrated material with informed)

### Redux & Redux-Starter-Kit

Redux has been my go-to choice for app-level state management. I love the tooling and community support for the library.

I've recently started to use redux-starter-kit as a way of reducing the boilerplate necessary to quickly write new reducer/action functionality. It might not be the right choice for all projects, but it certainly is a great choice for prototypes.

One opinionated is redux-starter-kit's use of proxy objects via Immer. It allows you to get around redux's requirement of immutable state by writing code that looks like it mutates objects. I'm generally not a fan of abstractions that obscure complexities via "magic", but one huge benefit to using immer is that it can track changes, and thus allow you to easily introduce rollback/reset functionality.

### Redux Saga

This is probably one of the most powerful libraries I've used. It was built as a middlware library for redux in order to extend it asynchronous capabilities, but I believe it represents an entirely new (*new for javascript, it is an old idea, and one that the Go language is natively includes) paradigm on how to tame complex asynchronous logical flows. 

This library was key in allowing us to launch a stable chat messaging app for Amazon, and is a library that I will always recommend for all but the simplest web apps.

https://redux-saga.js.org/

### Material UI and JSS

I've only recently started to play with Material, but I like its sensible defaults for touch-friendly UI (large clickable targets). It has a (mostly) configurable theme that can be extended to match most brands.

### Reach Router

Before adopting React as my main framework of choice, I developed applications using Ember. This framework's main strength was its route-first approach to building applications. The main contributor to Reach-Router was coincidentally also an Ember developer, and has brought this route-frist appreciation to the React ecosystem. 

What do I mean by route-first? Ensuring that your application tracks page navigations properly, and allows your user to go 'back', go 'forward' without incurring unintended side-effects and buggy behavior. 

This is the library on which I built my wizard logic. Building a wizard requires a few key pieces of information to be shared among the sub-components:

- Every step needs to know the url path to the next and previous steps (if they exist). This way each step can automatically forward the user onto the next step, or at least present buttons to the user (ie 'go back', or 'skip')

- Every step must have a url path, which will allow for the browser to jump back to that step of the wizard when needed. This could happen via either a native 'back/forward' navigation, or via a hard refresh.

- The root wizard component must be able to automatically redirect to the first step of wizard after initialization.

- Each step must be able to either bail out of the wizard entirely, or redirect the user to a previous step, if the current state is incomplete or invalid. For example, if a user launches a database via the wizard, and then hits back, we shouldn't allow them to go through the wizard again.

The wizard.js component accomplishes this by introspecting its given children and building an array of 'steps'. It then rewrites the children output and passes down the step information along with some navigation utility functions.

The pattern is very extensible, and is an example of a "headless" component (doesn't render any of its own UI). You could easily create a Wizard component that could be reused throughout an application.

