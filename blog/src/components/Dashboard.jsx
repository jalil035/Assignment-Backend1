import React, {useEffect, useState} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {ErrorToast, IsEmpty} from "../helper/helper";
import {createProduct, deleteProduct, fileUpload, getAllProduct} from "../apirequest/api";


const Dashboard = () => {
    let baseURL = "http://localhost:5020/upload-file/";
    const [file, setFile] = useState(null);
    const [product, setProduct] = useState([]);
    let [data, setData] = useState({
        "productName":"","productPrize":"","productDes":"","img":""});

    let fileUploadFun = async (e) => {
        e.preventDefault();
        if (!file) {
            ErrorToast("Please select a file");
            return ;
        }
        const formData = new FormData();
        formData.append("file", file);
        const result = await fileUpload(formData);
            setData({...data, img: result.data.file[0].filename});
    };
        let submitData = async () => {
            if (IsEmpty(data.productName)) {
                ErrorToast("Product Name is required.");
            } else if (IsEmpty(data.productPrize)) {
                ErrorToast("Product Price is required.");
            } else if (IsEmpty(data.productDes)) {
                ErrorToast("Product Des is required.");
            } else if (IsEmpty(data.img)) {
                ErrorToast("Product Image is required.");
            } else {
                let result = await createProduct(data);

                // allApiRequest call
                //   let result = await allApiRequest("POST", "/login", data);
                //   if (result.status === true) {
                //     SuccessToast(result.msg);
                //     return true;
                //   } else {
                //     ErrorToast(result.msg);
                //     return false;
                //   }
                // }
                console.log(result);
            }

        };


// get All Product
    useEffect(() => {
        (async () => {
            let result = await getAllProduct();
            setProduct(result);
        })();
    }, []);

//delet product
    let deleteProductFun = async (id) => {
        let result = await deleteProduct(id);
        if (result) {
            let result = await getAllProduct();
            setProduct(result);
        }
    };



    return (
    <>
           {/*nvbar*/}

        <nav className="bg-amber-500 h-[5rem] flex justify-center items-center">
            <h2 className="text-white font-semibold text-[3rem]">Welcome to our dashboard</h2>
        </nav>
        <br />
          <div className="container mx-auto px-[4rem] bg-blue-100">
              <Tabs>
                  <TabList>
                      <Tab>Add Product</Tab>
                      <Tab>All Product</Tab>
                  </TabList>

                  {/*Add products*/}
                  <TabPanel>
                      <h2>Add new Product</h2>

                           {/*From Uiverse.io by alexruix */}
                          <div className=" py-[6.3rem]">
                              <div className="grid grid-cols-12 gap-[1.8rem]">
                                  <div className="col-span-4">
                                      <label className="text-[1.1rem] font-bold">Product name:</label>
                                      <div className="relative">
                                          <input
                                              onChange={(e) => setData({...data, productName: e.target.value})}
                                              className="w-full rounded-lg border border-gray-700 p-4 pe-12 text-sm shadow-sm "

                                              type="text"
                                          />
                                      </div>
                                  </div>
                                  <div className="col-span-4">
                                      <label className="text-[1.1rem] font-bold">Product Prize:</label>
                                      <div className="relative">
                                          <input
                                              onChange={(e) => setData({...data, productPrize: e.target.value})}
                                              className="w-full rounded-lg border border-gray-700 p-4 pe-12 text-sm shadow-sm "

                                              type="text"
                                          />
                                      </div>
                                  </div>
                                  <div className="col-span-4">
                                      <label className="text-[1.1rem] font-bold">Product description:</label>
                                      <div className="relative">
                                          <input
                                              onChange={(e) => setData({...data, productDes: e.target.value})}
                                              className="w-full rounded-lg border border-gray-700 p-4 pe-12 text-sm shadow-sm "
                                          />
                                      </div>
                                  </div>
                                  <div className="col-span-4">
                                      <label className="text-[1.1rem] font-bold">Product img:</label>
                                      <form onSubmit={fileUploadFun}>
                                          <div className='relative'>
                                              <input
                                                  onChange={(e) => setFile(e.target.files[0])}
                                                  type='file'
                                              />
                                              <button className="bg-gray-950 p-[.5rem] rounded-lg font-bold text-sky-400" type='submit'>Upload</button>
                                          </div>
                                      </form>
                                  </div>

                              </div>
                              <div className="flex items-center justify-between mt-3">
                                  <button
                                      onClick={submitData}
                                      className="inline-block font-bold rounded-lg bg-amber-700 px-5 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                      type="submit"
                                  >
                                      Add Product
                                  </button>

                              </div>
                          </div>

                  </TabPanel>

                  {/*All Product*/}
                  <TabPanel>
                      <>
                          {/* component */}
                          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  <thead
                                      className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                  <tr className={"bg-blue-400 text-white"}>
                                      <th scope='col' className='px-16 py-3'>
                                          <span className='sr-only'>Product image</span>
                                      </th>

                                      <th scope="col" className="px-16 py-3">
                                          <span className="sr-only">Product name</span>
                                      </th>
                                      <th scope="col" className="px-6 py-3">
                                          Product prize
                                      </th>
                                      <th scope="col" className="px-6 py-3">
                                          Product description
                                      </th>
                                      <th scope="col" className="px-6 py-3">
                                          Action
                                      </th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  {
                                      product?.map((item, index) => (
                                          <tr key={index}
                                              className="bg-blue-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                              <td className='p-4'>
                                                  <img
                                                      src={baseURL + item?.img}
                                                      alt=''
                                                      className='w-[80px] h-[80px] object-cover'
                                                  />
                                              </td>
                                              <td className="p-4">
                                                  {item?.productName}
                                              </td>
                                              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                  {item?.productPrize}
                                              </td>
                                              <td className="px-6 py-4">
                                                  {item?.productDes}
                                              </td>
                                              <td className='px-6 py-4'>
                                                  <span
                                                      onClick={() => deleteProductFun(item._id)}
                                                      className='font-medium text-red-600 dark:text-red-500 hover:underline'
                                                  >
                                                      Action
                                                  </span>
                                              </td>
                                          </tr>
                                      ))
                                  }
                                  </tbody>
                              </table>
                          </div>
                      </>
                  </TabPanel>
              </Tabs>
          </div>

    </>
    );
};

export default Dashboard;
