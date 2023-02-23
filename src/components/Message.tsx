import { useContext } from "react";
import { MainContext } from '../../src/contexts/Main.context';

const Message = () =>{

    const {messageCtx} = useContext(MainContext);

    const style =  {
        background: 'cornflowerblue',
        width: 'auto',
        padding: '10px 5px 10px 5px',
        borderRadius: '1px',
        fontSize: '16px'
    };

    if(messageCtx !==''){
        return   <div style={style} > {messageCtx} </div>
    }

    return <></>

}

export default Message;