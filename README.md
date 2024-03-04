# SweeftTask

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.1.

## Prerequisites

Before you can run this project, you must have the following installed:

- [Node.js](https://nodejs.org/) (which includes npm)
- [Angular CLI](https://angular.io/cli): After installing Node.js, install the Angular CLI globally by running `npm install -g @angular/cli` in your terminal.
- [JSON Server](https://www.npmjs.com/package/json-server): For setting up a full fake REST API, install JSON Server globally by running `npm install -g json-server`.

## Installation

1. **Clone the Repository**: First, clone this repository to your local machine using:

2. **Navigate to the Project Directory**: Change into the project directory:

3. **Install Dependencies**: Install the project dependencies:

### Including Angular Material and FontAwesome Icons

This project uses Angular Material for UI components and FontAwesome for icons. They are included as dependencies in the project, so they will be installed automatically when you run `npm install`. However, to manually add or update them:

- **Angular Material**: Add Angular Material to the project:
- **FontAwesome Icons**: Add FontAwesome icons:

## Development Server

Run the following command to start the development server:
Navigate to `http://localhost:4200/` to view the application. The app will automatically reload if you change any of the source files.

## Code Scaffolding

Run the following command to generate a new component:
You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

To build the project, run:
The build artifacts will be stored in the `dist/` directory.

## Running Unit Tests

Execute the following command to run the unit tests via [Karma](https://karma-runner.github.io):

## Running End-to-End Tests

Execute the following command to run the end-to-end tests via a platform of your choice. To use this command, you first need to add a package that implements end-to-end testing capabilities:

## Setting Up JSON Server for Fake REST API

JSON Server provides a quick and easy way to create a full fake REST API with minimal setup. It's perfect for mocking APIs during development. Follow these steps to install JSON Server and run it with your project.

### Installation

1. **Install JSON Server Globally**: Run the following command to install JSON Server globally on your machine. This allows you to use it with any project.

   ```bash
   npm install -g json-server
   ```

### Running JSON Server

2. **Create a db.json File**: JSON Server uses a simple JSON file to hold your data. Create a `db.json` file in your project's root directory with some initial data. For example:

   ```json
   {
     "recipes": [
       {
         "id": 1,
         "title": "Chocolate Cake",
         "description": "Delicious chocolate cake...",
         "ingredients": ["Flour", "Sugar", "Cocoa Powder"]
       }
     ]
   }
   ```

3. **Start JSON Server**: Run JSON Server and point it to your `db.json` file. Replace `<path-to-db.json>` with the actual path to your `db.json` file. By default, JSON Server will run on port 3000.

   ```bash
   json-server --watch <path-to-db.json>
   ```

   If your `db.json` file is in the project root, and you're in the root directory, the command simplifies to:

   ```bash
   json-server --watch db.json
   ```

4. **Access Your API**: Navigate to `http://localhost:3000/recipes` in your browser. You should see the data from your `db.json` file.

### Integrating JSON Server with Angular

To use the data from JSON Server in your Angular application, you'll need to adjust your service calls to match the URL structure provided by JSON Server. For example, to fetch recipes, you might use an Angular service method like this:

```typescript
getRecipes(): Observable<Recipe[]> {
  return this.http.get<Recipe[]>('http://localhost:3000/recipes');
}
This section provides a clear guide for setting up JSON Server as part of the `SweeftTask` project, including how to install it, how to create a `db.json` file with initial data, how to start the server, and how to access the API. Additionally, it briefly explains how to integrate JSON Server data with an Angular application.

```
