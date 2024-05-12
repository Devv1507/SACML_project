import { createContext, useState, useContext, useEffect } from 'react';
import {
  getAccountRequest,
  getAllAccountsRequest,
  deleteAccountRequest,
  updateAccountRequest,
} from '../api/account';

const AccountContext = createContext();

export const useAccounts = () => {
  const context = useContext(AccountContext);
  if (!context)
    throw new Error('useAccounts must be used within a AccountProvider');
  return context;
};

export function AccountProvider() {
  const [accounts, setAccounts] = useState([]);

  const getAllAccounts = async () => {
    const res = await getAllAccountsRequest();
    setAccounts(res.data);
  };

  const deleteAccount = async (id) => {
    try {
      const res = await deleteAccountRequest(id);
      if (res.status === 204)
        setAccounts(accounts.filter((account) => account.id !== id)); //?????
    } catch (error) {
      console.log(error);
    }
  };
  // Consider to change to use id param
  const getAccount = async (account) => {
    try {
      const res = await getAccountRequest(account);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateAccount = async (id, account) => {
    try {
      await updateAccountRequest(id, account);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AccountContext.Provider
      value={{
        accounts,
        getAccount,
        getAllAccounts,
        updateAccount,
        deleteAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}
