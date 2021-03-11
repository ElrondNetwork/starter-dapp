import React, { useEffect } from 'react';
import { useContext, useDispatch } from 'context';
import Delegation from './Delegation';
import PendingUndelegated from './PendingUndelegated';
import { Redirect } from 'react-router-dom';
import Overview from 'components/Overview';
import { Address } from '@elrondnetwork/erdjs/out';
import { AccountType } from 'helpers/contractDataDefinitions';

const Dashboard = () => {
  const { loggedIn, dapp, address } = useContext();
  const dispatch = useDispatch();

  if (!loggedIn) {
    return <Redirect to="/" />;
  }

  const fetchAccount = () => {
    dapp.proxy.getAccount(new Address(address)).then(account => {
      dispatch({
        type: 'setAccount',
        account: new AccountType(account.balance.toString(), account.nonce),
      });
    });
  };
  useEffect(fetchAccount, []);

  return (
    <div className="dashboard w-100">
      <div className="card border-0">
        <Overview />
        <div className="card-body pt-0 px-spacer pb-spacer">
          <Delegation />
          <PendingUndelegated />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
