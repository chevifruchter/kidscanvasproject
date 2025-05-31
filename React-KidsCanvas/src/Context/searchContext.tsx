import { createContext, useContext, useState, ReactNode } from 'react';

export type SearchContextType = {
    searchValue: string;
    setSearchValue: (value: string) => void;
};

export const SearchContext = createContext<SearchContextType>({ 
      searchValue: '',
      setSearchValue: () => {},
});

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [searchVal, setnewSearchValue] = useState<string>('');
    const setSearchValue = (searchVal: string) => {
        setnewSearchValue(searchVal);   
    };
    return (
        <SearchContext.Provider value={{ searchValue: searchVal, setSearchValue }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};