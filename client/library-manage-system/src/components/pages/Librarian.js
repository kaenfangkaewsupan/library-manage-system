import React from 'react';

import {
	Image,
	Form,
	Button,
	Divider,
	Row,
	Col,
	Input,
	notification,
	Menu,
	Tooltip,
	Card,
} from 'antd';
import {
	HomeOutlined,
	BookOutlined,
	UserOutlined,
	LogoutOutlined,
} from '@ant-design/icons';

import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

import '../../App.css';
import localStorageService from '../services/localStorageService';
import Logo from '../../picture/logo.png';
import axios from '../config/axios';

export default function Librarian(props) {
	const logout = () => {
		localStorageService.removeToken();
		props.setRole('guest');
	};

	const menuData = [
		{
			title: 'Home page',
			key: 'home',
			icon: <HomeOutlined />,
			path: '/librarian',
			onClick: null,
		},
		{
			title: 'Student Data',
			key: 'student',
			icon: <UserOutlined />,
			path: '/librarian/student-data',
			onClick: null,
		},
		{
			title: 'Book Data',
			key: 'book',
			icon: <BookOutlined />,
			path: '/librarian/book-data',
			onClick: null,
		},
		{
			title: 'Logout',
			key: 'logout',
			icon: <LogoutOutlined />,
			path: '/login',
			onClick: logout,
		},
	];

	const formLayout = {
		labelCol: { offset: 2 },
		wrapperCol: { offset: 2, span: 20 },
		requiredMark: false,
		layout: 'vertical',
		style: {
			marginTop: '10px',
		},
	};

	const addOnFinish = values => {
		const { bookName, bookType } = values;

		const body = {
			bookId: uuidv4(),
			bookName: bookName,
			bookType: bookType,
		};

		axios
			.post('/librarian/add-book', body)
			.then(result => {
				notification.success({ message: result.data.message });
			})
			.catch(err => {
				notification.error({ message: 'หนังสือเล่มนี้มีอยู่ในฐานข้อมูลแล้ว' });
			});
	};

	const borrowOnFinish = values => {
		const { studentId, bookId } = values;
		const date = format(new Date(), 'yyyy-MM-dd');

		const body = {
			bookId,
			studentId: studentId,
			date: date,
		};

		axios
			.post('/librarian/borrow-book', body)
			.then(result => {
				notification.success({ message: result.data.message });
			})
			.catch(err => {
				notification.error({ message: err.message });
			});
	};

	const returnOnFinish = values => {
		const { bookId } = values;

		const body = {
			bookId,
		};

		axios
			.post('/librarian/return-book', body)
			.then(result => {
				notification.success({ message: result.data.message });
			})
			.catch(err => {
				notification.error({ message: err.message });
			});
	};

	return (
		<>
			<Row align="middle" justify="space-between">
				<Image src={Logo} alt="logo" width={200} />
				<Col>
					<Menu mode="horizontal">
						{menuData.map(data => (
							<Tooltip title={data.title}>
								<Link to={data.path}>
									<Menu.Item
										key={data.key}
										icon={data.icon}
										onClick={data.onClick}
									>
										{data.title}
									</Menu.Item>
								</Link>
							</Tooltip>
						))}
					</Menu>
				</Col>
			</Row>
			<Divider />
			<Row justify="space-around">
				<Col>
					<Card
						title="Add Book"
						style={{
							width: 450,
							textAlign: 'center',
							borderRadius: '1.25rem',
							overflow: 'hidden',
						}}
						hoverable
						headStyle={{
							backgroundColor: '#92A3FF',
							color: '#FFFFFF',
							fontSize: '1.375rem',
						}}
					>
						<Form
							{...formLayout}
							onFinish={addOnFinish}
							initialValues={{ remember: true }}
						>
							<Form.Item
								label="ชื่อหนังสือ"
								name="bookName"
								rules={[{ required: true, message: 'กรุณากรอกชื่อหนังสือ!' }]}
							>
								<Input placeholder="Harry Potter" allowClear maxLength={100} />
							</Form.Item>

							<Form.Item
								label="ประเภทหนังสือ"
								name="bookType"
								rules={[{ required: true, message: 'กรุณากรอกประเภทหนังสือ' }]}
							>
								<Input placeholder="novel" allowClear maxLength={50} />
							</Form.Item>

							<Form.Item style={{ justifyContent: 'center' }}>
								<Button
									htmlType="submit"
									size="large"
									style={{
										color: '#006066',
										width: '50%',
										borderRadius: '1rem',
									}}
								>
									ยืนยัน
								</Button>
							</Form.Item>
						</Form>
					</Card>
				</Col>
				<Col>
					<Card
						title="Borrow Book"
						style={{
							width: 450,
							textAlign: 'center',
							borderRadius: '1.25rem',
							overflow: 'hidden',
						}}
						hoverable
						headStyle={{
							backgroundColor: '#FFE76B',
							color: '#FFFFFF',
							fontSize: '1.375rem',
						}}
					>
						<Form
							{...formLayout}
							onFinish={borrowOnFinish}
							initialValues={{ remember: true }}
						>
							<Form.Item
								label="รหัสหนังสือ"
								name="bookId"
								rules={[{ required: true, message: 'กรุณากรอกรหัสหนังสือ' }]}
							>
								<Input placeholder="h8f7fs0nd-14" allowClear maxLength={100} />
							</Form.Item>

							<Form.Item
								label="รหัสประจำตัวนักเรียน"
								name="studentId"
								rules={[
									{
										required: true,
										message: 'กรุณากรอกรหัสประจำตัวนักเรียน',
									},
								]}
							>
								<Input placeholder="51555" allowClear maxLength={10} />
							</Form.Item>

							<Form.Item style={{ justifyContent: 'center' }}>
								<Button
									htmlType="submit"
									size="large"
									style={{
										color: '#CDAC00',
										width: '50%',
										borderRadius: '1rem',
									}}
								>
									ยืนยัน
								</Button>
							</Form.Item>
						</Form>
					</Card>
				</Col>
				<Col>
					<Card
						title="Return Book"
						style={{
							width: 450,
							textAlign: 'center',
							borderRadius: '1.25rem',
							overflow: 'hidden',
						}}
						hoverable
						headStyle={{
							backgroundColor: '#A3FF77',
							color: '#FFFFFF',
							fontSize: '1.375rem',
						}}
					>
						<Form
							{...formLayout}
							onFinish={returnOnFinish}
							initialValues={{ remember: true }}
						>
							<Form.Item
								label="รหัสหนังสือ"
								name="bookId"
								rules={[{ required: true, message: 'กรุณากรอกรหัสหนังสือ' }]}
							>
								<Input placeholder="h8f7fs0nd-14" allowClear maxLength={100} />
							</Form.Item>

							<Form.Item style={{ justifyContent: 'center' }}>
								<Button
									htmlType="submit"
									size="large"
									style={{
										color: '#36A800',
										width: '50%',
										borderRadius: '1rem',
									}}
								>
									ยืนยัน
								</Button>
							</Form.Item>
						</Form>
					</Card>
				</Col>
			</Row>
		</>
	);
}
