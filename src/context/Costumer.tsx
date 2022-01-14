import React, { createContext, useContext, useState, useCallback } from "react";
import { ICostumer, ICostumerContext } from "./interface";

const CostumerContext = createContext<ICostumerContext>({} as ICostumerContext);

const handleSaveStorage = (costumer) => {
  localStorage.setItem("costumer", JSON.stringify(costumer));
};

// eslint-disable-next-line react/prop-types
export const CostumerProvider = ({ children }) => {
  const [costumer, setCostumer] = useState<ICostumer[]>(
    JSON.parse(localStorage.getItem("costumer") || "")
  );

  const removeCostumer = useCallback(
    (cpf: string) => {
      const costumerTemp = costumer.filter((item) => item.cpf !== cpf);
      setCostumer(costumerTemp);
      handleSaveStorage(costumerTemp);
    },
    [costumer]
  );

  const addCostumer = useCallback(
    (newCostumer: ICostumer) => {
      const costumerTemp = [...costumer, newCostumer];
      setCostumer(costumerTemp);
      handleSaveStorage(costumerTemp);
    },
    [costumer]
  );

  return (
    <CostumerContext.Provider
      value={{
        removeCostumer: removeCostumer,
        addCostumer: addCostumer,
        costumer,
      }}
    >
      {children}
    </CostumerContext.Provider>
  );
};

export const useCostumer = () => useContext(CostumerContext);

export default CostumerContext;
