import React, { useState } from "react";
import { Button, Form, Input, Modal, Select, Space, Table } from "antd";
import type { TableProps } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { deleteTask, updateTask } from "../redux/features/taskSlice";

interface DataType {
  key: string;
  task: string;
  category: string;
  priority: string;
  date: string;
}

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch: AppDispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState<DataType | null>(null);
  const [form] = Form.useForm();

  const editTask = (task: DataType) => {
    setIsEditing(true);
    setEditingTask(task);
    form.setFieldsValue({
      task: task.task,
      category: task.category,
      priority: task.priority,
    });
  };

  const saveEdit = () => {
    form.validateFields().then((values) => {
      if (editingTask) {
        const updatedTask = { ...editingTask, ...values };
        dispatch(updateTask(updatedTask));
      }
      setIsEditing(false);
      setEditingTask(null);
    });
  };

  const deleteTaskById = (key: string) => {
    dispatch(deleteTask(key));
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (text: string) => (
        <span
          style={{
            color: text == "High" ? "red" : text == "Normal" ? "green" : "blue",
          }}
        >
          {text}
        </span>
      ),
      filters: [
        { text: <span style={{ color: "red" }}>High</span>, value: "High" },
        {
          text: <span style={{ color: "green" }}>Normal</span>,
          value: "Normal",
        },
        { text: <span style={{ color: "blue" }}>Low</span>, value: "Low" },
      ],
      onFilter: (value, record) => record.priority.includes(value as string),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record: DataType) => (
        <Space size="middle">
          <Button onClick={() => editTask(record)}>
            <EditTwoTone />
          </Button>
          <Button danger>
            <DeleteTwoTone
              twoToneColor="red"
              onClick={() => deleteTaskById(record.key)}
            />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={tasks} rowKey="key" />
      <Modal
        title="Edit Task"
        open={isEditing}
        onCancel={() => setIsEditing(false)}
        onOk={saveEdit}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Task"
            name="task"
            rules={[{ required: true, message: "Please input the task!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select>
              <Select.Option value="Category 01">Category 01</Select.Option>
              <Select.Option value="Category 02">Category 02</Select.Option>
              <Select.Option value="Category 03">Category 03</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Priority"
            name="priority"
            rules={[{ required: true, message: "Please select a priority!" }]}
          >
            <Select>
              <Select.Option value="High">
                <span style={{ color: "red" }}>High</span>
              </Select.Option>
              <Select.Option value="Normal">
                <span style={{ color: "green" }}>Normal</span>
              </Select.Option>
              <Select.Option value="Low">
                <span style={{ color: "blue" }}>Low</span>
              </Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TaskList;
