# Run the app

I used the latest version of angular cli at the time - 7.3.9

  - 1 Run npm i
  - 2 Run ng serve

# Description 

 - A JSON editor/validator app. It has 3 sections for JSON source, JSON schema and tree editor. All the sections are dynamically updated when the user inserts the data. After the validation button is pressed, the the app will dynamically check if the source is valid when the user unters the data.
- I is a responsive app for web, tablet and mobile screen.
- Works and looks good in Chrome, IE 11 + and Firefox browsers

# App structure

  - Modules:
    - App - main module
    - Shared - imports and exports all the reusable components
    - JsonViewerModule - module that uses the shared module and also some angular's built in modules and also imports it's child componens
    - Core - holds all the services in one place
  - Components
    -  App - main component
    -  JsonViewerComponent - holds and manages all 3 main sections of the app - Source, Schema and Tree
    -   SourceComponent - an input for the JSON source. It dynamically updates the tree fields when the text is inserted. It also has format button.
    -  TreeComponent - a dynamic JSON editor. It receivet the parsed JSON and displays it's fields by type. It also updates the JSON source section when the text or other data type in inserted.
    - TreeNode - the node of the tree that can hide or expand itself. It loops over the given fields and uses the TreeField component to render the fields
   - TreeField - renders tree field according to the provided type: string, number, boolean, object, array. In case on an object or array the TreeNode will be used in the recursive way, to render the inner fields on the tree.
   - ToggleBoxComponent - a shared component used by TreeNode to hide or expand the TreeNode
 - Services
    -  UtilitiesService - a service that holds static helper functions
- Styles - app has a shared _section-component.scss file to share the same stylings for the sections

# Points for improvement
  - Types - because of the lack of time, not all the app is covered with types.
  - Refactoring - some parts of the app, especially the setValidators method in tree component need refactoring or to be splited in to smaller more readable parts
 -  Performance - I have implemented this app in a very dymic way, where all parts are instantly updated without much considiration on the performance. In a more realistic application much more consideration should be made, to prevent performance issues
