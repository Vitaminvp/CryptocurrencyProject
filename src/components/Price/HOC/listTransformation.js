import React from 'react'

 const  WrappedComponent = (OriginalComponent) => (props) => {
        const {list, items, classN, amount} = props;
        const listToMap = !list ? [] : list.map(item => items.filter(element => item.Name === element.Name));
        if((items ? items.length : undefined) && !!list.length){
            return <div className={classN}>
                {listToMap.map(itm => {
                    const [item] = itm;
                    const coinFromList = amount ? list.filter(elem => elem.Name === item.Name)[0].value : '';
                    return <OriginalComponent {...props} item={item} key={item.Id} value={coinFromList}/>
                })}
            </div>
        }else {
                return null;
        }
};
export default WrappedComponent;