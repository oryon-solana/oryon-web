import type { Merchant } from "../types";

export const CATEGORIES = ["All", "Food & Beverage", "Hotels", "Travel", "Retail", "Finance"];

export const MERCHANTS: Merchant[] = [
  // Food & Beverage
  {
    id: "mcdonalds", name: "McDonald's", cat: "Food & Beverage", earnRate: 1.0, pointValueIDR: 50, unit: "Points", active: true,
    logo: (s = 48) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#DA291C" /><text x="24" y="33" textAnchor="middle" fontSize="24" fontWeight="900" fill="#FFC72C" fontFamily="Arial Black,Arial">M</text></svg>,
  },
  {
    id: "starbucks", name: "Starbucks", cat: "Food & Beverage", earnRate: 1.5, pointValueIDR: 120, unit: "Stars", active: true,
    logo: (s = 48) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#00704A" /><circle cx="24" cy="24" r="11" stroke="white" strokeWidth="2" fill="none" /><path d="M24 14 L25.8 20.8 L32 20.8 L27 24.8 L28.8 31.5 L24 27.5 L19.2 31.5 L21 24.8 L16 20.8 L22.2 20.8 Z" fill="white" /></svg>,
  },
  {
    id: "kfc", name: "KFC", cat: "Food & Beverage", earnRate: 0.8, pointValueIDR: 40, unit: "Points", active: true,
    logo: (s = 48) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#E4002B" /><text x="24" y="30" textAnchor="middle" fontSize="14" fontWeight="900" fill="white" fontFamily="Arial">KFC</text></svg>,
  },
  {
    id: "wendys", name: "Wendy's", cat: "Food & Beverage", earnRate: 0.9, pointValueIDR: 45, unit: "Points", active: true,
    logo: (s = 48) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#E2231A" /><text x="24" y="32" textAnchor="middle" fontSize="22" fontWeight="900" fill="white" fontFamily="Arial">W</text></svg>,
  },
  {
    id: "subway", name: "Subway", cat: "Food & Beverage", earnRate: 0.7, pointValueIDR: 35, unit: "Tokens", active: true,
    logo: (s = 48) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#009B3A" /><text x="24" y="29" textAnchor="middle" fontSize="13" fontWeight="900" fill="#FFC600" fontFamily="Arial">SUB</text></svg>,
  },
  {
    id: "dominos", name: "Domino's", cat: "Food & Beverage", earnRate: 0.8, pointValueIDR: 40, unit: "Points", active: true,
    logo: (s = 48) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#006491" /><rect x="11" y="14" width="11" height="20" rx="3" fill="#E31837" /><rect x="26" y="14" width="11" height="20" rx="3" fill="white" /><circle cx="16.5" cy="24" r="2.5" fill="white" /><circle cx="31.5" cy="18" r="2.5" fill="#006491" /><circle cx="31.5" cy="30" r="2.5" fill="#006491" /></svg>,
  },
  {
    id: "pizzahut", name: "Pizza Hut", cat: "Food & Beverage", earnRate: 0.9, pointValueIDR: 45, unit: "Points", active: true,
    logo: (s = 48) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#EE3124" /><path d="M24 10 L38 34 H10 Z" fill="white" opacity=".9" /><rect x="14" y="32" width="20" height="6" rx="2" fill="white" opacity=".9" /></svg>,
  },
  {
    id: "gopay-food", name: "GoPay Food", cat: "Food & Beverage", earnRate: 2.0, pointValueIDR: 200, unit: "GoPoin", active: true,
    logo: (s = 48) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#00AED6" /><text x="24" y="30" textAnchor="middle" fontSize="12" fontWeight="800" fill="white" fontFamily="Arial">GOFOOD</text></svg>,
  },

  // Hotels
  {
    id: "hilton", name: "Hilton", cat: "Hotels", earnRate: 10, pointValueIDR: 800, unit: "Points", active: true,
    logo: (s = 48) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#003087" /><text x="24" y="32" textAnchor="middle" fontSize="20" fontWeight="700" fill="white" fontFamily="Georgia,serif">H</text></svg>,
  },
  {
    id: "marriott", name: "Marriott", cat: "Hotels", earnRate: 10, pointValueIDR: 750, unit: "Points", active: true,
    logo: (s = 48) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#8A0000" /><text x="24" y="32" textAnchor="middle" fontSize="20" fontWeight="700" fill="white" fontFamily="Georgia,serif">M</text></svg>,
  },
  {
    id: "accor", name: "Accor", cat: "Hotels", earnRate: 8, pointValueIDR: 650, unit: "Points", active: true,
    logo: (s = 48) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#C8102E" /><text x="24" y="30" textAnchor="middle" fontSize="12" fontWeight="700" fill="white" fontFamily="Arial">ACCOR</text></svg>,
  },
  {
    id: "ihg", name: "IHG", cat: "Hotels", earnRate: 9, pointValueIDR: 700, unit: "Points", active: false,
    logo: (s = 48) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#004B8D" /><text x="24" y="30" textAnchor="middle" fontSize="15" fontWeight="800" fill="white" fontFamily="Arial">IHG</text></svg>,
  },

  // Travel
  {
    id: "garuda", name: "Garuda", cat: "Travel", earnRate: 5, pointValueIDR: 500, unit: "Miles", active: true,
    logo: (s = 48) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#00539B" /><path d="M8 28 Q24 10 40 28" stroke="white" strokeWidth="3" fill="none" /><circle cx="24" cy="28" r="4" fill="white" /></svg>,
  },
  {
    id: "airasia", name: "AirAsia", cat: "Travel", earnRate: 3, pointValueIDR: 300, unit: "Points", active: true,
    logo: (s = 48) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#E4002B" /><text x="24" y="29" textAnchor="middle" fontSize="10" fontWeight="900" fill="white" fontFamily="Arial">AIRASIA</text></svg>,
  },
  {
    id: "traveloka", name: "Traveloka", cat: "Travel", earnRate: 4, pointValueIDR: 400, unit: "Points", active: true,
    logo: (s = 48) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#0062CC" /><text x="24" y="29" textAnchor="middle" fontSize="9" fontWeight="700" fill="white" fontFamily="Arial">TRAVELOKA</text></svg>,
  },

  // Retail
  {
    id: "indomaret", name: "Indomaret", cat: "Retail", earnRate: 0.5, pointValueIDR: 25, unit: "Points", active: true,
    logo: (s = 48) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#E31E24" /><text x="24" y="28" textAnchor="middle" fontSize="9" fontWeight="800" fill="white" fontFamily="Arial">INDOMARET</text></svg>,
  },
  {
    id: "alfamart", name: "Alfamart", cat: "Retail", earnRate: 0.5, pointValueIDR: 25, unit: "Points", active: true,
    logo: (s = 48) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#E31E24" /><text x="24" y="28" textAnchor="middle" fontSize="9" fontWeight="800" fill="white" fontFamily="Arial">ALFAMART</text></svg>,
  },
  {
    id: "shopee", name: "Shopee", cat: "Retail", earnRate: 1.5, pointValueIDR: 100, unit: "Coins", active: true,
    logo: (s = 48) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#FF5722" /><text x="24" y="30" textAnchor="middle" fontSize="11" fontWeight="800" fill="white" fontFamily="Arial">SHOPEE</text></svg>,
  },
  {
    id: "tokopedia", name: "Tokopedia", cat: "Retail", earnRate: 1.5, pointValueIDR: 100, unit: "Points", active: false,
    logo: (s = 48) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#42B549" /><text x="24" y="28" textAnchor="middle" fontSize="8" fontWeight="800" fill="white" fontFamily="Arial">TOKOPEDIA</text></svg>,
  },

  // Finance
  {
    id: "bca", name: "BCA", cat: "Finance", earnRate: 2, pointValueIDR: 200, unit: "Points", active: true,
    logo: (s = 48) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#005BAC" /><text x="24" y="30" textAnchor="middle" fontSize="16" fontWeight="800" fill="white" fontFamily="Arial">BCA</text></svg>,
  },
  {
    id: "mandiri", name: "Mandiri", cat: "Finance", earnRate: 2, pointValueIDR: 200, unit: "Points", active: true,
    logo: (s = 48) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#003D82" /><text x="24" y="28" textAnchor="middle" fontSize="9" fontWeight="700" fill="white" fontFamily="Arial">MANDIRI</text></svg>,
  },
  {
    id: "gopay", name: "GoPay", cat: "Finance", earnRate: 3, pointValueIDR: 300, unit: "GoPoin", active: true,
    logo: (s = 48) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#00AED6" /><text x="24" y="29" textAnchor="middle" fontSize="11" fontWeight="800" fill="white" fontFamily="Arial">GoPay</text></svg>,
  },
  {
    id: "ovo", name: "OVO", cat: "Finance", earnRate: 2.5, pointValueIDR: 250, unit: "Points", active: true,
    logo: (s = 48) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#4C3494" /><text x="24" y="30" textAnchor="middle" fontSize="16" fontWeight="800" fill="white" fontFamily="Arial">OVO</text></svg>,
  },
];
