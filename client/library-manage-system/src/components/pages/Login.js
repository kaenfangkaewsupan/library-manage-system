import React, { useState } from 'react';

import {
	Image,
	Form,
	Button,
	Card,
	Input,
	Table,
	notification,
	Row,
	Col,
} from 'antd';

import '../../App.css';
import Logo from '../../picture/logo.png';
import axios from '../config/axios';
import localStorageService from '../services/localStorageService';

export default function Login(props) {
	const [data, setData] = useState(null);

	const onSearch = e => {
		const body = {
			studentId: e.target.value,
		};

		axios.post('/login/get/student-data', body).then(result => {
			setData(result.data.studentData);
		});
	};

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

	const columns = [
		{
			title: 'รหัสนักเรียน',
			dataIndex: 'student_id',
		},
		{
			title: 'ชื่อหนังสือ',
			dataIndex: 'book_id',
		},
		{
			title: 'วันที่ยืม',
			dataIndex: 'borrowedDate',
		},
	];

	const responsiveLayout = {
		xs: 22,
		md: 18,
		xl: 9,
	};

	return (
		<>
			<Row justify="center" style={{ backgroundColor: '#001529' }}>
				<Image src={Logo} width={300} />
			</Row>
			<Row justify="space-around" style={{ marginTop: '1.875rem' }}>
				<Col {...responsiveLayout}>
					<Card
						title="Librarian Login"
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
								<Input placeholder="John Doe" allowClear maxLength={100} />
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
				</Col>
				<Col {...responsiveLayout}>
					<Input
						onPressEnter={onSearch}
						allowClear
						maxLength={10}
						placeholder="ใส่รหัสประจำตัวนักเรียนเพื่อค้นหาข้อมูลนักเรียน Ex.51506 (หากใส่ไม่ครบระบบจะค้นหาข้อมูลที่ใกล้เคียง)"
					/>
					<Table dataSource={data} columns={columns} />
				</Col>
			</Row>
		</>
	);
}
