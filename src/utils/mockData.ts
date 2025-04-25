export const mockAnalysisData = {
  sourceWalletFunding: [
    {
      fromAddress: 'HN7cABqLq46Es1jh92dQQisAq662SmxGtNdMnq4PTAxh',
      amount: 245.32,
      timestamp: '2024-03-01T14:23:15Z',
      type: 'Unknown Source'
    },
    {
      fromAddress: 'Binance Hot Wallet',
      amount: 500.00,
      timestamp: '2024-03-05T09:12:45Z',
      type: 'Exchange Withdrawal'
    },
    {
      fromAddress: 'Magic Eden',
      amount: 32.45,
      timestamp: '2024-03-10T16:48:22Z',
      type: 'NFT Sale'
    }
  ],
  exchangeOutflows: [
    {
      exchange: 'Binance',
      transactions: [
        {
          toAddress: 'KxP8nABq2dQ9isAq662SmxGtNdMnq4PTAxhHN7cL46E',
          amount: 25.5,
          timestamp: '2024-03-15T10:22:18Z',
          suspicious: true,
          pattern: 'Layering'
        },
        {
          toAddress: '9xQFa1DCYkaAnW1z58zpHVABmiZXGHC9mMnmb2NKbvY1',
          amount: 18.2,
          timestamp: '2024-03-15T10:24:33Z',
          suspicious: true,
          pattern: 'Structuring'
        }
      ]
    },
    {
      exchange: 'Kraken',
      transactions: [
        {
          toAddress: 'L9RtEjtqBFHZQNYzQGcziYK3epPDw4V6X4HWbBjESjy',
          amount: 42.8,
          timestamp: '2024-03-16T15:42:11Z',
          suspicious: true,
          pattern: 'Mixing'
        }
      ]
    }
  ],
  wallets: [
    {
      address: '5SGn9JZLyvCF7nXPsHtfXjvrRuBmDDQmgM24AHyKZvEM',
      label: 'Source Wallet',
      type: 'personal',
      balance: 124.85,
      firstSeen: '2023-04-12',
      txCount: 67,
      riskScore: 35
    },
    {
      address: 'CEzN7mqP9xoxn2HdyW6fjEJ73t7qaX9Rp4iQKR2kPwD',
      label: 'Binance Hot Wallet',
      type: 'exchange',
      balance: 24985.32,
      firstSeen: '2022-08-24',
      txCount: 14563,
      riskScore: 20
    },
    {
      address: '3SZ7dpXCJcest95Axr9Nc1xJBnZ9fWNfNgq1Z678XUdR',
      label: 'Unknown Wallet 1',
      type: 'personal',
      balance: 286.12,
      firstSeen: '2023-08-05',
      txCount: 43,
      riskScore: 65
    },
    {
      address: '7tT1AyFZDPn7y6gLo6VRGxRDRbmEsF8cyiuxynfG9hRG',
      label: 'Coinbase',
      type: 'exchange',
      balance: 18742.45,
      firstSeen: '2022-05-18',
      txCount: 23651,
      riskScore: 15
    },
    {
      address: '9xQFa1DCYkaAnW1z58zpHVABmiZXGHC9mMnmb2NKbvY1',
      label: 'Unknown Wallet 2',
      type: 'personal',
      balance: 542.78,
      firstSeen: '2023-10-30',
      txCount: 28,
      riskScore: 85
    },
    {
      address: 'FW7tgYP7NXM1h3NVt9oYQBS21oPYKZN1aXadsk9AviZ',
      label: 'Kraken',
      type: 'exchange',
      balance: 9874.32,
      firstSeen: '2022-12-04',
      txCount: 8954,
      riskScore: 20
    },
    {
      address: '2ZJzKfWyf3bwgRsKxmWGxGkVouhfsySi2XJiTzUdfuW8',
      label: 'Unknown Wallet 3',
      type: 'personal',
      balance: 178.65,
      firstSeen: '2024-01-15',
      txCount: 19,
      riskScore: 75
    },
    {
      address: 'Dw4V6X4HWbBjESjy3L9RtEjtqBFHZQNYzQGcziYK3epP',
      label: 'OKX',
      type: 'exchange',
      balance: 7458.94,
      firstSeen: '2022-09-28',
      txCount: 6521,
      riskScore: 25
    },
    {
      address: 'J6ASWzCZRHnEZKJfEgKKzA9KVhb7JKQecz8yd8UzZadK',
      label: 'Unknown Wallet 4',
      type: 'personal',
      balance: 94.23,
      firstSeen: '2024-02-20',
      txCount: 12,
      riskScore: 90
    }
  ],
  transactions: [
    {
      hash: '2UcUWdH7yNDnf7Dm1fFpHFNVfsXHbLKyNJxbTzymSjnNaT2L7UeCsSBuacjtmn7dp8iWALcke6MtFdNfCc8mYzWP',
      fromWallet: '5SGn9JZLyvCF7nXPsHtfXjvrRuBmDDQmgM24AHyKZvEM',
      toWallet: '3SZ7dpXCJcest95Axr9Nc1xJBnZ9fWNfNgq1Z678XUdR',
      toWalletType: 'personal',
      amount: 35.6,
      time: '2024-06-15 14:32:09',
      type: 'transfer',
      success: true,
      isLaundering: false
    },
    {
      hash: '5aGn4nY6Z78m9Vx3sTpLqRtKwFbHcDYjiMq45AHzKZn2W',
      fromWallet: '3SZ7dpXCJcest95Axr9Nc1xJBnZ9fWNfNgq1Z678XUdR',
      toWallet: '9xQFa1DCYkaAnW1z58zpHVABmiZXGHC9mMnmb2NKbvY1',
      toWalletType: 'personal',
      amount: 30.2,
      time: '2024-06-15 16:45:23',
      type: 'transfer',
      success: true,
      isLaundering: true
    },
    {
      hash: '3rKpW7Lj8nXv6B9zYq2mFeNXApHsZ4KyCvWx1Q5TbRdS',
      fromWallet: '9xQFa1DCYkaAnW1z58zpHVABmiZXGHC9mMnmb2NKbvY1',
      toWallet: '2ZJzKfWyf3bwgRsKxmWGxGkVouhfsySi2XJiTzUdfuW8',
      toWalletType: 'personal',
      amount: 15.8,
      time: '2024-06-17 09:12:45',
      type: 'transfer',
      success: true,
      isLaundering: true
    },
    {
      hash: '4tNcH8Dq2kXeRv5AyPb3GzWrLuBmJFQmzN74SHxKZtEM',
      fromWallet: '2ZJzKfWyf3bwgRsKxmWGxGkVouhfsySi2XJiTzUdfuW8',
      toWallet: 'CEzN7mqP9xoxn2HdyW6fjEJ73t7qaX9Rp4iQKR2kPwD',
      toWalletType: 'exchange',
      amount: 10.5,
      time: '2024-06-18 11:38:29',
      type: 'deposit',
      success: true,
      isLaundering: true
    },
    {
      hash: '6aGnW7Lj8nXv6B9zYq2mFeNXApHsZ4KyCvWx1Q5TbRdS',
      fromWallet: '9xQFa1DCYkaAnW1z58zpHVABmiZXGHC9mMnmb2NKbvY1',
      toWallet: 'J6ASWzCZRHnEZKJfEgKKzA9KVhb7JKQecz8yd8UzZadK',
      toWalletType: 'personal',
      amount: 8.5,
      time: '2024-06-17 09:45:12',
      type: 'transfer',
      success: true,
      isLaundering: false
    },
    {
      hash: '7tT1AyFZDPn7y6gLo6VRGxRDRbmEsF8cyiuxynfG9hRG',
      fromWallet: 'J6ASWzCZRHnEZKJfEgKKzA9KVhb7JKQecz8yd8UzZadK',
      toWallet: '7tT1AyFZDPn7y6gLo6VRGxRDRbmEsF8cyiuxynfG9hRG',
      toWalletType: 'exchange',
      amount: 5.8,
      time: '2024-06-17 10:32:45',
      type: 'deposit',
      success: true,
      isLaundering: true
    },
    {
      hash: '9zYfBq2jRvW5Nx3mHcA8GzLrDuCmKFQxzN64VHwJZpFM',
      fromWallet: '5SGn9JZLyvCF7nXPsHtfXjvrRuBmDDQmgM24AHyKZvEM',
      toWallet: 'FW7tgYP7NXM1h3NVt9oYQBS21oPYKZN1aXadsk9AviZ',
      toWalletType: 'exchange',
      amount: 45.3,
      time: '2024-06-14 15:12:48',
      type: 'deposit',
      success: true,
      isLaundering: false
    },
    {
      hash: '2KcRw6Dq2kXeRv5AyPb3GzWrLuBmJFQmzN74SHxKZtEM',
      fromWallet: '5SGn9JZLyvCF7nXPsHtfXjvrRuBmDDQmgM24AHyKZvEM',
      toWallet: 'Dw4V6X4HWbBjESjy3L9RtEjtqBFHZQNYzQGcziYK3epP',
      toWalletType: 'exchange',
      amount: 20.7,
      time: '2024-06-13 09:54:31',
      type: 'deposit',
      success: true,
      isLaundering: false
    }
  ]
};