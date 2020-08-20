import React from 'react';

const Block = ({blockdata, updateSquare, blocknum}) => {
    return(
        <div className="block">
            {
                [...Array(blockdata.rowcount)].map((i, index) => {
                    let rownum = index + 1;
                    return  <>
                                {
                                    blockdata[`row${rownum}`].map((square, index) => {
                                        
                                        return  <select onChange={(e) => updateSquare(blocknum, rownum, index, e.target.value)} value={(square) ? square : ""}>
                                                    <option disabled hidden selected={!square ? true : false}></option>
                                                    {
                                                        [...Array(9)].map((i, index) => {
                                                            let fixed = index + 1;
                                                            return <option selected={(square == fixed) ? true : false}>{fixed}</option>
                                                        })
                                                    }
                                                </select>
                                    })
                                }
                            </>
                })
            }
        </div>
    );
}

export default Block