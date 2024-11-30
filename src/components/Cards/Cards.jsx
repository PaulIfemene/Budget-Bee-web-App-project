import React from 'react';
import { Row, Card } from 'antd';
import './Cards.css';
import Button from '../Button/Button';

const Cards = ({
  income,
  expense,
  totalBalance,
  budget,
  fetchBudget,
  showExpenseModel,
  showIncomeModel,
  showBudgetModal,
  loading, // Add loading prop to check if budget is still being fetched
}) => {
  
  
  return (
    
    <div>
      <Row className="card-row">
        <Card className="dashboard-card">
          <h2>Current Balance</h2>
          <p>Ugx {parseFloat(totalBalance).toFixed(2)}</p>
        </Card>
        <Card className="dashboard-card">
          <h2>Total Income</h2>
          <p>Ugx {parseFloat(income).toFixed(2)}</p>
          <Button blue={true} onClick={showIncomeModel}>
            Add Income
          </Button>
        </Card>
        <Card className="dashboard-card">
          <h2>Total Expense</h2>
          <p>Ugx {parseFloat(expense).toFixed(2)}</p>
          <Button blue={true} onClick={showExpenseModel}>
            Add Expense
          </Button>
        </Card>
        <Card className="dashboard-card">
          <h2>Budget</h2>
          <p
            style={{
              color: expense > budget ? 'red' : 'green',
            }}
          >
            {loading ? (
              <span>Loading...</span>  // Show a loading message while fetching
            ) : (
              budget ? `Ugx ${parseFloat(budget).toFixed(2)}` : 'Set a Budget'
            )}
          </p>
          <Button blue={true} onClick={showBudgetModal}>
            Set Budget
          </Button>
        </Card>
      </Row>
    </div>
  );
};

export default Cards;
