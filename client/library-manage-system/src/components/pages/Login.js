import React from 'react';

import { Image, Form, Button, Card, Input, notification, Layout } from 'antd';

import '../../App.css';
import Logo from '../../picture/logo.png';
import axios from '../config/axios';
import localStorageService from '../services/localStorageService';

export default function Login(props) {
	const formLayout = {
		labelCol: { offset: 2 },
		wrapperCol: { offset: 2, span: 20 },
		requiredMark: false,
		layout: 'vertical',
	};

	const librarianOnFinish = values => {
		const body = {
			username: values.username,
			password: values.password,
		};

		axios
			.post('/login/librarian', body)
			.then(result => {
				localStorageService.setToken(result.data.token);
				notification.success({ message: result.data.message });
				props.setRole('librarian');
			})
			.catch(err => {
				notification.error({
					message: `รหัสผ่านหรือชื่อผู้ใช้ไม่ถูกต้อง`,
				});
			});
	};

	const { Header, Content } = Layout;

	return (
		<>
			<Layout>
				<Header
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '170px',
					}}
				>
					<Image src={Logo} style={{ width: '100%' }} />
				</Header>
				<Content
					className="content"
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '500px',
					}}
				>
					<Card
						title="Librarian Login"
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
							onFinish={librarianOnFinish}
							initialValues={{ remember: true }}
						>
							<Form.Item
								label="ชื่อผู้ใช้"
								name="username"
								rules={[
									{ required: true, message: 'กรุณากรอกชื่อผู้ใช้ของคุณ!' },
								]}
							>
								<Input placeholder="John Doe" allowClear maxLength={50} />
							</Form.Item>

							<Form.Item
								label="รหัสผ่าน"
								name="password"
								rules={[
									{ required: true, message: 'กรุณากรอกรหัสผ่านของคุณ!' },
								]}
							>
								<Input.Password
									placeholder="12345678"
									allowClear
									maxLength={100}
								/>
							</Form.Item>

							<Form.Item>
								<Button
									htmlType="submit"
									size="large"
									style={{
										color: '#405EFF',
										width: '50%',
										borderRadius: '1rem',
									}}
								>
									ยืนยัน
								</Button>
							</Form.Item>
						</Form>
					</Card>
				</Content>
			</Layout>
		</>
	);
}
