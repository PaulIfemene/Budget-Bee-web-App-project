import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';  // Import useAuthState
import { auth } from '../../utils/firebase/firebase.js';  // Your Firebase auth instance
import Cards from '../../components/Cards/Cards';
import AddExpense from '../../components/Modals/AddExpense';
import AddIncome from '../../components/Modals/AddIncome';
import ChartComponent from '../../components/Charts/Charts';
import NoTransactions from '../../components/NoTransactions/NoTransactions';
import { useTransaction } from '../../useContext/TransactionsProvider.jsx';
import SetBudget from '../../components/Modals/AddBudget.jsx'; // Import the new modal

const Dashboard = () => {
  const [user] = useAuthState(auth);  // Get the authenticated user

  const {
    transactions,
    addTransaction,
    income,
    expense,
    totalBalance,
    loading,
    fetchBudget, // Fetch the budget from context
    addBudget,
  } = useTransaction();

  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [isBudgetModalVisible, setIsBudgetModalVisible] = useState(false);
  const [sortKey, setSortKey] = useState('');
  const [budget, setBudget] = useState(0); // State for the budget
  const showBudgetModel = () => {
    setIsBudgetModalVisible(true);
  };
  const showExpenseModel = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModel = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };
  const handleBudgetCancel = () => setIsBudgetModalVisible(false);
  const onSetBudget = (newBudget) => {
    setBudget(newBudget);
  };
  // Call fetchBudget when the component mounts or when the user changes
  useEffect(() => {
    if (user) {
      fetchBudget(); // Fetch the latest budget value from Firestore if user is authenticated
    }
  }, [user, fetchBudget]);

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date ? values.date.format('YYYY-MM-DD') : null,
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
      time: values.time ? values.time.format('hh:mm A') : null,
    };
    addTransaction(newTransaction);
  };

  const handleBudgetSubmit = async (newBudget) => {
    try {
      await addBudget(newBudget); // Save budget to Firestore
      setBudget(newBudget); //Set the new budget value
      setIsBudgetModalVisible(false); // Close the modal
    } catch (error) {
      console.error('Error adding budget:', error);
    }
  };
  

  let sortedTransactions = transactions.sort((a, b) => {
    if (sortKey === 'date') {
      return new Date(a.date) - new Date(b.date);
    }
  });

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Cards
            income={income}
            expense={expense}
            totalBalance={totalBalance}
            showExpenseModel={showExpenseModel}
            showIncomeModel={showIncomeModel}
            showBudgetModal={showBudgetModel}   
            budget={budget}        />
          {transactions.length ? (
            <ChartComponent sortedTransactions={sortedTransactions} />
          ) : (
            <NoTransactions />
          )}
          <AddIncome
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />

          <AddExpense
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />

        <SetBudget
            isBudgetModalVisible={isBudgetModalVisible}
            handleBudgetCancel={handleBudgetCancel}
            onSetBudget={handleBudgetSubmit}
          />
        </div>

        
      )}
    </div>
  );
};

export default Dashboard;
