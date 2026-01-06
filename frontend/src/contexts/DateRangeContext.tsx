import { createContext, useContext, useState, ReactNode } from "react";
import { DateRange } from "react-day-picker";

interface DateRangeContextType {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
}

const DateRangeContext = createContext<DateRangeContextType | undefined>(undefined);

export function DateRangeProvider({ children }: { children: ReactNode }) {
  // Por padrão, mês atual até o dia atual
  const now = new Date();
  const defaultFrom = new Date(now.getFullYear(), now.getMonth(), 1); // Primeiro dia do mês
  const defaultTo = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Dia atual

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: defaultFrom,
    to: defaultTo,
  });

  return (
    <DateRangeContext.Provider value={{ dateRange, setDateRange }}>
      {children}
    </DateRangeContext.Provider>
  );
}

export function useDateRange() {
  const context = useContext(DateRangeContext);
  if (context === undefined) {
    throw new Error("useDateRange must be used within a DateRangeProvider");
  }
  return context;
}

