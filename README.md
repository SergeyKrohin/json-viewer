# Run the app

I used the latest version of angular cli at the time - 7.3.9

  - 1 Run npm i
  - 2 Run ng serve

# Description 

 - A JSON editor/validator app. It has 3 sections for JSON source, JSON schema and Tree editor. Source and Tree sections are dynamically updated when the user inserts the data. After the validation button is pressed, the the app will dynamically check if the source is valid according to provided schema when the user enters the data.
- The main part of the app is the tree, it consists of 3 parts; Tree, TreeNode and TreeField. The tree uses angular's reactive forms to   implement the validation. When the tree is rendered, it dynamicly builds a form structure using nested FormGroups and FormControls.
  Then when the validation button is pressed, the tree will go through the provided schema, it will also hold a reference to a specific level in the form structure and dynamicly add Validators to the specific form controls where needed.
- I is a responsive app for web, tablet and mobile screen.
- Works in Chrome, IE 11 + and Firefox browsers

# App structure

  - Modules:
    - App - main module
    - Shared - imports and exports all the reusable components
    - JsonViewerModule - module that uses the shared module, angular's built-in modules and also declares it's child componens
    - Core - holds all the services in one place
  - Components
    -  App - main component
    -  JsonViewerComponent - holds and manages all 3 main sections of the app - Source, Schema and Tree
    -   SourceComponent - an input for the JSON source. It dynamically updates the tree fields when the text is inserted. It also has a format button.
    -  TreeComponent - a dynamic JSON editor. It receives the parsed JSON and renders it as an editable tree according to each fiedl's tyle. It also updates the JSON source section when the text or other data type is enntered or changed.
    - TreeNode - the node of the tree that can hide or expand itself. It loops over the given fields and uses the TreeField component to render the fields
   - TreeField - renders tree field according to the provided type: string, number, boolean, object or array. In case of an object or array the TreeNode will be used in the recursive way, to render the inner fields on the tree.
   - ToggleBoxComponent - a shared component used by TreeNode to hide or expand the TreeNode
 - Services
    -  UtilitiesService - a service that has static helper functions
- Styles - Each component has it's own styling file. App also uses some global styles in styles.scss an also has a shared _section-component.scss file to share the same stylings for the sections

# Points for improvement
  - Types - because of the lack of time, not all the app is covered with types.
  - Refactoring - some parts of the app, especially the setValidators method in tree component need refactoring or to be splitted in to smaller more readable parts
 -  Performance - I have implemented this app in a very dymic way, where all parts are instantly updated without much considiration on the performance. In a more realistic application much more consideration should be made, to prevent performance issues
 -  Bugs And Tests - There are probably some bugs that are not yet addressed and also the app should be covered with unit tests to insure for more stable code
