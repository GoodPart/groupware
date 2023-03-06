export default  function NotificationViewContainer() {
    
}

// import React, {useEffect, useState} from 'react';
// import NotificationView from '../../components/notification/NotificationView';
// import request from '../../utils/axios';

// function NotificationViewContainer({getAuth}:any) {
//     const [notiData, setNotiData] = useState('');
//     useEffect(()=> {
//         // setNotiData('');
//         onReadNotificationList()
//         // request('post', '/api/notification/get/user', {user_id : getAuth.userId})
//         // .then(res=> {
//         //     setNotiData(res.find)
//         // })
//     }, [])

//     const onReadNotificationList = () => {
//         request('post', '/api/notification/get/user', {receiver_id : getAuth.userId})
//         .then(res=> {
//             // console.log(res)
//             setNotiData(res.find)
//         })
//     }

//     const onCheckHandle = (e:any) => {
//         console.log(e)
//     }
//     const onDeleteHandle = (e:any,_id:string) => {
//         // console.log('delete',_id)
//         console.log(e.target.closest(".list"))
//         request('post', '/api/notification/delete', {receiver_id : getAuth.userId, _id : _id})
//         .then(res=> {
//             console.log(res)
//             if(res.success) {
//                 e.target.closest(".list").remove()
//             }
//         })
//         // onReadNotificationList()
//     }

//     return notiData ? (
//         <NotificationView 
//             notiData={notiData}
//             onCheckHandle={onCheckHandle}
//             onDeleteHandle={onDeleteHandle}

//         />
//     ) : (
//         <>loading ...</>
//     ) 
     
// }

// export default NotificationViewContainer