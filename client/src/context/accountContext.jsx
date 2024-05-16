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

export function AccountProvider({children}) {
  const [allAccounts, setAccounts] = useState([]);
  const [account, setAccount] = useState({});
  const [adminRole, setAdminRole] = useState(false);
  const [userCompleted, setUserCompleted] = useState(false);

  const getAllAccounts = async () => {
    try {
      const res = await getAllAccountsRequest();
      setAccounts(res.data.message);
    } catch (error) {
      console.error(error);
    }
  };
    // Consider to change to use id param
    const getAccount = async () => {
        try {
          const res = await getAccountRequest();
          setAccount(res.data.message);
          if (res.data.admin === true) {
            return setAdminRole(true);
          }
          if (res.data.message.disabled === false){
            setUserCompleted(true);
          }
          setAdminRole(false);
        } catch (error) {
          console.error(error);
        }
      };

  const deleteAccount = async (id) => {
    try {
      const res = await deleteAccountRequest(id);
      if (res.status === 204)
        setAccounts(allAccounts.filter((account) => account.id !== id)); //?????
    } catch (error) {
      console.log(error);
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
        allAccounts,
        account,
        adminRole,
        userCompleted,
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
