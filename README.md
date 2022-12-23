# Online SQL Editor

This is SQL editor built specifically for the frontend task of Atlan. This particular project is built using **[React](https://reactjs.org/)**, and the **[React Table](https://react-table-v7.tanstack.com/)**. It originally contains a data dump borrowed from [this](https://github.com/graphql-compose/graphql-compose-examples/tree/master/examples/northwind/data/csv) repository. The sections below detail the salient features of this project.

## Features

1. **Tab Based Interface**: An easy-to-use tab based interface allows the user to switch between multiple queries at once. Want to view a table _and_ run a query at the same time? Sure, go right ahead. Each tab maintains its own separate state, so as long as you don't reload the page, you can jump right back to where you left a tab.
2. **Dynamic Table Views**: The list of tables is fetched at first, but the actual data isn't. Only when you click on the name of a table, are the entries fetched. Keeping the application lightweight, and blazing fast.
3. **Defining Custom Types for Columns**: Each person is not the same; similarly, each column is not the same. You might want to specify certain processing functions: want to parse an image, or return an integer. You can do all this, and the table will display the processed result.
4. **Result Statistics**: The user will also be alerted about the time taken to complete a query, giving the user a measure to check the performance of the system.
5. **Ability to save the results as JSON, XML, or CSV**: This application includes functionality to save the results of a query in JSON, XML, and CSV formats. _**Pro Tip**: You can also save a query,so that you don't have to type the same thing twice!_

## Performance Audit

- **[GTmetrix](https://gtmetrix.com/)**: The fully loaded time is **1.4 seconds**, with the first contentful paint at **969 ms**. The site receives an A grade too.
- **[web.dev](https://web.dev/measure)**: The load time according to web.dev is **2.2 seconds**. The site also scores **96 points in performance** and **100 points in best practices**. The exact metrics are:
  - **First Contentful Paint**: `2.2s`
  - **Speed Index**: `2.2s`
  - **Largest Contentful Paint**: `2.2s`
  - **Time to Interactive**: `2.2s`
  - **Total Blocking Time**: `0ms`
  - **Cumulative Layout Shift**: `0`
- **Chrome DevTools**: The load time according to Chrome DevTools is **3.97 seconds**. I got this load time from the `load` event in the Network tab of the DevTools. Along the same lines, the `DOMContentLoaded` event fires after **3.60 seconds**.


## Optimisations
- The most time-saving optimisation would be **dynamic fetching**. The rows of a table are fetched only when the user requests it. Not a second before. This shaves a lot of seconds off our initial load time, by distributing that across requests.
- **Extensive use of the `useMemo`,`useCallBack`,`React.memo` hook**. The `useMemo`,`useCallBack`,`React.memo` hook reduces the number of re-computations by storing the results of computations with the same dependencies. The data of tables is entirely 'memoised'.
- **Intelligent use of the React-Table Package.** Used `React-Table` Package to handle Table Operation :
  - `react-table` is light Lightweight (5k - 14kb), Headless.
  - `react-table` is provide tree-shaking.
- **Keeping the number of state changes as low as possible**. While this has been accompanied by a slight reduction in the feature set, it has more than made up for it in the load time of a re-render.
- **Reduced the number of API calls**. I have reduced the number of API calls, by using the `useEffect` hook, which shaved off almost 2 seconds after each click.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!