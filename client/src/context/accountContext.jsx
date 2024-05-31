import { createContext, useState, useContext, useEffect } from 'react';
import {
  getAccountRequest,
  getAllAccountsRequest,
  deleteAccountRequest,
  updateAccountRequest,
} from '../api/account';
import { addUserRequest } from '../api/users';
import { 
  addCreditRequest,
  getAllCreditRequests,
  getCreditAnalyticsRequest,
} from '../api/credit-request';

const AccountContext = createContext();

export const useAccounts = () => {
  const context = useContext(AccountContext);
  if (!context)
    throw new Error('useAccounts must be used within a AccountProvider');
  return context;
};

export function AccountProvider({children}) {
  const [adminRole, setAdminRole] = useState(false);
  const [userCompleted, setUserCompleted] = useState(false);
  const [errors, setErrors] = useState([]);

  const [allAccounts, setAccounts] = useState([]);
  const [account, setAccount] = useState({});

  const [userInfo, setUserInfo] = useState({});
  const [allCreditPetitions, setCreditPetitions] = useState([]);

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
          console.log(res.data.message);
          if (res.data.admin === true) {
            setAdminRole(true);
          } else {
            setAdminRole(false);
          }
          if (res.data.message.disabled === false) {
            setUserCompleted(true);
          } else {
            setUserCompleted(false);
          }
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

  const addUser = async (user) => {
    try {
      const res = await addUserRequest(user);
      setUserInfo(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
      console.log(error);
      if (!error.response.data) {
        return setErrors(['No Server Response']);
      } else if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const addCredit = async (credit) => {
    try {
      const res = await addCreditRequest(credit);
      console.log(res.data);
    } catch (error) {
      console.error(error);
      if (!error.response.data) {
        return setErrors(['No Server Response']);
      } else if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const getAllCredit = async () => {
    try {
      const res = await getAllCreditRequests();
      setCreditPetitions(res.data.message);
    } catch (error) {
      console.error(error);
    }
  }

  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <AccountContext.Provider
      value={{
        adminRole,
        userCompleted,
        errors,

        allAccounts,
        account,
        getAccount,
        getAllAccounts,
        updateAccount,
        deleteAccount,

        userInfo,
        addUser,
        
        allCreditPetitions,
        addCredit,
        getAllCredit,

      }}
    >
      {children}
    </AccountContext.Provider>
  );
}
