import React, { useState, useEffect } from 'react';

import {
	Image,
	List,
	Typography,
	Divider,
	Row,
	Col,
	Input,
	Table,
	Menu,
	Tooltip,
} from 'antd';
import { HomeOutlined, BookOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import Logo from '../../picture/logo.png';
import axios from '../config/axios';

export default function LibrarianBookData() {
	const [data, setData] = useState(null);
	const [isSearchData, setSearchData] = useState(null);

	useEffect(async () => {
		await axios.get('/librarian/book-data').then(result => {
			if (!isSearchData) setData(result.data.bookData);
			else setData(isSearchData);
		});
	}, [isSearchData]);

	const onSearch = e => {
		const body = {
			bookName: e.target.value,
		};

		axios.post('/librarian/search/book-data', body).then(result => {
			setSearchData(result.data.bookData);
		});
	};

	const columns = [
		{
			title: 'รหัสหนังสือ',
			dataIndex: 'id',
		},
		{
			title: 'ชื่อหนังสือ',
			dataIndex: 'name',
		},
		{
			title: 'ประเภทหนังสือ',
			dataIndex: 'typeOfBook',
		},
		{
			title: 'สถานะ',
			dataIndex: 'status',
		},
	];

	const menuData = [
		{
			title: 'Home page',
			key: 'home',
			icon: <HomeOutlined />,
			path: '/librarian',
		},
		{
			title: 'Student Data',
			key: 'student',
			icon: <UserOutlined />,
			path: '/librarian/student-data',
		},
		{
			title: 'Book Data',
			key: 'book',
			icon: <BookOutlined />,
			path: '/librarian/book-data',
		},
	];

	return (
		<>
			<Row justify="space-between" align="middle">
				<Col xs={4} md={3} xl={3}>
					<Row justify="center">
						<Image src={Logo} alt="logo" width={150} />
					</Row>
				</Col>
				<Col xs={12} md={11} xl={12}>
					<Input
						onPressEnter={onSearch}
						enterButton
						allowClear
						maxLength={100}
						placeholder="ใส่ชื่อหนังสือเพื่อค้นหาข้อมูลหนังสือ Ex.Naruto (หากใส่ไม่ครบระบบจะค้นหาข้อมูลที่ใกล้เคียง)"
					/>
				</Col>
				<Col>
					<Menu mode="horizontal">
						{menuData.map(data => (
							<Tooltip title={data.title}>
								<Link to={data.path}>
									<Menu.Item key={data.key} icon={data.icon}>
										{data.title}
									</Menu.Item>
								</Link>
							</Tooltip>
						))}
					</Menu>
				</Col>
			</Row>
			<Divider />
			<Table dataSource={data} columns={columns} />;
		</>
	);
}
