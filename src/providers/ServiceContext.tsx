"use client";
import React, { useContext, useState, useEffect } from "react";

type SericeProviderProps = {
  children: React.ReactNode;
  className?: string;
};
type servicesByCompanyType = {
  company: number;
  services: string[];
};

type ServiceContextTypes = {
  servicesByCompany: servicesByCompanyType[];
  setServicesByCompany: React.Dispatch<
    React.SetStateAction<servicesByCompanyType[]>
  >;
};

const ServiceContext = React.createContext<ServiceContextTypes>({
  servicesByCompany: [], // default theme
  setServicesByCompany: () => {}, // placeholder function
});

export function ServiceContexProvider({
  children,
  className,
}: SericeProviderProps) {
  const [servicesByCompany, setServicesByCompany] = useState<
    servicesByCompanyType[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/articles");
      const json = await res.json();
      setServicesByCompany(json.serviceByCompany);
    };
    fetchData();
  }, []);

  return (
    // Provide the context value to all nested children
    <ServiceContext.Provider
      value={{ servicesByCompany, setServicesByCompany }}
    >
      {children}
    </ServiceContext.Provider>
  );
}

export { ServiceContext };

export const useServiceContext = () => useContext(ServiceContext);
