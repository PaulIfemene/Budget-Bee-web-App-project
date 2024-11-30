import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const SetBudget = ({ isBudgetModalVisible, handleBudgetCancel, onSetBudget }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // Ensure the budget is a valid float number before setting it
    const newBudget = parseFloat(values.budget);
    
    
    
    // Check if the value is valid (not NaN)
    if (!isNaN(newBudget)) {
      onSetBudget(newBudget);  // Pass the new budget to the parent component
      form.resetFields();      // Reset the form fields
      handleBudgetCancel();    // Close the modal
    } else {
      // Optionally handle invalid input here
      console.log("Invalid budget value");
    }
  };

  return (
    <Modal
      title="Set Budget"
      open={isBudgetModalVisible}
      onCancel={handleBudgetCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Budget Amount"
          name="budget"
          rules={[
            {
              required: true,
              message: 'Please input your budget!',
            },
          ]}
        >
          <Input type="number" className="custom-input" />
        </Form.Item>
        <Form.Item>
          <Button className="btn btn-blue" type="primary" htmlType="submit">
            Set Budget
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SetBudget;
