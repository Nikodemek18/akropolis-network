// tslint:disable:max-line-length
export default {
  shared: {
    menu: {
      myCashflows: 'My cashflows',
      marketplace: 'Marketplace',
    },
    pagination: {
      itemsPerPage: 'Items per page',
      currentPagination: '%{from} - %{to} of %{total}',
    },
    validation: {
      isRequired: 'Field is required',
      moreThen: 'Should be more then %{value}',
      moreThenOrEqual: 'Should be more then or equal %{value}',
      lessThenOrEqual: 'Should be less then or equal %{value}',
      invalidWalletAddress: 'Invalid wallet address',
      notDefault: 'Value must be different from initial',
      maxStringLength: 'Text should be less then %{max} letters',
      allowedCharactersForDaoName: 'Name should contain only english letters and numbers',
      onEnglishPlease: 'Should contain only english letters and numbers',
      isUsedDaoName: 'Co-op with that name already exists',
      notEnoughDai: 'Not enough dai',
    },
    pageNotFound: 'We can’t find this page',
    copiedAtClipboard: 'Copied at clipboard',
    cancel: 'Cancel',
    retry: 'Retry',
    noEthereumConnection: 'No connection to the Rinkeby Test Network',
    noEthereumAccounts: 'We can\'t find any Ethereum accounts! Please check and make sure Metamask or your browser are pointed at the correct network and your account is unlocked.',
    needUseMetamask: 'This browser has no connection to the Rinkeby Test Network. Please use the Chrome/FireFox extension MetaMask, or dedicated Ethereum browsers Mist or Parity.',
    makeSureUseKovan: 'Please make sure you are using Rinkeby Test Network when connecting your Metamask',
    somethingWentWrong: 'Oh. Something went wrong.',
    new: 'New',
    join: 'Join',
    to: 'to',
    from: 'from',
    no: 'No',
    yes: 'Yes',
    you: 'You',
    done: 'Done',
    waiting: 'Waiting',
    daysAmount: '%{smart_count} day |||| %{smart_count} days',
    dao: {
      goal: 'Goal',
      balance: 'Balance',
      members: 'Members',
    },
  },
  components: {
    fund: {
      commissionLabel: 'Commission',
      policyLabel: 'Policy',
    },
  },
  features: {
    signIn: {
      button: 'Connect to %{address}',
      logout: 'Log out',
      connectToWallet: 'Connect a wallet',
      givePermission: 'Give permission',
      metamaskDescription: 'Metamask allows Web 3.0 applications to interact with Ethereum blockchain and leaves you in full control over every transaction',
      confirmModal: {
        title: 'Confirm your address',
        beforeAddressDescription: 'You’re signing in with the following address:',
        afterAddressDescription: 'To verify your ownership of this address, we\'ll ask you to sign a confirmation message. Click the Confirm button to continue. If this isn’t the address you’d like to connect to C2FC 0xchanger, click Cancel and select a different address from the wallet menu.',
        buttons: {
          cancel: 'Cancel',
          confirm: 'Confirm',
        },
      },
      permissions: {
        title: 'Please authorise Cashflow Relay to perform these operations:',
        createCashflows: 'Create cashflows',
        sellCashflows: 'Sell cashflows',
        payInstalments: 'Pay instalments from your wallet',
        stakeTokens: 'Stake AKT tokens',
        buyCashflows: 'Buy cashflows',
      },
    },
    createDao: {
      fields: {
        domainName: 'Name',
        goal: 'Goal',
        description: 'Description',
      },
      form: {
        title: 'Create co-op',
        submit: 'Create',
        cancel: 'Cancel',
      },
      createButton: 'Create co-op',
      errorTitle: 'Oh. Something went wrong.',
      progress: {
        title: 'Sign transactions',
        tokenTitle: 'Token creation',
        coopTitle: 'Co-op creation',
        description: 'Your wallet should open and you need to sign two transactions, one after another.',
      },
    },
    voting: {
      transfer: 'transfer',
      join: 'join',
      open: 'Open',
      close: 'Close',
      enable: 'Enable',
      disable: 'Disable',
      timeLeft: 'time left',
      timeEnded: 'Ended',
      voted: 'voted',
      needed: 'needed',
      reason: 'Reason',
      deposit: 'Deposit',
      approved: 'Approved',
      declined: 'Declined',
      executeVote: 'Execute voting',
      waitingForExecution: 'Waiting for execution',
    },
    members: {
      address: 'Address',
      balance: 'Balance',
      deposit: 'Deposit',
      withdraw: 'Withdraw',
    },
    joinToCooperative: {
      button: 'Join to Coop',
      fields: {
        reason: 'Reason',
      },
      form: {
        title: 'Join',
        cancel: 'Cancel',
        submit: 'join',
      },
    },
    requestWithdraw: {
      button: 'Request',
      fields: {
        amount: 'Amount',
        reason: 'Reason',
      },
      form: {
        title: 'Request',
        cancel: 'Cancel',
        submit: 'Request',
      },
    },
    requestDeposit: {
      button: 'Deposit',
      fields: {
        amount: 'Amount',
      },
      form: {
        title: 'Deposit',
        cancel: 'Cancel',
        submit: 'Deposit',
        hint: 'Tokens may require a pretransaction to approve the Finance app for your deposit.',
      },
    },
    cooperativeOverview: {
      cooperativeBalance: 'Co-op Balance',
      cooperativeGoal: 'Co-op Goal',
      personalInformation: 'Personal Information',
      balance: 'Balance',
      earn: 'Earn',
      earnHint: 'The earnings of the Co-op are distributed proportionally among its members.',
      forMembers: 'For members',
      accessToLoan: 'Access to loan',
      accessToInsurance: 'Access to social insurance',
      accessToLoanHint: 'Make regular contributions, and you will be able to get access to loans',
      accessToInsuranceHint: 'Make regular contributions, and you will be able to get access to insurance',
    },
    deFiAccount: {
      actionsDescription: {
        enabled: 'DeFi products integrations are available only from special DeFi account',
        disabled: 'DeFi products integrations are available only from special DeFi account. Please Open DeFi account to enable DeFi integrations',
      },
      actions: {
        enable: 'Open',
        deposit: 'Deposit',
        withdraw: 'Withdraw',
        transfer: 'Transfer',
      },
      fields: {
        amount: 'Amount',
        reason: 'Reason',
      },
      formTitles: {
        deposit: 'Transfer from Co-op vault to DeFi account',
        withdraw: 'Transfer from DeFi account to Co-op vault',
      },
      metrics: {
        balance: 'DeFi account',
        supplied: 'Supplied',
      },
    },
    investments: {
      balance: 'balance',
      earned: 'earned',
      waiting: 'Coming soon',
      enable: 'Enable',
      withdraw: 'Withdraw',
      supply: 'Supply',
      transfer: 'Transfer',
      fields: {
        amount: 'Amount',
      },
      withdrawModalTitle: {
        compound: 'Transfer from Compound to DeFi account',
        set: 'Transfer from Set to DeFi account',
        uma: 'Transfer from UMA to DeFi account',
        dharma: 'Transfer from Dharma to DeFi account',
        melonport: 'Transfer from Melonport to DeFi account',
      },
      supplyModalTitle: {
        compound: 'Transfer from DeFi account to Compound',
        set: 'Transfer from DeFi account to Set',
        uma: 'Transfer from DeFi account to UMA',
        dharma: 'Transfer from DeFi account to Dharma',
        melonport: 'Transfer from DeFi account to Melonport',
      },
      categories: {
        saving: 'saving',
        investment: 'investments',
        credit: 'credit',
      },
      descriptions: {
        compound: 'Supply money to compound and earn interest',
        set: 'Invest in set-and-forget auto-rebalancing strategies',
        uma: 'Buy S&500 index supported by UMA Protocol',
        dharma: 'Lend money to Dharma Protocol and earn 14% APR',
        melonport: 'Delegate investment management to a professional',
      },
      needEnableDescription: {
        compound: 'Before supplying DAI for the first time, Co-op must enable Compound.',
        set: '',
        uma: '',
        dharma: '',
        melonport: '',
      },
    },
  },
  documents: {},
  modules: {
    marketplace: {
      fundsMarketplace: 'Funds marketplace',
      YouAreInThisFund: 'You’re in this fond',
    },
    daos: {
      overview: 'Co-op Overview',
      activities: 'Activities',
      members: 'Members',
      products: 'DeFi Products',
      history: 'History',
      balance: 'Balance',
      withdraw: 'Withdraw',
      deFi: 'DeFi',
      request: 'Request',
      deposit: 'Deposit',
    },
  },
  services: {
    dataProvider: {
      showMoreButton: 'Show more',
    },
    user: {
      connectedToMetamask: 'Connected to Metamask',
      walletAddress: 'Wallet address',
    },
    notifications: {
      title: {
        addMinter: 'Pending add minter',
        addMinterSuccess: 'Add minter succes',
        addMinterFail: 'Add minter fail',
        createCashFlow: 'Transaction pending. You will be notified of the transaction outcome once it\'s complete.',
        createCashFlowSuccess: 'Cashflow created. Place it on the marketplace.',
        createCashFlowFail: 'Technical error, e.g. out of gas (Repeat metamask operation). Suggest to repeat the operation.',
        sellCashflow: 'Transaction pending.',
        sellCashflowSuccess: 'Order created.',
        sellCashflowFail: 'Technical error, e.g. out of gas (Repeat metamask operation).',
        buyCashflow: 'Transaction pending.',
        buyCashflowSuccess: 'Cashflow purchased.',
        buyCashflowFail: 'Not enough funds.',
        userPayInstallment: 'Transaction pending.',
        userPayInstallmentSuccess: 'Instalment paid',
        userPayInstallmentFail: 'Not enough funds.',
        withdrawCashFlow: 'Transaction pending',
        withdrawCashFlowSuccess: 'Withdrawing successful',
        withdrawCashFlowFail: 'Withdrawing failed',
        withdrawStake: 'Transaction pending',
        withdrawStakeSuccess: 'Withdrawing stake successful',
        withdrawStakeFail: 'Withdrawing stake failed',
      },
      description: {
        addMinter: '',
        addMinterSuccess: '',
        addMinterFail: '',
        createCashFlow: '%{txHash}',
        createCashFlowSuccess: '%{txHash}',
        createCashFlowFail: '%{txHash}',
        sellCashflow: 'You will be notified of the transaction outcome once it\'s complete.',
        sellCashflowSuccess: 'Wait for investors.',
        sellCashflowFail: 'Suggest to repeat the operation.',
        buyCashflow: 'You will be notified of the transaction outcome once it\'s complete.',
        buyCashflowSuccess: '',
        buyCashflowFail: 'Deposit funds on your wallet or your reputation/score will be decreased Top-up.',
        userPayInstallment: 'You will be notified of the transaction outcome once it\'s complete.',
        userPayInstallmentSuccess: '',
        userPayInstallmentFail: 'Deposit funds on your wallet or your reputation/score will be decreased. Top-up',
        withdrawCashFlow: 'You will be notified of the transaction outcome once it\'s complete.',
        withdrawCashFlowSuccess: '',
        withdrawCashFlowFail: 'Deposit funds on your wallet or your reputation/score will be decreased. Top-up',
        withdrawStake: 'You will be notified of the transaction outcome once it\'s complete.',
        withdrawStakeSuccess: '',
        withdrawStakeFail: '',
      },
    },
  },
};
