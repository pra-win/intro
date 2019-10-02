const path = "/api/testApi/";
export const environment = {
  production: true,
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
    deleteCategory: path+'deleteCategory.php'
  }
};
