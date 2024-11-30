import React, { createContext, useContext, useState, useEffect } from 'react';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase/firebase';
import { db } from '../utils/firebase/firebase';
import { toast } from 'react-toastify';

const TransactionsContext = createContext();
export const useTransaction = () => useContext(TransactionsContext);

const TransactionsProvider = ({ children }) => {
  const [user] = useAuthState(auth);
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(0); // Add budget state
  const [customTags, setCustomTags] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //get all docs from firebase collection
    fetchTransaction();
  }, [user]);
  useEffect(() => {
    fetchTransaction();
    fetchBudget(); // Fetch budget on initialization
  }, [user]);

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

    // Function to add a budget to Firestore
    const addBudget = async (newBudget) => {
      if (!user) {
        toast.error('User not authenticated');
        return;
      }
      try {
        const budgetDoc = { budget: newBudget, timestamp: new Date() };
        await addDoc(collection(db, `users/${user.uid}/budgets`), budgetDoc);
        setBudget(newBudget); // Update local state
        toast.success('Budget saved successfully!');
      } catch (error) {
        console.error('Error saving budget:', error);
        toast.error('Failed to save budget.');
      }
    };
  
    // Function to fetch the most recent budget from Firestore
    const fetchBudget = async () => {
      if (!user) return;
  
      try {
        // Query Firestore for the budget
        const q = query(collection(db, `users/${user.uid}/budgets`));
        const querySnapshot = await getDocs(q);
  
        let latestBudget = 0;
  
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.budget) {
            latestBudget = data.budget;
          }
        });

        
  
        setBudget(latestBudget); // Set the fetched budget value
      } catch (error) {
        console.error('Error fetching budget:', error);
      }
    };
  

  async function addTransaction(transaction, many) {
    try {
      const userDocRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      if (!many) {
        toast.success('Transaction Added!');
      }
      let newTransactionArr = transactions;
      newTransactionArr.push(transaction);
      setTransactions(newTransactionArr);
      calculateBalance();
      console.log('added', userDocRef);
    } catch (e) {
      console.log(e);
      toast.error(e);
      if (!many) {
        toast.error("Couldn't add transaction");
      }
    }
  }

  async function addTag(customTag) {
    try {
      const userDocRef = await addDoc(
        collection(db, `users/${user.uid}/tags`),
        customTag
      );
      //appending customTag created in customTags state
      setCustomTags([...customTags, customTag]);
    } catch (e) {
      toast.error(e);
    }
  }
  const fetchCustomTag = async () => {
    if (user) {
      const q = query(collection(db, `users/${user.id}/tags`));
      const querySnapshot = await getDocs(q);
      let tagArray = [];
      querySnapshot.forEach((doc) => {
        tagArray.push(doc.data());
      });
      setCustomTags(tagArray);
    }
  };

  const fetchTransaction = async () => {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
    }
    setLoading(false);
  };

  const calculateBalance = () => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === 'income') {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
      }
    });

    setIncome(totalIncome);
    setExpense(totalExpense);
    setTotalBalance(totalIncome - totalExpense);
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        addTransaction,
        fetchTransaction,
        budget,
        addBudget, // Expose addBudget to components
        fetchBudget, // Expose fetchBudget
        fetchCustomTag,
        customTags,
        addTag,
        income,
        expense,
        totalBalance,
        loading,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsProvider;
