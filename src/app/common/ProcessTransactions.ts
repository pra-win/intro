export class ProcessTransactions {
    transactions = [];
    filterObj = {
        category: [],
        keywords: [],
        description: ""
    }

    constructor() {}

    processString (str: String) {
        str = str.trim().toLowerCase();
        return str;
    }

    filterTransactions(obj:any, data: any) {
        let filterData = data;
        if(obj.category.length) {
            filterData = this.categoryFilter(obj.category, filterData);
        }
        
        if(obj.keywords.length) {
            filterData = this.keyWordsFilter(obj.keywords, filterData);
        }

        return filterData;     
    }

    categoryFilter(categorys:any, data: any) {
        let filterData = [];
        data.forEach((o: any) => {
            categorys = categorys.map((str: String) => this.processString(str));
            let oCat = o.cname.trim().toLowerCase();

            if(categorys.includes(oCat)) {
                filterData.push(o);
            }
        });
        return filterData;
    }

    keyWordsFilter(fKeywords:any, data: any) {
        let filterData = [];
        let objectIds = [];

        data.forEach((o: any) => {
            let oKeyWordsArr = o.keyWords ? o.keyWords.split(',') : [];
            oKeyWordsArr = oKeyWordsArr.map((str: String) => this.processString(str));
            fKeywords = fKeywords.map((str: String) => this.processString(str));

            fKeywords.forEach((keyword: any) => {
                if(oKeyWordsArr.includes(keyword)) {
                    if(!objectIds.includes(o.id)) {
                        filterData.push(o);
                        objectIds.push(o.id);
                    }
                }
            });            
        });
        return filterData;
    }

    sortTransactionsDateWise(data: any) {
        let sortData = Object.assign(data);

        sortData.sort((a: any, b: any) => {
            const aDate = new Date(a.tranDate).getTime();
            const bDate = new Date(b.tranDate).getTime();
            return bDate - aDate;
          });
          
        return sortData;
    }

    hideShowFutureTransaction(isShowFutureTransaction: boolean, data: any) {   
        let newTransactionsData = Object.assign([], data);
    
        if(!isShowFutureTransaction) {
          newTransactionsData = newTransactionsData.filter((data) => {
            let futureTransaction = Number(data.futureTransaction);
            return !futureTransaction;
          });
        }
        return newTransactionsData;
    }

    setIncomeExpence(transactionsData: any) {
        let expense = [];
        let income = [];
        let incomeTotal = 0;
        let expenseTotal = 0;
        transactionsData.forEach((t: any)=>{
          if(t.ctype === 'e') {
            expense.push(t);
            expenseTotal+= parseInt(t.amt);
          } else {
            income.push(t);
            incomeTotal+=parseInt(t.amt);
          }
        });

        return ({expense, income, incomeTotal, expenseTotal});
    }
}
