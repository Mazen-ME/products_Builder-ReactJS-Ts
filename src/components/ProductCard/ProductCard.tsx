import { Iproduct } from "../../interfaces/interfaces";
import { priceEditor, txtSlicer } from "../../utils/ForEdits";
import Buttons from "../../ui/buttons/Buttons";
import Image from "../../ui/images/Image";
import Colors from "../../ui/Colors/Colors";


interface ProductCardProps {
  product: Iproduct;
  setEditProduct: (product: Iproduct) => void;
  openEditModal: () => void;
  setProductIdx: (value: number) => void;
  idx: number;

  openConfirmModal: () => void;
}

export default function ProductCard(props: ProductCardProps) {
  const { product, setEditProduct,openEditModal,idx,setProductIdx,openConfirmModal } = props;

  const {  title, price, imageURL, description,colors, category} = product;



  const renderColors = colors.map((color) => (
    <Colors
      color={color}
      key={color}
    />
  ));
  function editP(): void {
    setEditProduct(product);
    openEditModal();
    setProductIdx(idx);
  }

  const onRemove =()=>{
    setEditProduct(product);
    openConfirmModal()
  }

  return (
    <>
      <div className="max-w-sm md:max-w-lg border rounded-md p-2 flex flex-col mx-auto md:mx-0">
        <Image
          className="rounded-md h-52 w-full lg:object-cover"
          alt="car"
          src={imageURL}
        />
        <h3 className="text-lg font-semibold my-2">{txtSlicer(title, 25)}</h3>
        <p className="text-sm text-gray-500 break-words">
          {txtSlicer(description, 75)}
        </p>

        {renderColors && (
          <div className="flex items-center my-4 space-x-1 ">
            {renderColors}
          </div>
        )}

        {/* <div className="flex items-center space-x-2 justify-center">
        </div> */}

        <div className="flex items-center justify-between">
          <span className="text-indigo-700 font-bold text-xl">
            ${priceEditor(price)}
          </span>
          <span className="space-x-2 flex items-center text-lg font-bold text-red-700">
            <h4>{category.name}</h4>
            <Image
              className="w-8 h-8 rounded-full cursor-pointer object-bottom"
              alt="cars"
              src={category.imageURL}
            />
          </span>
        </div>

        <div className="flex items-center justify-between space-x-2 mt-5">
          <Buttons className="bg-indigo-700  hover:bg-indigo-600" 
          onClick={editP}
          >EDIT</Buttons>
          <Buttons onClick={onRemove} className="bg-red-600 hover:bg-red-700">REMOVE</Buttons>
        </div>
      </div>
    </>
  );
}
