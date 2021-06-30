const PairAbi = require('./artifacts/pair-abi.json')
const UniswapFactoryAbi = require('./artifacts/uniswap-pair-factory-abi.json')
const DxswapFactoryAbi = require('./artifacts/dxswap-pair-factory-abi.json')

const INITIAL_TIMEFRAME = () => ({ start: '01-04-2021', end: '21-05-2021' })
const INTERVAL = (60 / 2) * 60 * 24 * 7

const createGetCreatedAt = (FactoryAbi) => (factoryAddress, factoryCreatedAt) => async (
  web3,
  pairToken
) => {
  const pairContract = new web3.eth.Contract(PairAbi, pairToken)
  const token0 = await pairContract.methods.token0().call()
  const token1 = await pairContract.methods.token1().call()
  const factory = new web3.eth.Contract(FactoryAbi, factoryAddress)
  const storedPair = await factory.methods.getPair(token0, token1).call()
  if (storedPair.toLowerCase() !== pairToken.toLowerCase()) {
    throw new Error(
      `factory mismatch; factory: ${factoryAddress}; pairToken: ${pairToken}; storedPair: ${storedPair}`
    )
  }
  let events
  let i = 0
  do {
    events = await factory.getPastEvents('PairCreated', {
      filter: { token0, token1 },
      fromBlock: factoryCreatedAt + i * INTERVAL,
      toBlock: factoryCreatedAt + INTERVAL * (i + 1) - 1
    })
    i++
    console.log(`pairToken: ${pairToken} (${i})`)
  } while (events.length === 0)
  return events[0].blockNumber
}

const uniswapCreatedAt = createGetCreatedAt(UniswapFactoryAbi)
const dxswapCreatedAt = createGetCreatedAt(DxswapFactoryAbi)

