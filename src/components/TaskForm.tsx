import React, { useState } from "react";
import { Form, Input, Select, Cascader, DatePicker, Button, message } from "antd";

interface Task {
  key: string;
  task: string;
  category: string;
  priority: string;
  date: string;
}

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [componentSize, setComponentSize] = useState<'middle' | 'small' | 'large'>('middle'); // Changed 'default' to 'middle'

  const onFormLayoutChange = ({ size }: { size: 'middle' | 'small' | 'large' }) => {
    setComponentSize(size);
  };

  const onFinish = (values: any) => {
    const { task, category, priority, date } = values;
    const formattedDate = date.format('YYYY-MM-DD');
    
    const newTask: Task = { 
      key: Date.now().toString(),
      task, 
      category, 
      priority, 
      date: formattedDate 
    };
    
    onAddTask(newTask);
    message.success('Task added successfully!');
  };

  return (
    <Form
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{ maxWidth: 1200, margin: 0 }}
      onFinish={onFinish}
    >
      <Form.Item label="Task" name="task" rules={[{ required: true, message: 'Please input your task!' }]}>
        <Input style={{ textAlign: 'center' }} />
      </Form.Item>
      <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select a category!' }]}>
        <Select>
          <Select.Option value="Category 01">Category 01</Select.Option>
          <Select.Option value="Category 02">Category 02</Select.Option>
          <Select.Option value="Category 03">Category 03</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Priority Level" name="priority" rules={[{ required: true, message: 'Please select a priority!' }]}>
        <Cascader
          options={[
            {
              value: 'High',
              label: <span style={{ color: 'red' }}>High</span>,
            },
            {
              value: 'Normal',
              label: <span style={{ color: 'green' }}>Normal</span>,
            },
            {
              value: 'Low',
              label: <span style={{ color: 'blue' }}>Low</span>,
            },
          ]}
        />
      </Form.Item>
      <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please select a date!' }]}>
        <DatePicker />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
