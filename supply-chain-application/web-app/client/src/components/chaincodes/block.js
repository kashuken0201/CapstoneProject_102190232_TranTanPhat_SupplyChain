import convertUTCDateToLocalDate from "../../utils/convert-date";
import '../../styles/block.css'

const Block = (props) => {
    const showBlockDetail = () => {
        var x = document.getElementById(props.priv);
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }
    return (
        <div className="block" onClick={showBlockDetail}>
            <div className="title-block ">
                <h3>Block #{props.block.Number}</h3>
                <span>{convertUTCDateToLocalDate(new Date(props.block.Timestamp)).toLocaleString()}</span>
            </div>
            <div className="hash">
                <span>PREVIOUS HASH</span>
                <div className="previous-hash">
                    <span className='data'>{props.block.PreviousHash}</span>
                </div>
            </div>
            <div className="hash">
                <span>BLOCK HASH</span>
                <div className="block-hash">
                    <span className='data'>{props.block.BlockHash}</span>
                </div>
            </div>
            <div className="hash">
                <span className='data'>DATA HASH</span>
                <div className="data-hash">
                    <span>{props.block.DataHash}</span>
                </div>
            </div>
            <div className='hash'>
                <span className='data'>TXID</span>
                <div className="tx-id">
                    <span>{props.block.TxID}</span>
                </div>
            </div>
            <div className='hash'>
                <span className='data'>CREATOR</span>
                <div className="creator">
                    <span>{props.block.Creator}</span>
                </div>
            </div>
        </div>
    )
}

export default Block