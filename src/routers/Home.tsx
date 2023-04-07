import styled from 'styled-components';
const Page__title = styled.h2`
    padding: 16px;
    font-size : 20px;
    color : #48484A;
    background-color: #fff;
    border-radius: 6px;
    margin : 12px 0;
`
function Home() {
    return (
       <div>
        <Page__title>앱 설명</Page__title>
        <ol style={{backgroundColor : "#fff", borderRadius : "4px", padding : "16px"}}>
           <h4>asd</h4> 
        </ol>
       </div>
    )
}

export default Home;