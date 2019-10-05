// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const path = "/api/testApi/";

export const environment = {
  production: false,
  apiURLs : {
    getCategories: path+'categories.php',
    addCategory: path+'addCategory.php',
    logout: path+'logout.php',
    auth: path+'auth.php',
    getTransactions: path+'transactions.php',
    addTransactions: path+'addTransactions.php',
    fileUpladTest: path+'uploadtest.php',
    fileUpload: path+"fileUpload.php",
    editCategory: path+'editCategory.php',
    deleteCategory: path+'deleteCategory.php',
    editTransactions: path+'editTransactions.php',
    deleteTransactions: path+'deleteTransaction.php'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
