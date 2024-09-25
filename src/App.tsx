import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import ProductCard from "./components/ProductCard/ProductCard";
import { categories, colors, formInputsList, productList } from "./data/DataOb";
import Modal from "./components/modal/Modal";
import Buttons from "./ui/buttons/Buttons";
import Inputes from "./ui/inputs/Inputes";
import { ICategory, Iproduct } from "./interfaces/interfaces";
import { validation } from "./utils/Validation/validation";
import Alert from "./components/Error/ErrorMsg";
import Colors from "./ui/Colors/Colors";
import { v4 as uuid } from "uuid";
import SelectModal from "./components/modal/SelectModal";
import { productName } from "./types/types";
import toast, { Toaster } from "react-hot-toast";


function App() {
  /*------------- variables ------------*/
  const staticProduct = {
    title: "",
    price: "",
    description: "",
    imageURL: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };

  /*------------- state ------------*/
  const [product, setProduct] = useState<Iproduct>(staticProduct);
  const [products, setProducts] = useState<Iproduct[]>(productList);
  const [tempColor, setTempColor] = useState<string[]>([]);
  const [selected, setSelected] = useState<ICategory>(categories[0]);
  const [colorsError, setColorsError] = useState<string>("");
  const [EditProduct, setEditProduct] = useState<Iproduct>(staticProduct);
  const [editProductIdx, setEditProductIdx] = useState<number>(0);

  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });

  /*------------- handlers ------------*/

  const closeConfirmModal = () => setIsOpenConfirmModal(false);
  const openConfirmModal = () => setIsOpenConfirmModal(true);

  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true);

  const openEditModal = () => setIsOpenEditModal(true);

  const closeEditModal = () => setIsOpenEditModal(false);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditProduct({
      ...EditProduct,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const { title, description, imageURL, price } = product;

    const errors = validation({ title, description, imageURL, price });

    const NoError = Object.values(errors).every((err) => !err);

    if (!NoError) {
      setErrors(errors);
      setColorsError("Please select at least one color");

      return;
    } else {
      if (tempColor.length == 0) {
        setColorsError("Please select at least one color");
        return;
      }
    }

    setProducts((prev) => [
      ...prev,
      { ...product, id: uuid(), colors: tempColor, category: selected },
    ]);
    setProduct(staticProduct);
    setErrors({
      title: "",
      description: "",
      imageURL: "",
      price: "",
    });
    setColorsError("");

   


// how to change the position of this toast only



toast("product has been added", {
  position: "top-right",
  duration: 1000,
  icon: "👏",
  style: {
    backgroundColor: "#3a6adb",
    color: "#fff",
  },
});
    setTempColor([]);
  };

  const submitEditHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const { title, description, imageURL, price } = EditProduct;

    const errors = validation({ title, description, imageURL, price });

    const NoError = Object.values(errors).every((err) => !err);

    if (!NoError) {
      setErrors(errors);
      setColorsError("Please select at least one color");

      return;
    } else {
      if (EditProduct.colors.length == 0 && tempColor.length == 0) {
        setColorsError("Please select at least one color");
        return;
      }
    }

    setProducts((prev) => [
      ...prev,
      { ...product, id: uuid(), colors: tempColor, category: selected },
    ]);
    setEditProduct(staticProduct);
    setErrors({
      title: "",
      description: "",
      imageURL: "",
      price: "",
    });

    const updatedProducts = [...products];
    updatedProducts[editProductIdx] = {
      ...EditProduct,
      colors: tempColor.concat(EditProduct.colors),
    };
    console.log(tempColor.concat(EditProduct.colors));

    setProducts(updatedProducts);

    setEditProduct(staticProduct);
    setColorsError("");
    closeEditModal();
    setTempColor([]);
    toast("product has been updated", {
      position: "top-center",
      duration: 1000,
      icon: "👏",
      style: {
        backgroundColor: "#edd238",
        color: "#fff",
      },
    });
  };

  const canselHandler = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setTempColor([]);
    setProduct(staticProduct);
    setErrors({
      title: "",
      description: "",
      imageURL: "",
      price: "",
    });
    closeModal();
  };

  const canselHandlerEditModal = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setTempColor([]);
    setProduct(staticProduct);
    setErrors({
      title: "",
      description: "",
      imageURL: "",
      price: "",
    });
    setColorsError("");
    closeEditModal();
  };

  const removeProductHandler = () => {
    const afterRemove = products.filter(product => product.id !== EditProduct.id)
    setProducts(afterRemove)
    closeConfirmModal()

    toast("product removed", {
      position: "top-left",
      duration: 1000,
      icon: "👏",

      style: {
        backgroundColor: "#c2344d",
        color: "#fff",
      },
    });
  };


  /*------------- render ------------*/

  const renderProductCard = products.map((pro, idx) => {
    return (
      <ProductCard
        product={pro}
        key={pro.id}
        openEditModal={openEditModal}
        setEditProduct={setEditProduct}
        idx={idx}
        setProductIdx={setEditProductIdx}
        openConfirmModal={openConfirmModal}
      />
    );
  });

  const renderInputsList = formInputsList.map((input) => {
    return (
      <div key={input.id} className="flex flex-col mb-2">
        <label
          htmlFor={input.name}
          className="mb-2 text-sm font-medium text-gray-700 tracking-wider"
        >
          {input.label}
        </label>
        <Inputes
          type={input.type}
          id={input.name}
          name={input.name}
          onChange={onChangeHandler}
          value={product[input.name]}
        />
        <Alert msg={errors[input.name]} />
      </div>
    );
  });

  const renderColors = colors.map((color) => (
    <Colors
      color={color}
      key={color}
      onClick={() => {
        if (tempColor.includes(color)) {
          setTempColor((prev) => prev.filter((c) => c !== color));
        } else if (!EditProduct.colors.includes(color)) {
          setTempColor((prev) => [...prev, color]);
          setColorsError("");
        }
      }}
    />
  ));

  const renderEditProductWithErrorMsg = (
    id: string,
    ProductLabel: string,
    name: productName
  ) => {
    return (
      <div className="flex flex-col mb-2">
        <label
          // htmlFor={input.name}
          htmlFor={id}
          className="mb-2 text-sm font-medium text-gray-700 tracking-wider"
        >
          {ProductLabel}
        </label>
        <Inputes
          // type={input.type}
          type={"text"}
          // id={input.name}
          id={id}
          // name={input.name}
          name={name}
          onChange={onChangeEditHandler}
          // value={product[input.name]}
          value={EditProduct[name]}
        />
        {/* <Alert msg={errors[input.name]} /> */}
        <Alert msg={errors[name]} />
      </div>
    );
  };

  
  /*------------- return ------------*/

  return (
    <>
      <main className="2xl:container my-7">
        <div className="flex justify-center md:justify-end px-2">
          <Buttons
            onClick={openModal}
            width="w-fit"
            className="bg-indigo-700 hover:bg-indigo-600 p-2 m-5 "
          >
            Add Product
          </Buttons>
        </div>
        <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
          {renderProductCard}
        </div>

        {/*         Add modal         */}

        <Modal isOpen={isOpen} closeModal={closeModal} title="Add Product">
          <form className="space-y-3" onSubmit={submitHandler}>
            {renderInputsList}
            <SelectModal selected={selected} setSelected={setSelected} />
            <div className="flex items-center space-x-2 justify-center">
              {renderColors}
            </div>
            <div className="flex items-center flex-wrap space-x-2 justify-center">
              {/* {tempColor.length === 0 ? (
                <Alert msg={"No colors selected"} />
              ) : (
                tempColor.map((color) => (
                  <span
                    className="text-white p-1 mb-1 mr-1 text-xs rounded-md cursor-pointer"
                    style={{ backgroundColor: color }}
                    key={color}
                    onClick={() => {
                      setTempColor((prev) => prev.filter((c) => c !== color));
                    }}
                  >
                    {color}
                  </span>
                ))
              )} */}
              {tempColor.map((color) => (
                <span
                  className="text-white p-1 mb-1 mr-1 text-xs rounded-md cursor-pointer"
                  style={{ backgroundColor: color }}
                  key={color}
                  onClick={() => {
                    setTempColor((prev) => prev.filter((c) => c !== color));
                  }}
                >
                  {color}
                </span>
              ))}
            </div>
            {tempColor && (
              <span className="block mt-[5px] ms-[5px] text-sm font-semibold text-red-600">
                {colorsError}
              </span>
            )}
            <div className="flex items-center space-x-3">
              <Buttons className="bg-indigo-700 hover:bg-indigo-600">
                SUBMIT
              </Buttons>
              <Buttons
                onClick={canselHandler}
                className="bg-red-600 hover:bg-red-700"
              >
                CANCEL
              </Buttons>
            </div>
          </form>
        </Modal>

        {/*         Edit modal         */}
        <Modal
          isOpen={isOpenEditModal}
          closeModal={closeEditModal}
          title="Edit Product"
        >
          <form className="space-y-3" onSubmit={submitEditHandler}>
            {renderEditProductWithErrorMsg("title", "Product Title", "title")}
            {renderEditProductWithErrorMsg(
              "Description",
              "Product Description",
              "description"
            )}
            {renderEditProductWithErrorMsg(
              "imageURL",
              "Product Image URL ",
              "imageURL"
            )}
            {renderEditProductWithErrorMsg("price", "Product Price", "price")}

            {/* {renderInputsList} */}

            <SelectModal
              selected={EditProduct.category}
              setSelected={(value) => {
                setEditProduct({ ...EditProduct, category: value });
              }}
            />

            <div className="flex items-center space-x-2 justify-center">
              {renderColors}
            </div>

            <div className="flex items-center flex-wrap space-x-2 justify-center">
              {tempColor.concat(EditProduct.colors).map((color) => (
                <span
                  className="text-white p-1 mb-1 mr-1 text-xs rounded-md cursor-pointer"
                  style={{ backgroundColor: color }}
                  key={color}
                  onClick={() => {
                    if (tempColor.includes(color)) {
                      setTempColor((prev) => prev.filter((c) => c !== color));
                    } else if (EditProduct.colors.includes(color)) {
                      setEditProduct({
                        ...EditProduct,
                        colors: EditProduct.colors.filter((c) => c !== color),
                      });
                    }
                  }}
                >
                  {color}
                </span>
              ))}
            </div>
            {colorsError && (
              <span className="block mt-[5px] ms-[5px] text-sm font-semibold text-red-600">
                {colorsError}
              </span>
            )}

            <div className="flex items-center space-x-3">
              <Buttons
                type="submit"
                className="bg-indigo-700 hover:bg-indigo-600"
              >
                SUBMIT
              </Buttons>
              <Buttons
                onClick={canselHandlerEditModal}
                className="bg-red-600 hover:bg-red-700"
              >
                CANCEL
              </Buttons>
            </div>
          </form>
        </Modal>

        <Modal
          isOpen={isOpenConfirmModal}
          closeModal={closeConfirmModal}
          title="Are you sure you want to remove this Product from your Store?"
          description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
        >
          <div className="flex items-center space-x-3">
            <Buttons
              // className="bg-[#3a6adb] hover:bg-red-800"
              className="bg-red-600 hover:bg-red-700"
              onClick={removeProductHandler}
            >
              Yes, remove
            </Buttons>
            <Buttons
              type="button"
              // className="bg-[#e1e1e7] hover:bg-gray-200 !text-black"
              className="bg-[#f2f6f9] hover:bg-gray-200 !text-black"
              onClick={closeConfirmModal}
            >
              Cancel
            </Buttons>
          </div>
        </Modal>
        <Toaster/>
      </main>
    </>
  );
}

export default App;
