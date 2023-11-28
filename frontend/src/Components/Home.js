import React, { Fragment, useState, useEffect } from 'react';

import MetaData from './Layout/MetaData';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import Product from './Product/Product';
import Loader from './Layout/Loader';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useParams } from 'react-router-dom';

const ImageComponent = () => {
  return (
    <div>
      <h1>Image Example</h1>
      <img
        src="https://ucarecdn.com/0931fce3-54a7-4426-9d42-213d8d819d51/-/format/auto/-/preview/3000x3000/-/quality/lighter/flavors%20banner2.jpg" // Replace this URL with the URL of your image
        alt="Description of the image"
        style={{ width: '300px', height: '200px' }} // Set the desired width and height
      />
    </div>
  );
};

const categories = ['classic', 'BBQ', 'CHEESE', 'SPICY CHEESE', 'SOUR CREAM', 'SPICY', 'SALT & VINEGAR'];

const Home = () => {
  let { keyword } = useParams();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const [productsCount, setProductsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  // const [resPerPage, setResPerPage] = useState(0);
  const [filteredProductsCount, setFilteredProductsCount] = useState(0);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState('');

  const createSliderWithTooltip = Slider.createSliderWithTooltip;
  const Range = createSliderWithTooltip(Slider.Range);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const getProducts = async (page = 1, keyword = '', price, category = '') => {
    let link = '';

    link = `${process.env.REACT_APP_API}/api/v1/products/?page=${page}&price[lte]=${price[1]}&price[gte]=${price[0]}`;

    if (category) {
      link = `${process.env.REACT_APP_API}/api/v1/products?page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`;
    }

    console.log(link);
    let res = await axios.get(link);
    console.log(res);
    setProducts(res.data.products);
    // setResPerPage(res.data.resPerPage);
    setProductsCount(res.data.productsCount);
    setFilteredProductsCount(res.data.filteredProductsCount);
    setLoading(false);
  };

  useEffect(() => {
    getProducts(currentPage, keyword, price, category);
  }, [currentPage, keyword, price, category]);

  let count = productsCount;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={'Buy Best Products Online'} />
          <div className="container container-fluid">
            <h1 id="products_heading">Latest Products</h1>
            <section id="products" className="container mt-5">
              <div className="row">
                <div className="col-6 col-md-3 mt-5 mb-5">
                  <div className="px-5">
                    <Range
                      marks={{
                        1: `$1`,
                        1000: `$1000`,
                      }}
                      min={1}
                      max={1000}
                      defaultValue={[1, 1000]}
                      tipFormatter={(value) => `$${value}`}
                      tipProps={{
                        placement: 'top',
                        visible: true,
                      }}
                      value={price}
                      onChange={(price) => setPrice(price)}
                    />
                    <hr className="my-5" />
                    <div className="mt-5">
                      <h4 className="mb-3">Categories</h4>
                      <ul className="pl-0">
                        {categories.map((category) => (
                          <li
                            style={{
                              cursor: 'pointer',
                              listStyleType: 'none',
                            }}
                            key={category}
                            onClick={() => setCategory(category)}
                          >
                            {category}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-md-9 overflow-auto">
                  <div className="row">
                    {products.map((product) => (
                      <Product key={product._id} product={product} col={4} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
            {/* {resPerPage <= count && (
              <div className="d-flex justify-content-center mt-5">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText={'Next'}
                  prevPageText={'Prev'}
                  firstPageText={'First'}
                  lastPageText={'Last'}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
            )} */}
          </div>
        </Fragment>
      )}
    </>
  );
};

export default Home;