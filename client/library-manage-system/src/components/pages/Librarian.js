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

	const addStudentOnFinish = values => {
		const { studentId, firstName, lastName } = values;

		const body = {
			studentId,
			firstName,
			lastName,
		};

		axios
			.post('/librarian/add/student-data', body)
			.then(result => {
				notification.success({ message: result.data.message });
			})
			.catch(err => {
				notification.error({ message: 'นักเรียนคนนี้มีอยู่ในฐานข้อมูลแล้ว' });
			});
	};

	const deleteStudentOnFinish = values => {
		const { studentId } = values;

		axios
			.delete(`/librarian/delete/student-data/${studentId}`)
			.then(result => {
				notification.success({
					message: 'นักเรียนคนนี้ถูกลบออกจากฐานข้อมูลแล้ว',
				});
			})
			.catch(err => {
				notification.error({ message: 'นักเรียนคนนี้ไม่ได้อยู่ในฐานข้อมูล' });
			});
	};

	const addBookOnFinish = values => {
		const { bookName, bookType } = values;

		const body = {
			bookId: uuidv4(),
			bookName,
			bookType,
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

	const borrowBookOnFinish = values => {
		const { studentId, bookId } = values;
		const date = format(new Date(), 'yyyy-MM-dd');

		const body = {
			bookId,
			studentId,
			date,
		};

		axios
			.post('/librarian/borrow-book', body)
			.then(result => {
				notification.success({ message: result.data.message });
			})
			.catch(err => {
				notification.error({
					message: 'หนังสือเล่มนี้ถูกยืมอยู่หรือข้อมูลที่กรอกมาไม่ถูกต้อง',
				});
			});
	};

	const returnBookOnFinish = values => {
		const { bookId } = values;

		axios
			.put(`/librarian/return-book/${bookId}`)
			.then(result => {
				notification.success({ message: result.data.message });
			})
			.catch(err => {
				notification.error({
					message: 'หนังสือเล่มนี้ไม่ได้ถูกยืมอยู่หรือรหัสหนังสือไม่ถูกต้อง',
				});
			});
	};

	const deleteBookOnFinish = values => {
		const { bookId } = values;

		axios
			.delete(`/librarian/delete-book/${bookId}`)
			.then(result => {
				notification.success({
					message: 'หนังสือเล่มนี้ถูกลบออกจากฐานข้อมูลแล้ว',
				});
			})
			.catch(err => {
				notification.error({ message: 'หนังสือเล่มนี้ไม่ได้อยู่ในฐานข้อมูล' });
			});
	};

	const responsiveCardLayout = {
		xs: 20,
		md: 16,
		xl: 7,
	};

	return (
		<>
			<Row align="middle" justify="space-between">
				<Col xs={24} xl={3}>
					<Row justify="center">
						<Image src={Logo} alt="logo" />
					</Row>
				</Col>
				<Col xs={24} xl={9}>
					<Row justify="center">
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
					</Row>
				</Col>
			</Row>
			<Divider />
			<Row justify="space-around">
				<Col {...responsiveCardLayout}>
					<Card
						title="Add Book"
						style={{
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
							onFinish={addBookOnFinish}
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
				<Col {...responsiveCardLayout}>
					<Card
						title="Borrow Book"
						style={{
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
							onFinish={borrowBookOnFinish}
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
				<Col {...responsiveCardLayout}>
					<Card
						title="Return Book"
						style={{
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
							onFinish={returnBookOnFinish}
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
				<Col {...responsiveCardLayout}>
					<Card
						title="Delete Book"
						style={{
							textAlign: 'center',
							borderRadius: '1.25rem',
							overflow: 'hidden',
						}}
						hoverable
						headStyle={{
							backgroundColor: '#926BFF',
							color: '#FFFFFF',
							fontSize: '1.375rem',
						}}
					>
						<Form
							{...formLayout}
							onFinish={deleteBookOnFinish}
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
										color: '#581EFF',
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
				<Col {...responsiveCardLayout}>
					<Card
						title="Add Student"
						style={{
							textAlign: 'center',
							borderRadius: '1.25rem',
							overflow: 'hidden',
						}}
						hoverable
						headStyle={{
							backgroundColor: '#CA4348',
							color: '#FFFFFF',
							fontSize: '1.375rem',
						}}
					>
						<Form
							{...formLayout}
							onFinish={addStudentOnFinish}
							initialValues={{ remember: true }}
						>
							<Form.Item
								label="รหัสประจำตัวนักเรียน"
								name="studentId"
								rules={[
									{ required: true, message: 'กรุณากรอกรหัสประจำตัวนักเรียน' },
								]}
							>
								<Input placeholder="51555" allowClear maxLength={10} />
							</Form.Item>

							<Form.Item
								label="ชื่อ"
								name="firstName"
								rules={[
									{
										required: true,
										message: 'กรุณากรอกชื่อ',
									},
								]}
							>
								<Input placeholder="แก่นฝาง" allowClear maxLength={50} />
							</Form.Item>

							<Form.Item
								label="นามสกุล"
								name="lastName"
								rules={[
									{
										required: true,
										message: 'กรุณากรอกนามสกุล',
									},
								]}
							>
								<Input placeholder="แก้วสุพรรณ" allowClear maxLength={50} />
							</Form.Item>

							<Form.Item style={{ justifyContent: 'center' }}>
								<Button
									htmlType="submit"
									size="large"
									style={{
										color: '#E61E25',
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
				<Col {...responsiveCardLayout}>
					<Card
						title="Delete Student"
						style={{
							textAlign: 'center',
							borderRadius: '1.25rem',
							overflow: 'hidden',
						}}
						hoverable
						headStyle={{
							backgroundColor: '#FF77E9',
							color: '#FFFFFF',
							fontSize: '1.375rem',
						}}
					>
						<Form
							{...formLayout}
							onFinish={deleteStudentOnFinish}
							initialValues={{ remember: true }}
						>
							<Form.Item
								label="รหัสนักเรียน"
								name="studentId"
								rules={[{ required: true, message: 'กรุณากรอกรหัสนักเรียน' }]}
							>
								<Input placeholder="51506" allowClear maxLength={10} />
							</Form.Item>

							<Form.Item style={{ justifyContent: 'center' }}>
								<Button
									htmlType="submit"
									size="large"
									style={{
										color: '#EC06C7',
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
