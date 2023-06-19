const findIndex = (id: number, arrayObject: []):number => {
    let indexCurrent:number=-1;
    arrayObject.map((product: any, index: number) => {
      if (product.id === id) {
        indexCurrent = index;
        return;
      }
    });
    return indexCurrent;
  };
  export {findIndex}