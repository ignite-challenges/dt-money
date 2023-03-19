import { useEffect, useState } from 'react';
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./SearchForm";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";

interface Transaction {
  category: string; 
  createdAt: string;
  description: string; 
  id: number; 
  price: number;
  type: 'income' | 'outocome';
}

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  
  async function loadTransactions() {
    const response = await fetch("http://localhost:3000/transactions")
    const data = await response.json()
    setTransactions(data)
  }

  useEffect(() => {
    loadTransactions()
  }, []);

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map(transaction => {
             return ( 
                <tr>
                  <td width={'50%'}>{transaction.description}</td>
                  <td>
                    <PriceHighlight variant="income">
                      {transaction.price}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{transaction.createdAt}</td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
};