module.exports = {
  // farm addresses to be ignored from the airdrop
  blacklistedAddresses: [],
  tokens: [
    {
      airdrop: 12500,
      timeframe: INITIAL_TIMEFRAME(),
      getCreatedAt: uniswapCreatedAt('0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32', 4931780),
      // top 30 quickswap pairs by liquidity (30-06-2021 11:45 UTC)
      tokens: [
        {
          address: '0xdc9232e2df177d7a12fdff6ecbab114e2231198d',
          weight: 114452064,
          createdAt: 6214591
        },
        {
          address: '0x160532d2536175d65c03b97b0630a9802c274dad',
          weight: 102466349,
          createdAt: 14026112
        },
        {
          address: '0x853ee4b2a13f8a742d64c8f088be7ba2131f670d',
          weight: 100236436,
          createdAt: 5493468
        },
        {
          address: '0x2cf7252e74036d1da831d11089d326296e64a728',
          weight: 91988366,
          createdAt: 5517803
        },
        {
          address: '0xadbf1854e5883eb8aa7baf50705338739e558e5b',
          weight: 70682578,
          createdAt: 5535052
        },
        {
          address: '0xf6422b997c7f54d1c6a6e103bcb1499eea0a7046',
          weight: 53944656,
          createdAt: 5645376
        },
        {
          address: '0xf6a637525402643b0654a54bead2cb9a83c8b498',
          weight: 53830486,
          createdAt: 6694301
        },
        {
          address: '0xf04adbf75cdfc5ed26eea4bbbb991db002036bdd',
          weight: 52032854,
          createdAt: 5515533
        },
        {
          address: '0x6e7a5fafcec6bb1e78bae2a1f0b612012bf14827',
          weight: 43936380,
          createdAt: 5498091
        },
        {
          address: '0x90bc3e68ba8393a3bf2d79309365089975341a43',
          weight: 32340220,
          createdAt: 13431708
        },
        {
          address: '0x4a35582a710e1f4b2030a3f826da20bfb6703c09',
          weight: 32160484,
          createdAt: 5496392
        },
        {
          address: '0x5ca6ca6c3709e1e6cfe74a50cf6b2b6ba2dadd67',
          weight: 28999500,
          createdAt: 11675905
        },
        {
          address: '0x019ba0325f1988213d448b3472fa1cf8d07618d7',
          weight: 22262618,
          createdAt: 5528407
        },
        {
          address: '0x59153f27eefe07e5ece4f9304ebba1da6f53ca88',
          weight: 12763886,
          createdAt: 5505529
        },
        {
          address: '0x1bd06b96dd42ada85fdd0795f3b4a79db914add5',
          weight: 12252430,
          createdAt: 5556431
        },
        {
          address: '0x289cf2b63c5edeeeab89663639674d9233e8668e',
          weight: 9243324,
          createdAt: 13924588
        },
        {
          address: '0x1f1e4c845183ef6d50e9609f16f6f9cae43bc9cb',
          weight: 8749158,
          createdAt: 5564876
        },
        {
          address: '0xeaa5e4620373d9ded4dcb9267f46fcfc6698c867',
          weight: 5055796,
          createdAt: 11713471
        },
        {
          address: '0xfc2fc983a411c4b1e238f7eb949308cf0218c750',
          weight: 4460510,
          createdAt: 11400497
        },
        {
          address: '0x654e651b658f784406125400cf648588cb9773e8',
          weight: 4305392,
          createdAt: 11588412
        },
        {
          address: '0xdf8139e9bebecadecf48bec8c8064ccefb618e2b',
          weight: 4196789,
          createdAt: 12537126
        },
        {
          address: '0xa5bf14bb945297447fe96f6cd1b31b40d31175cb',
          weight: 3804114,
          createdAt: 13981908
        },
        {
          address: '0x5ef8747d1dc4839e92283794a10d448357973ac0',
          weight: 3590202,
          createdAt: 15758491
        },
        {
          address: '0x096c5ccb33cfc5732bcd1f3195c13dbefc4c82f4',
          weight: 3450074,
          createdAt: 9390937
        },
        {
          address: '0x8b1fd78ad67c7da09b682c5392b65ca7caa101b9',
          weight: 3322225,
          createdAt: 9374260
        },
        {
          address: '0x8b80417d92571720949fc22404200ab8faf7775f',
          weight: 2924577,
          createdAt: 14372102
        },
        {
          address: '0x50409de292f5f821888702e9538bf15fa273dfe6',
          weight: 2907854,
          createdAt: 15578935
        },
        {
          address: '0xe55739e1feb9f9aed4ce34830a06ca6cc37494a0',
          weight: 2823261,
          createdAt: 14759604
        },
        {
          address: '0xe88e24f49338f974b528ace10350ac4576c5c8a1',
          weight: 2564574,
          createdAt: 13530089
        },
        {
          address: '0x4b4c614b9219397c02296f6f4e2351259840b3c7',
          weight: 1964643,
          createdAt: 5528540
        }
      ]
    },
    {
      airdrop: 2500,
      timeframe: INITIAL_TIMEFRAME(),
      // aave a tokens (30-06-2021 12:05 UTC)
      tokens: [
        {
          address: '0x1a13F4Ca1d028320A707D99520AbFefca3998b7F',
          weight: 1.28e9,
          createdAt: 12687348
        },
        {
          address: '0x28424507fefb6f7f8E9D3860F56504E4e5f5f390',
          weight: 1.05e9,
          createdAt: 12687350
        },
        {
          address: '0x27F8D03b3a2196956ED754baDc28D73be8830A6e',
          weight: 1.04e9,
          createdAt: 12687348
        },
        {
          address: '0x5c2ed810328349100A66B82b78a1791B101C9D61',
          weight: 368.35e6,
          createdAt: 12687348
        },
        {
          address: '0x60D55F02A771d515e077c9C2403a1ef324885CeC',
          weight: 241.94e6,
          createdAt: 12687348
        },
        {
          address: '0x8dF3aad3a84da6b69A4DA8aeC3eA40d9091B2Ac4',
          weight: 231.79e6,
          createdAt: 12687350
        },
        {
          address: '0x1d2a0E5EC8E5bBDCA5CB219e649B565d8e5c3360',
          weight: 79.39e6,
          createdAt: 12687350
        }
      ]
    },
    {
      airdrop: 3333,
      timeframe: INITIAL_TIMEFRAME(),
      getCreatedAt: uniswapCreatedAt('0xc35dadb65012ec5796536bd9864ed8773abc74c4', 11333218),
      // top 7 weth pairs on sushiswap (30-06-2021 12:15 UTC)
      tokens: [
        {
          address: '0xe62ec2e799305e0d367b0cc3ee2cda135bf89816',
          weight: 148266516.27,
          createdAt: 13782137
        },
        {
          address: '0x34965ba0ac2451a34a0471f04cca3f990b8dea27',
          weight: 87463126.84,
          createdAt: 11583296
        },
        {
          address: '0xc4e595acdd7d12fec385e5da5d43160e8a0bac0e',
          weight: 68550484.14,
          createdAt: 11333973
        },
        {
          address: '0xc2755915a85c6f6c1c0f3a86ac8c058f11caa9c9',
          weight: 53628411.97,
          createdAt: 13067704
        },
        {
          address: '0x6ff62bfb8c12109e8000935a6de54dad83a4f39f',
          weight: 38328887.82,
          createdAt: 11721327
        },
        {
          address: '0x74d23f21f780ca26b47db16b0504f2e3832b9321',
          weight: 29316096.58,
          createdAt: 13773437
        },
        {
          address: '0x2813d43463c374a680f235c428fb1d7f08de0b69',
          weight: 28571400.47,
          createdAt: 14170151
        }
      ]
    },
    {
      airdrop: 3334,
      timeframe: INITIAL_TIMEFRAME(),
      tokens: [
        // all lps on curve (30-06-2021 12:21 UTC)
        {
          address: '0xE7a24EF0C5e95Ffb0f6684b813A78F2a3AD7D171',
          weight: 391358563.15,
          createdAt: 13479479
        },
        {
          address: '0x8096ac61db23291252574D49f036f0f9ed8ab390',
          weight: 11696005.69,
          createdAt: 14884836
        },
        {
          address: '0xf8a57c1d3b9629b77b6726a042ca48990A84Fb49',
          weight: 10469492.34,
          createdAt: 15601117
        }
      ]
    },
    {
      airdrop: 3333,
      timeframe: INITIAL_TIMEFRAME(),
      getCreatedAt: uniswapCreatedAt('0xe7fb3e833efe5f9c441105eb65ef8b261266423b', 5436831),
      // DFYN lps (top 10 highest liquidity pairs) (30-06-2021 12:25 UTC)
      tokens: [
        {
          address: '0xbe40f7fff5a2235af9a8cb79a17373162efefa9c',
          weight: 45511505,
          createdAt: 5475747
        },
        {
          address: '0xdd228fdc8a41a02bdea72060f53c1f88a2fd48b6',
          weight: 27616607,
          createdAt: 11165846
        },
        {
          address: '0xb7bd6d48c9b1af7e126d0389c6970f157d974f33',
          weight: 26544685,
          createdAt: 6132801
        },
        {
          address: '0x39eaa90a70e8fdc04e1f63db04e1c62c9ace0641',
          weight: 21643413,
          createdAt: 9735085
        },
        {
          address: '0x7d51bad48d253dae37cc82cad07f73849286deec',
          weight: 11088330,
          createdAt: 5484229
        },
        {
          address: '0xc3379226aeef21464d05676305dad1261d6f3fac',
          weight: 9832619,
          createdAt: 5574459
        },
        {
          address: '0x39bed7f1c412ab64443196a6fecb2ac20c707224',
          weight: 9145819,
          createdAt: 15466931
        },
        {
          address: '0x9e2fbb31fbd68472f6cd54a1635b8cd64d78fc1c',
          weight: 9035214,
          createdAt: 15165377
        },
        {
          address: '0xb5e1a07c9b6ab3bee8d9bf4066d324c5da89c07f',
          weight: 8809201,
          createdAt: 9744860
        },
        {
          address: '0x7162c0acf32820920a741d8fa466b8e6d60d530d',
          weight: 5744474,
          createdAt: 14316523
        }
      ]
    },
    {
      airdrop: 25000,
      timeframe: {
        start: '21-05-2021',
        end: '01-06-2021'
      },
      getCreatedAt: dxswapCreatedAt('0x03DAa61d8007443a6584e3d8f85105096543C19c', 14599890),
      // top honeyswap pairs (30-06-2021 12:32 UTC)
      tokens: [
        {
          address: '0x6d3842ab227a0436a6e8c459e93c74bd8c16fb34',
          weight: 729271,
          createdAt: 15213270
        },
        {
          address: '0x3f24e142fbf05d16ab1cf79e6df3473f515b16e0',
          weight: 523295,
          createdAt: 15168932
        },
        {
          address: '0xe49fea624d480a5233b5dfc4969a27319873e6f0',
          weight: 461238,
          createdAt: 15058350
        },
        {
          address: '0xd862db749534d539713b2c392421fe5a8e43e19e',
          weight: 393860,
          createdAt: 15218561
        },
        {
          address: '0xeccfd2e27c58429153bb9229e55e4b3efc827d1f',
          weight: 228836,
          createdAt: 15232637
        },
        {
          address: '0xeae495187472b8db83cf9dc738ba3869fde5b1d3',
          weight: 213207,
          createdAt: 14776528
        },
        {
          address: '0xeadb51893e8cdfdf88e551f03ba299daef91ac8c',
          weight: 80206,
          createdAt: 15788461
        },
        {
          address: '0x3a30b8f1d9bfee089c1d929267a0ff914c4098c9',
          weight: 77061,
          createdAt: 15788348
        },
        {
          address: '0x0c787944946d22922c9f41c477cc539700d35bb2',
          weight: 50516,
          createdAt: 15301116
        },
        {
          address: '0xb083768587b17fbf7d385c9db151627c7e3f9d1c',
          weight: 36506,
          createdAt: 15292522
        },
        {
          address: '0x1fc4a2523349bd6df30000b923bb1acb3a27051f',
          weight: 35994,
          createdAt: 14880810
        },
        {
          address: '0xcf863d14b6c3551cad42e4b7f0a2b4b6a72ce122',
          weight: 30147,
          createdAt: 15258295
        },
        {
          address: '0x86b7249272fabb82ef36550ef898ea539225e7f0',
          weight: 28960,
          createdAt: 14792786
        },
        {
          address: '0x96aa3911e89da7b6d8b4a2b796f3000987d23cf2',
          weight: 24087,
          createdAt: 14789763
        },
        {
          address: '0x1013ba833071fd8aca8bf2ac83e5515c5fb9e76f',
          weight: 11703,
          createdAt: 15321524
        },
        {
          address: '0x4fa4164b78fabcc0163d128a154a64e665a5da85',
          weight: 8681,
          createdAt: 15906932
        },
        {
          address: '0x303c477c3e266a5d4ecc5c73f29161e54813329d',
          weight: 5238,
          createdAt: 15879411
        },
        {
          address: '0xcba9d57e29ab4eeb9aa69cd82f93b64505055a3b',
          weight: 4858,
          createdAt: 14778139
        },
        {
          address: '0x6ab8e5eb8514a7b5cb3ce49112db52bef40ebab2',
          weight: 4614,
          createdAt: 15262556
        },
        {
          address: '0x53c49e3f0dd32f09d1d482b49eb77843868b463f',
          weight: 3872,
          createdAt: 15318142
        },
        {
          address: '0xdb535b9145d785e45ab44b01e89dadf6ffefd62a',
          weight: 3212,
          createdAt: 15987135
        },
        {
          address: '0x3a968d1fe0246de743b6f102e679c11be36688a9',
          weight: 2840,
          createdAt: 15317078
        },
        {
          address: '0x2233ea70be0c1d2172947a7b872f084fd093528c',
          weight: 2092,
          createdAt: 15230407
        },
        {
          address: '0xec7600050a4ceeabf902eaa687ab150cc10ef70e',
          weight: 1726,
          createdAt: 15218319
        },
        {
          address: '0xd16552065a2f724fe485aae03bdf56bcbc09f3c5',
          weight: 1473,
          createdAt: 15934561
        },
        {
          address: '0x218e468b15469228f35b0e7f88425cd45fb982bd',
          weight: 1407,
          createdAt: 14767683
        },
        {
          address: '0x2244f119837be9ad8c4ab8a20c286e1db5a2e80d',
          weight: 1276,
          createdAt: 15948468
        },
        {
          address: '0x0aeb0368cc1b7e620703d12c438fc68835fef98b',
          weight: 1204,
          createdAt: 14996213
        },
        {
          address: '0xcce835c52495b4b2f7bbdbb199e1e3646dd92941',
          weight: 1152,
          createdAt: 15301532
        }
      ]
    }
  ]
}