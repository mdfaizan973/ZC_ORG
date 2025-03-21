import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import AdminNav from "./AdminNav";
// import TableIndid from "./Loding/TableIndid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import SuperDashBoard from "./SuperDashBoard";
import { baseUrl2 } from "../../config/confg";
import { fetchData } from "./AdminAnalytics";
export default function AdminDashBoard() {
  // const [data, setData] = useState([]);
  // const [page, setPage] = useState(1);
  // const [load, setLoad] = useState(false);

  // const admingetdata = (page) => {
  //   setLoad(true);
  //   axios
  //     .get(`${baseUrl}/orgproducts?_limit=10&_page=${page}`)
  //     .then((res) => {
  //       // console.log(res.data);
  //       setLoad(false);
  //       setData(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // useEffect(() => {
  //   admingetdata(page);
  // }, [page]);

  // const handlepre = () => {
  //   setPage(page - 1);
  // };
  // const handlenext = () => {
  //   setPage(page + 1);
  // };

  // ------------------New API's--------------------------
  const [products, setProducts] = useState([]);
  const [singleData, setSingleData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddProducts = async (url, data, isEdit) => {
    await postData(url, data, isEdit ? "PUT" : "POST");
    loadProducts();
  };

  const handleEditProduts = (data) => {
    setSingleData(data);
  };

  const handleDaleteData = async (data) => {
    await deleteData(`${baseUrl2}/products/${data._id}`);
    loadProducts();
  };

  const loadProducts = async () => {
    const data = await fetchData(`${baseUrl2}/products`);
    if (data) {
      setProducts(data);
    }
  };

  return (
    <>
      <ToastContainer />

      <div>
        <AdminNav />

        {/* {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))} */}

        <div className="min-h-screen ">
          <div className="flex">
            {/* Main-Content */}
            <div className="flex-1 ">
              <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900  items-start">
                <aside className="w-full md:w-1/4 lg:w-1/5  bg-white shadow-lg dark:bg-gray-800">
                  {/* <SuperDashBoard show_descrition={false} /> */}
                  <Sidebar />
                </aside>

                {/* Right Section (Table) */}
                {/* {load ? ( */}
                {/* <TableIndid /> */}
                {/* ) : ( */}
                <main className="w-4/5  rounded p-4 ">
                  {/* Header */}
                  <header>
                    <div className=" flex flex-wrap justify-between align-center font-bold text-gray-500">
                      <div className="text-4xl"></div>
                      <ProductForm
                        handleAddProducts={handleAddProducts}
                        isOpen={isOpen}
                        openModal={openModal}
                        closeModal={closeModal}
                        dataForEdit={singleData}
                      />
                    </div>
                  </header>
                  <section className="items-center flex justify-center min-h-screen font-poppins">
                    {/* <div className="w-full max-w-6xl px-6 py-8 bg-white rounded-lg"> */}
                    <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
                      {/* Header */}
                      <div className="flex justify-between items-center px-6 pb-4 border-b border-gray-300">
                        <h2 className="text-2xl font-semibold text-gray-700">
                          List of Products (100)
                        </h2>
                        <div className="flex items-center border border-gray-400 rounded-md overflow-hidden">
                          <input
                            type="text"
                            className="px-4 py-2 w-64 text-gray-700 focus:outline-none"
                            placeholder="Search..."
                            // onChange={(e) =>
                            //   setSearchProdValue(e.target.value)
                            // }
                          />

                          <button
                            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
                            // onClick={gosSarchData}
                          >
                            Go
                          </button>
                        </div>
                      </div>

                      {/* Table */}
                      <div className="overflow-x-auto mt-4">
                        <ProductTable
                          products={products}
                          isOpen={isOpen}
                          openModal={openModal}
                          closeModal={closeModal}
                          handleEditProduts={handleEditProduts}
                          handleDaleteData={handleDaleteData}
                          handleAddProducts={handleAddProducts}
                        />
                      </div>

                      {/* Pagination */}
                      <div className="flex justify-end pt-6 border-t border-gray-300">
                        <nav aria-label="Page navigation">
                          <ul className="flex items-center justify-center space-x-4">
                            <li>
                              <button
                                // onClick={handlepre}
                                // disabled={page === 1}
                                className="px-4 py-2 text-gray-700 bg-gray-200 border border-gray-400 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                              >
                                Previous
                              </button>
                            </li>
                            <li>
                              <span className="px-4 py-2 text-white bg-blue-600 border border-blue-700 rounded-lg">
                                {1}
                              </span>
                            </li>
                            <li>
                              <button
                                // onClick={handlenext}
                                // disabled={data.length <= 9}
                                className="px-4 py-2 text-gray-700 bg-gray-200 border border-gray-400 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                              >
                                Next
                              </button>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </section>
                </main>
                {/* )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { FaClosedCaptioning, FaFileExcel, FaFileUpload } from "react-icons/fa";
import { deleteData, getSessionData, postData } from "../utils/utils";
import { FiUploadCloud } from "react-icons/fi";
function ProductForm({
  handleAddProducts,
  dataForEdit,
  isOpen,
  openModal,
  closeModal,
}) {
  const modalRef = useRef(null);
  const [image, setImage] = useState(null);

  // State to track all form values
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    image: "",
    price_inr: "",
    discount_percentage: "0",
    how_much: "",
    ETA: "",
    health_benefits_rich_in_vitamins_and_antioxidants: false,
    health_benefits_improves_immunity: false,
    health_benefits_enhances_skin_health: false,
    certified_organic: false,
    organic_certification_body: "",
    sustainability: "",
    pesticide_free: false,
    non_GMO: false,
    fair_trade_certified: false,
    gluten_free: false,
    vegan: false,
    raw: false,
    local_source: false,
    organic_ingredients: "",
    harvested_by_hand: false,
    cruelty_free: false,
    expiration_date: "",
    storage_instructions: "",
  });

  // Initialize form with edit data if available
  useEffect(() => {
    if (dataForEdit) {
      setFormData((prevState) => ({
        ...prevState, // Keep all default values
        ...dataForEdit, // Override only provided values
      }));

      if (dataForEdit.image) {
        setImage(dataForEdit.image);
      }
    }
  }, [dataForEdit]);
  console.log(dataForEdit);
  console.log(image);

  // Excel File Upload
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const [isOpenFileModel, setIsOpenFileModel] = useState(false);

  const closeFileModel = () => {
    setIsOpenFileModel(false);
  };
  const openFileModel = () => {
    setIsOpenFileModel(true);
  };

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]); // Removed closeModal from dependencies

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const calculateDiscountPieces = (pr, des_p) => {
    const d_p = (Number(pr) / 100) * des_p;
    return Number(pr) - Number(d_p);
  };
  // calculateDiscountPieces(10, 4);
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      organic_ingredients:
        typeof formData.organic_ingredients === "string"
          ? formData.organic_ingredients.split(" ")
          : [],
      discount_price_inr: calculateDiscountPieces(
        formData?.price_inr,
        formData?.discount_percentage
      ),
      saler_name: getSessionData("name"),
      saler_id: getSessionData("_id"),
      saler_email: getSessionData("email"),
    };
    // TODO: Added
    const formDataToSend = new FormData();
    Object.entries(processedData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formDataToSend.append(`${key}[]`, item);
        });
      } else {
        formDataToSend.append(key, value);
      }
    });

    // Append image file if available
    // if (image) {
    //   formDataToSend.append("image", image);
    // }
    if (image instanceof File) {
      formDataToSend.append("image", image);
    }
    let url;
    let isEdit = false;

    if (dataForEdit && dataForEdit._id) {
      url = `${baseUrl2}/products/${dataForEdit._id}`;
      isEdit = true; // Updating
    } else {
      url = `${baseUrl2}/products`;
    }

    try {
      await handleAddProducts(url, formDataToSend, isEdit);

      setFormData({
        category: "",
        title: "",
        description: "",
        image: "",
        price_inr: "",
        discount_percentage: "",
        how_much: "",
        ETA: "",
        health_benefits_rich_in_vitamins_and_antioxidants: false,
        health_benefits_improves_immunity: false,
        health_benefits_enhances_skin_health: false,
        certified_organic: false,
        organic_certification_body: "",
        sustainability: "",
        pesticide_free: false,
        non_GMO: false,
        fair_trade_certified: false,
        gluten_free: false,
        vegan: false,
        raw: false,
        local_source: false,
        organic_ingredients: "",
        harvested_by_hand: false,
        cruelty_free: false,
        expiration_date: "",
        storage_instructions: "",
      });

      closeModal();
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  const handleSubmitExcel = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          `${baseUrl2}/products/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success("File uploaded successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });

        closeFileModel(); // Close modal after submitting
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Failed to upload file!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <button
          className="m-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center self-end mt-3"
          type="button"
          onClick={openFileModel}
        >
          <FaFileExcel className="mr-1" /> Upload Excel
        </button>
        <button
          className="m-3 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center self-end mt-3"
          type="button"
          onClick={openModal}
        >
          <AiOutlinePlus className="mr-1" /> Add Product
        </button>
      </div>

      {/* Modal For Form */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          {/* Modal Content */}
          <div
            ref={modalRef}
            className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold text-gray-800">
                {dataForEdit ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={closeModal}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <IoClose className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <form className="p-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                      Basic Information
                    </h3>

                    <div className="space-y-2">
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Category *
                      </label>
                      <select
                        id="category"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required
                        value={formData.category}
                        onChange={handleInputChange}
                      >
                        <option value="">Select a category</option>
                        <option value="fruits">Fruits</option>
                        <option value="vegetables">Vegetables</option>
                        <option value="grains">Grains</option>
                        <option value="dairy">Dairy</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Title *
                      </label>
                      <input
                        type="text"
                        id="title"
                        placeholder="e.g. Organic Mango"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required
                        value={formData.title}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description *
                      </label>
                      <textarea
                        id="description"
                        rows={3}
                        placeholder="Describe your product..."
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required
                        value={formData.description}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="image"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Product Image *
                      </label>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <label
                            htmlFor="image-upload"
                            className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                          >
                            {image ? (
                              <img
                                src={
                                  typeof image === "string"
                                    ? image
                                    : URL.createObjectURL(image)
                                }
                                alt="Preview"
                                className="h-full object-contain"
                              />
                            ) : (
                              <div className="text-center">
                                <FaFileUpload className="mx-auto h-8 w-8 text-gray-400" />
                                <p className="mt-1 text-sm text-gray-500">
                                  Click to upload image
                                </p>
                              </div>
                            )}

                            <input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageChange}
                              // required
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                      Pricing Information
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="price_inr"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Price (INR) *
                        </label>
                        <input
                          type="number"
                          id="price_inr"
                          placeholder="e.g. 120"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          required
                          value={formData.price_inr}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="discount_percentage"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Discount %
                        </label>
                        <input
                          type="number"
                          id="discount_percentage"
                          placeholder="e.g. 100"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          value={formData.discount_percentage}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="how_much"
                          className="block text-sm font-medium text-gray-700"
                        >
                          How Much *
                        </label>
                        <input
                          type="text"
                          id="how_much"
                          placeholder="e.g. 1KG"
                          required
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          value={formData.how_much}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="ETA"
                          className="block text-sm font-medium text-gray-700"
                        >
                          ETA *
                        </label>
                        <input
                          type="text"
                          id="ETA"
                          required
                          placeholder="e.g. 2-5 business days"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          value={formData.ETA}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Expiration & Storage */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                      Expiration & Storage
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="expiration_date"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Expiration Date
                        </label>
                        <input
                          type="date"
                          id="expiration_date"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          value={formData.expiration_date}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="storage_instructions"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Storage Instructions
                      </label>
                      <input
                        type="text"
                        id="storage_instructions"
                        placeholder="e.g. Keep refrigerated for freshness"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        value={formData.storage_instructions}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Health Benefits */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                      Health Benefits
                    </h3>

                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="health_benefits_rich_in_vitamins_and_antioxidants"
                          className="h-4 w-4 text-red-500 focus:ring-red-400 border-gray-300 rounded"
                          checked={
                            formData.health_benefits_rich_in_vitamins_and_antioxidants
                          }
                          onChange={handleInputChange}
                        />
                        <label
                          htmlFor="health_benefits_rich_in_vitamins_and_antioxidants"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Rich in vitamins and antioxidants
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="health_benefits_improves_immunity"
                          className="h-4 w-4 text-red-500 focus:ring-red-400 border-gray-300 rounded"
                          checked={formData.health_benefits_improves_immunity}
                          onChange={handleInputChange}
                        />
                        <label
                          htmlFor="health_benefits_improves_immunity"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Improves immunity
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="health_benefits_enhances_skin_health"
                          className="h-4 w-4 text-red-500 focus:ring-red-400 border-gray-300 rounded"
                          checked={
                            formData.health_benefits_enhances_skin_health
                          }
                          onChange={handleInputChange}
                        />
                        <label
                          htmlFor="health_benefits_enhances_skin_health"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Enhances skin health
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                      Certifications
                    </h3>

                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="certified_organic"
                          className="h-4 w-4 text-red-500 focus:ring-red-400 border-gray-300 rounded"
                          checked={formData.certified_organic}
                          onChange={handleInputChange}
                        />
                        <label
                          htmlFor="certified_organic"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Certified Organic
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="organic_certification_body"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Organic Certification Body
                      </label>
                      <select
                        id="organic_certification_body"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        value={formData.organic_certification_body}
                        onChange={handleInputChange}
                      >
                        <option value="">Select certification</option>
                        <option value="USDA Organic">USDA Organic</option>
                        <option value="India Organic">India Organic</option>
                        <option value="EU Organic">EU Organic</option>
                        <option value="JAS Organic">JAS Organic</option>
                        <option value="EcoCert">EcoCert</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="sustainability"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Sustainability
                      </label>
                      <textarea
                        id="sustainability"
                        rows={2}
                        placeholder="Describe sustainability practices..."
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        value={formData.sustainability}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* Product Attributes */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                      Product Attributes
                    </h3>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="pesticide_free"
                          className="h-4 w-4 text-red-500 focus:ring-red-400 border-gray-300 rounded"
                          checked={formData.pesticide_free}
                          onChange={handleInputChange}
                        />
                        <label
                          htmlFor="pesticide_free"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Pesticide Free
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="non_GMO"
                          className="h-4 w-4 text-red-500 focus:ring-red-400 border-gray-300 rounded"
                          checked={formData.non_GMO}
                          onChange={handleInputChange}
                        />
                        <label
                          htmlFor="non_GMO"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Non-GMO
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="fair_trade_certified"
                          className="h-4 w-4 text-red-500 focus:ring-red-400 border-gray-300 rounded"
                          checked={formData.fair_trade_certified}
                          onChange={handleInputChange}
                        />
                        <label
                          htmlFor="fair_trade_certified"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Fair Trade Certified
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="gluten_free"
                          className="h-4 w-4 text-red-500 focus:ring-red-400 border-gray-300 rounded"
                          checked={formData.gluten_free}
                          onChange={handleInputChange}
                        />
                        <label
                          htmlFor="gluten_free"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Gluten Free
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="vegan"
                          className="h-4 w-4 text-red-500 focus:ring-red-400 border-gray-300 rounded"
                          checked={formData.vegan}
                          onChange={handleInputChange}
                        />
                        <label
                          htmlFor="vegan"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Vegan
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="raw"
                          className="h-4 w-4 text-red-500 focus:ring-red-400 border-gray-300 rounded"
                          checked={formData.raw}
                          onChange={handleInputChange}
                        />
                        <label
                          htmlFor="raw"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Raw
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="local_source"
                          className="h-4 w-4 text-red-500 focus:ring-red-400 border-gray-300 rounded"
                          checked={formData.local_source}
                          onChange={handleInputChange}
                        />
                        <label
                          htmlFor="local_source"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Local Source
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="harvested_by_hand"
                          className="h-4 w-4 text-red-500 focus:ring-red-400 border-gray-300 rounded"
                          checked={formData.harvested_by_hand}
                          onChange={handleInputChange}
                        />
                        <label
                          htmlFor="harvested_by_hand"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Harvested by Hand
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="cruelty_free"
                          className="h-4 w-4 text-red-500 focus:ring-red-400 border-gray-300 rounded"
                          checked={formData.cruelty_free}
                          onChange={handleInputChange}
                        />
                        <label
                          htmlFor="cruelty_free"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Cruelty Free
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Ingredients */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                      Ingredients
                    </h3>

                    <div className="space-y-2">
                      <label
                        htmlFor="organic_ingredients"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Organic Ingredients (separate with spaces)
                      </label>
                      <input
                        type="text"
                        id="organic_ingredients"
                        placeholder="e.g. mango apple banana"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        value={formData.organic_ingredients}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="mt-8 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Model For Excel */}
      {isOpenFileModel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="w-96 p-6 bg-white rounded-lg shadow-lg relative">
            {/* Close Button */}
            <button
              className="absolute top-1 right-3 mb-2 text-gray-500 hover:text-gray-700 transition text-2xl"
              onClick={closeFileModel}
            >
              <IoClose />
            </button>

            {/* File Upload Box */}
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition">
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*, application/pdf, .xlsx, .xls"
              />
              <FiUploadCloud className="text-blue-500 text-5xl mb-2" />
              <p className="text-gray-500 text-sm">
                {file ? file.name : "Click to upload or drag & drop"}
              </p>
            </label>

            {/* File Name & Remove Option */}
            {file && (
              <div className="mt-4 flex items-center justify-between bg-gray-200 px-4 py-3 rounded-md">
                <span className="text-gray-700 text-sm truncate">
                  {file.name}
                </span>
                <button
                  className="text-red-500 hover:text-red-700 transition"
                  onClick={() => setFile(null)}
                >
                  ✖
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition"
              onClick={handleSubmitExcel}
              disabled={!file}
            >
              Submit File
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import {
  FaLeaf,
  FaCheck,
  FaTimes,
  FaShieldAlt,
  FaGlobeAmericas,
  FaHandHolding,
  FaCalendarAlt,
  FaSnowflake,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 w-full">
      {/* Product Header */}
      <div className="relative">
        <div className="h-48 bg-gray-100 flex items-center justify-center">
          {product.image ? (
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <img
              src={`/placeholder.svg?height=200&width=400&text=${encodeURIComponent(
                product.title
              )}`}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          )}
        </div>
        {product.discount_percentage > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            {product.discount_percentage}% OFF
          </div>
        )}
        <div className="absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 rounded-full text-xs uppercase">
          {product.category}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {product.title}
        </h2>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>

        {/* Price Section */}
        <div className="flex items-center mb-4">
          <span className="text-2xl font-bold text-green-600">
            ₹{product.discount_price_inr}
          </span>
          {product.discount_percentage > 0 && (
            <span className="text-gray-500 line-through ml-2">
              ₹{product.price_inr}
            </span>
          )}
        </div>

        {/* Delivery Info */}
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <FaCalendarAlt className="mr-2 text-gray-500" />
          <span>Delivery: {product.ETA}</span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Health Benefits */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">Health Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center">
              {product.health_benefits_rich_in_vitamins_and_antioxidants ? (
                <FaCheck className="text-green-500 mr-2" />
              ) : (
                <FaTimes className="text-red-500 mr-2" />
              )}
              <span>Rich in vitamins & antioxidants</span>
            </div>
            <div className="flex items-center">
              {product.health_benefits_improves_immunity ? (
                <FaCheck className="text-green-500 mr-2" />
              ) : (
                <FaTimes className="text-red-500 mr-2" />
              )}
              <span>Improves immunity</span>
            </div>
            <div className="flex items-center">
              {product.health_benefits_enhances_skin_health ? (
                <FaCheck className="text-green-500 mr-2" />
              ) : (
                <FaTimes className="text-red-500 mr-2" />
              )}
              <span>Enhances skin health</span>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">
            Certifications & Features
          </h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {product.certified_organic && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
                <FaLeaf className="mr-1" /> {product.organic_certification_body}
              </span>
            )}
            {product.pesticide_free && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
                <FaShieldAlt className="mr-1" /> Pesticide Free
              </span>
            )}
            {product.non_GMO && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
                <FaShieldAlt className="mr-1" /> Non-GMO
              </span>
            )}
            {product.fair_trade_certified && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
                <FaGlobeAmericas className="mr-1" /> Fair Trade
              </span>
            )}
            {product.gluten_free && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
                <FaCheck className="mr-1" /> Gluten Free
              </span>
            )}
            {product.vegan && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
                <FaLeaf className="mr-1" /> Vegan
              </span>
            )}
            {product.raw && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
                <FaCheck className="mr-1" /> Raw
              </span>
            )}
            {product.local_source && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
                <FaGlobeAmericas className="mr-1" /> Local Source
              </span>
            )}
            {product.harvested_by_hand && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
                <FaHandHolding className="mr-1" /> Hand Harvested
              </span>
            )}
            {product.cruelty_free && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
                <FaCheck className="mr-1" /> Cruelty Free
              </span>
            )}
          </div>
        </div>

        {/* Sustainability */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">Sustainability</h3>
          <p className="text-sm text-gray-600">{product.sustainability}</p>
        </div>

        {/* Storage & Expiration */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">
            Storage & Expiration
          </h3>
          <div className="text-sm">
            <div className="flex items-center mb-1">
              <FaCalendarAlt className="text-gray-500 mr-2" />
              <span>
                Expires:{" "}
                {new Date(product.expiration_date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <FaSnowflake className="text-gray-500 mr-2" />
              <span>{product.storage_instructions}</span>
            </div>
          </div>
        </div>

        {/* Ingredients */}
        {product.organic_ingredients &&
          product.organic_ingredients.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                Organic Ingredients
              </h3>
              <div className="flex flex-wrap gap-1">
                {product.organic_ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          )}

        {/* Seller Info */}
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">{product.saler_name}</p>
              <div className="flex items-center text-gray-500 text-sm">
                <MdEmail className="mr-1" />
                <span>{product.saler_email}</span>
              </div>
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductForm.propTypes = {
  handleAddProducts: PropTypes.func.isRequired, // Define the expected prop type
  dataForEdit: PropTypes.object.isRequired, // Define the expected prop type
  isOpen: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    price_inr: PropTypes.number.isRequired,
    discount_price_inr: PropTypes.number.isRequired,
    discount_percentage: PropTypes.number.isRequired,
    ETA: PropTypes.string.isRequired,
    health_benefits_rich_in_vitamins_and_antioxidants:
      PropTypes.bool.isRequired,
    health_benefits_improves_immunity: PropTypes.bool.isRequired,
    health_benefits_enhances_skin_health: PropTypes.bool.isRequired,
    certified_organic: PropTypes.bool.isRequired,
    organic_certification_body: PropTypes.string.isRequired,
    sustainability: PropTypes.string.isRequired,
    pesticide_free: PropTypes.bool.isRequired,
    non_GMO: PropTypes.bool.isRequired,
    fair_trade_certified: PropTypes.bool.isRequired,
    gluten_free: PropTypes.bool.isRequired,
    vegan: PropTypes.bool.isRequired,
    raw: PropTypes.bool.isRequired,
    local_source: PropTypes.bool.isRequired,
    organic_ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    harvested_by_hand: PropTypes.bool.isRequired,
    cruelty_free: PropTypes.bool.isRequired,
    expiration_date: PropTypes.string.isRequired,
    storage_instructions: PropTypes.string.isRequired,
    saler_email: PropTypes.string.isRequired,
    saler_id: PropTypes.string.isRequired,
    saler_name: PropTypes.string.isRequired,
  }).isRequired,
};

import { FaEdit, FaTrash, FaEye, FaCopy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Component/Sidebar";
import Footer from "../Components/Footer";
import { AiOutlinePlus } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import axios from "axios";

function ProductTable({
  products,
  handleEditProduts,
  handleDaleteData,
  handleAddProducts,
  openModal,
}) {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
        <thead>
          <tr className="text-sm text-left bg-green-500 text-white">
            <th className="px-6 py-3 font-medium">ID & Name</th>
            <th className="px-6 py-3 font-medium">Category</th>
            <th className="px-6 py-3 font-medium">How Much</th>
            <th className="px-6 py-3 font-medium">Price</th>
            <th className="px-6 py-3 font-medium">Saler Name & ID</th>
            <th className="px-6 py-3 font-medium text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, index) => (
            <ProductRow
              key={product.saler_id || index}
              product={product}
              index={index}
              openModal={openModal}
              handleEditProduts={handleEditProduts}
              handleDaleteData={handleDaleteData}
              handleAddProducts={handleAddProducts}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProductRow({
  product,
  index,
  openModal,
  handleEditProduts,
  handleDaleteData,
  handleAddProducts,
}) {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const handleEdit = (product) => {
    handleEditProduts(product);
    openModal();
  };

  const handleShowPopcorn = () => {
    setShowPopup(true);
  };

  const handleView = (product) => {
    navigate(`/admin-products-view/${product._id}`);
  };

  const handleCopy = (prod) => {
    const newProduct = { ...prod, _id: undefined }; // Remove _id to let MongoDB generate a new one
    handleAddProducts(`${baseUrl2}/products`, newProduct, false);
  };

  return (
    <tr className={`text-sm ${index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}`}>
      <td className="px-6 py-4 flex items-center space-x-2">
        <span className="font-semibold">{product._id.substring(0, 5)}</span>

        <p className="text-gray-700">{product.title}</p>
        <img
          src={`http://localhost:5000/uploads${product.image}`}
          alt={product.image}
        />
      </td>
      <td className="px-6 py-4">{product.category}</td>
      <td className="px-6 py-4">{product?.how_much}</td>
      <td className="px-6 py-4 font-medium text-gray-800">
        ₹ {product.price_inr}
      </td>
      <td className="px-6 py-4">
        <span className="font-semibold">
          {product.saler_name} - {product.saler_id.substring(0, 5)}
        </span>
        {/* <p className="text-gray-700">{product.saler_name}</p> */}
      </td>
      <td className="px-6 py-4 flex justify-center space-x-4">
        <button
          onClick={() => handleCopy(product)}
          className="px-3 py-2 text-gray-600 border border-gray-600 rounded-lg hover:bg-gray-600 hover:text-white transition-all"
        >
          <FaCopy />
        </button>{" "}
        <button
          onClick={() => handleView(product)}
          className="px-3 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all"
        >
          <FaEye />
        </button>
        <button
          onClick={() => handleEdit(product)}
          className="px-3 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
        >
          <FaEdit />
        </button>
        <PopcornUI
          product={product}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          handleShowPopcorn={handleShowPopcorn}
          handleDaleteData={handleDaleteData}
        />
      </td>
    </tr>
  );
}

// Prop Validation
ProductTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      saler_id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      price_inr: PropTypes.number.isRequired,
    })
  ).isRequired,
  handleEditProduts: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  handleDaleteData: PropTypes.func.isRequired,
  handleAddProducts: PropTypes.func.isRequired,
};

