import React, { createContext, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

const LangContext = createContext();

export const useLanguage = () => {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LangProvider");
  }
  return context;
};

export const LangProvider = ({ children }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lng;
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("i18nextLng") || "en";
    changeLanguage(savedLang);
  }, []);

  const isRTL = i18n.language === "ar";

  return (
    <LangContext.Provider
      value={{
        currentLanguage: i18n.language,
        isRTL, // Add this!
        changeLanguage,
      }}
    >
      {children}
    </LangContext.Provider>
  );
};
