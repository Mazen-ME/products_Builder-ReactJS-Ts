export const txtSlicer = (txt:string,max:number=50): string=>{
if (txt.length > max) {
    return txt.slice(0, max) + "...";
} else {
    return txt
}
}


export const priceEditor = (price: string) => {
  let result = "";
  let counter = 0;

  for (let i = price.length - 1; i >= 0; i--) {
    counter++;
    result = price[i] + result;
    if (counter % 3 === 0 && i !== 0) {
      result = "," + result;
    }
  }

  return result;
};