ProductRow.propTypes = {
  product: PropTypes.shape({
    saler_id: PropTypes.string.isRequired,
    saler_name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price_inr: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  handleEditProduts: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  openModal: PropTypes.func.isRequired,
  handleDaleteData: PropTypes.func.isRequired,
  handleAddProducts: PropTypes.func.isRequired,
};

export const PopcornUI = ({
  showPopup,
  setShowPopup,
  handleShowPopcorn,
  product,
  handleDaleteData,
}) => {
  const handleDelete = () => {
    setShowPopup(false);
    handleDaleteData(product);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <button
        onClick={handleShowPopcorn}
        className="px-3 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"
      >
        <FaTrash />
      </button>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <h2 className="text-lg font-semibold text-gray-800">
              Do you really want to delete the data?
            </h2>
            <div className="mt-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 mr-1"
              >
                Yes
              </button>

              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

PopcornUI.propTypes = {
  showPopup: PropTypes.bool.isRequired, // Ensures showPopup is a boolean and required
  setShowPopup: PropTypes.func.isRequired, // Ensures setShowPopup is a function and required
  handleShowPopcorn: PropTypes.func.isRequired, // Ensures handleShowPopcorn is a function and required
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired, // Ensures product has an _id (adjust based on actual structure)
    name: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    image: PropTypes.string,
  }).isRequired, // Ensures product object is required
  handleDaleteData: PropTypes.func.isRequired, // Ensures handleDeleteData is a function and required
};
