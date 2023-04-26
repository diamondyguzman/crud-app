import React from 'react';
import MessageStyles from '../styles/Message.module.css';
import useGlobalValues from '../useHooks/useGlobalValues';

/**
 * @typedef {Object} MessageProps
 * @prop {'error'|'succes'|'info'} type this is the type of message being displayed
 */
/**
 * 
 * @param {MessageProps} param0 
 * @returns 
 */


export default function Message({children, type}){
    const {update} = useGlobalValues(); 
    function getMessageClassNameByType(){
        if(type === 'error'){
            return MessageStyles.error;
        }
        else if(type === 'info'){
            return MessageStyles.info;
        }
        else if (type === 'success'){
            return MessageStyles.success;
        }
    }

    const messageClasses =[MessageStyles.message];
    messageClasses.push(getMessageClassNameByType());

    function clearMessage(){
        update({error: ''});
    }

    return(
        <>
            <div className={messageClasses.join(' ')} onClick={clearMessage}>
                <p>{children}</p>
            </div>
        </>
    )
}