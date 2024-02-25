import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Select } from 'antd';
import apiController from '../api/apiController';

const ProductList = () => {
  
  const [products, setProducts] = useState([]);
  const [pagination] = useState({ current: 1, pageSize: 10 });
  const [filterField, setFilterField] = useState('product');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    getIds()
  }, [pagination])

  const getIds = async () => {
    const data = await apiController.getIds(0,100)
    if (data) {
      getProducts(data.result)
    }
  }

  const getProducts = async (ids) => {
    const data = await apiController.getItems(ids)
    if (data) {
      const uniqueArray = data.result.filter((obj, index, self) =>
        index === self.findIndex((e) => (
          e.id === obj.id
        ))
      );
      setProducts(uniqueArray)
    }
  }

  const setFilter = async () => {
    const data = await apiController.filter(filterField,filterValue)
    if(data){
      getProducts(data.result)
    }
  }

  const handleFilterFieldChange = (value) => {
    setFilterField(value);
  };

  const handleFilterValueChange = (e) => {
    let value = e.target.value;
    if (filterField === 'price') {
      value = parseFloat(value)
    }
    setFilterValue(value);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Название',
      dataIndex: 'product',
      key: 'product',
      sorter: (a, b) => a.product.localeCompare(b.product),
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Бренд',
      dataIndex: 'brand',
      key: 'brand',
      sorter: (a, b) => {
        if (a.brand === null) {
          return 1;
        } else if (b.brand === null) {
          return -1;
        } else {
          return a.brand.localeCompare(b.brand);
        }
      },
    },
  ];

  return (
    <div>
      <div className='table_filter'>
        <Select value={filterField} onChange={handleFilterFieldChange}>
          <Select.Option value="product">Название</Select.Option>
          <Select.Option value="price">Цена</Select.Option>
          <Select.Option value="brand">Бренд</Select.Option>
        </Select>
        <Input value={filterValue} onChange={handleFilterValueChange} />
        <Button onClick={setFilter}>Применить фильтр</Button>
        <Button onClick={getIds}>Сбросить фильтр</Button>
      </div>
      <Table dataSource={products} columns={columns} />
    </div>
  );
};

export default ProductList;
