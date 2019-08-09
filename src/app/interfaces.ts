export interface CategoriesObj {
  message: string,
  success: boolean,
  response: [
    {cname: string, type:string}
  ]
}

export interface TransactionObj {
  message: string,
  success: boolean,
  response: [
    {
        id: number,
        cname: string,
        ctype: string,
        tranDesc: string,
        tranDate: string,
        amt: number
    }
  ]
}
