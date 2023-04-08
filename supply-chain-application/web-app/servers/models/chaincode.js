const network = require('../fabric/network.js');
const channel = 'milkchannel'

var sha = require('js-sha256');
var asn = require('asn1.js');
var calculateBlockHash = function (header) {
    let headerAsn = asn.define('headerAsn', function () {
        this.seq().obj(
            this.key('Number').int(),
            this.key('PreviousHash').octstr(),
            this.key('DataHash').octstr()
        );
    });

    let output = headerAsn.encode({
        Number: parseInt(header.number),
        PreviousHash: Buffer.from(header.previous_hash, 'hex'),
        DataHash: Buffer.from(header.data_hash, 'hex')
    }, 'der');
    let hash = sha.sha256(output);
    return hash;
};

exports.getChainInfo = async (isManufacturer, isConsumer, information) => {
    const info = information;

    const networkObj = await network.connect(isManufacturer, isConsumer, 'admin', 'qscc');
    const contractRes = await network.queryChaincode(networkObj, 'GetChainInfo', info);

    return {
        data: contractRes,
        key: 'getChainInfo',
    };
};


exports.getBlocks = async (isManufacturer, isConsumer) => {
    let result = [];
    let number = 0;
    while (true) {
        try {
            const networkObj = await network.connect(isManufacturer, isConsumer, 'admin', 'qscc');
            const contractRes = await network.queryChaincode(networkObj, 'GetBlockByNumber', channel, number);
            const blockhash = calculateBlockHash(contractRes.header)
            const res = {
                Number: contractRes.header.number.toString(),
                PreviousHash: contractRes.header.previous_hash.toString('hex'),
                DataHash: contractRes.header.data_hash.toString('hex'),
                BlockHash: blockhash,
                TxID: contractRes.data.data[0].payload.header.channel_header.tx_id,
                Timestamp: contractRes.data.data[0].payload.header.channel_header.timestamp,
                Creator: contractRes.data.data[0].payload.header.signature_header.creator.mspid,
                Value: contractRes.data.data[0].payload.data
            }
            result.push(res)
            number++
            if (number === 7)
                return {
                    data: result,
                    key: 'getBlockByNumber',
                };
        } catch (error) {
            console.log(error)
            return {
                data: result,
                key: 'getBlockByNumber',
            };
        }
    }

};

exports.getBlockByHash = async (isManufacturer, isConsumer, information) => {
    const info = information;

    const networkObj = await network.connect(isManufacturer, isConsumer, 'admin', 'qscc');
    const contractRes = await network.queryChaincode(networkObj, 'GetBlockByHash', channel, info);

    return {
        data: contractRes,
        key: 'getBlockByHash',
    };
};

exports.getTransactionByID = async (isManufacturer, isConsumer, information) => {
    const info = information;

    const networkObj = await network.connect(isManufacturer, isConsumer, 'admin', 'qscc');
    const contractRes = await network.queryChaincode(networkObj, 'GetTransactionByID', channel, info);

    return {
        data: contractRes,
        key: 'getTransactionByID',
    };
};

exports.getBlockByTxID = async (isManufacturer, isConsumer, information) => {
    const info = information;

    const networkObj = await network.connect(isManufacturer, isConsumer, 'admin', 'qscc');
    const contractRes = await network.queryChaincodee(networkObj, 'GetBlockByTxID', channel, info);

    return {
        data: contractRes,
        key: 'getBlockByTxID',
    };
};