import React, {useCallback, useEffect, useState} from 'react'
import styled from 'styled-components';
import axios from 'axios';

import * as InputForm from '../components/styledComponents/InputStyled'

function PaginationNav({total, limit, page, setPage}:any) {
    const numPages = Math.ceil(total / limit);
    return (
        <>
            <Nav>
                <Button onClick={()=> setPage(page -1)} disabled={page === 1} >
                    &lt;
                </Button>
                {
                 Array(numPages).fill(0).map((_, index) => {
                    return (
                        <Button
                            key={index+1}
                            onClick={()=> setPage(index+1)}
                            // aria-current={page === index + 1 ? "Page" : null}
                            aria-current={page === index + 1 && "page" }
                            
                        >
                            {index+1}
                        </Button>
                    )
                 })
                }
                <Button onClick={()=> setPage(page +1)} disabled={page === numPages} >
                    &gt;
                </Button>
            </Nav>
        </>
    )
}

function PaginationContainer({postsList}:any) {
    const [categoryInfo, setCategoryInfo] = useState({
      data:'',
      length : 0
    });
    
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page -1) * limit;
    /*
        1번째 페이지의 첫 게시물의 위치(index) 👉 (1 - 1) * 10 = 0
        2번째 페이지의 첫 게시물의 위치(index) 👉 (2 - 1) * 10 = 10
        3번째 페이지의 첫 게시물의 위치(index) 👉 (3 - 1) * 10 = 20
        4번째 페이지의 첫 게시물의 위치(index) 👉 (4 - 1) * 10 = 30
    */

    useEffect(()=> {
     
      axios.get("http://localhost:9999/api/get/chatcategoryall")
      .then(res=> {
        setCategoryInfo({
          data : res.data.find,
          length : res.data.find.length
        })
      })
    }, [])

    const _setCategory = (target:any):any => {

       return Object.values(categoryInfo.data).map((ele:any, index)=> {
        if(ele.class_no === target) {
          return ele.category_name
        }
      })

    }
    
  
  return (
    <div>
      <div style={{display : "flex", justifyContent : "space-between"}}>
        <h3>작성한 게시글</h3> 
        <InputForm.InputFormWrapSelect style={{width : "130px",}}>
          <select
            value={limit}
            onChange={({ target: { value } }) => setLimit(Number(value))}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </InputForm.InputFormWrapSelect>
      </div>

      <ol style={{ padding : "12px 0"}}>
        { categoryInfo.length ?
            postsList.slice(offset, offset + limit).map(({post_create_date, class_no, post_title, post_desc}:any, index:any) => {
              return  (
                    <ListItem key={index}>
                        <div className='date'>
                          {new Date(post_create_date).getFullYear()}년 {new Date(post_create_date).getMonth()}월 {new Date(post_create_date).getDate()}일 {new Date(post_create_date).getHours()}시 {new Date(post_create_date).getMinutes()}분
                        </div>
                        <div>
                          <div className='location'>
                             위치 : {_setCategory(class_no)}
                          </div>
                          <div className='desc'>
                              내용 : {post_desc}
                          </div>

                        </div>
                    </ListItem>
                )
            }) : ""
        }
      </ol>

      <footer>
        <PaginationNav
            total={postsList.length}
            limit={limit}
            page={page}
            setPage={setPage}
        />
      </footer>
    </div>
  )
}

export default PaginationContainer




const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: #48484A;
  color: white;
  font-size: 1rem;

  &:hover {
    background: grey;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current='page'] {
    background: #0F9485;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

const ListItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  /* width : 100%; */
  padding : 16px 34px ;
  background-color: #fff;
  list-style: none;
  border-radius: 4px;

  &:after {
    content: '';
    position: absolute;
    top : 50%;
    left : 12px;
    transform: translateY(-50%);
    width : 8px;
    height: 8px;
    border-radius: 8px;
    background-color: #0F9485;
  }

  &+li {
    margin-top : 8px
  }

  .date , .location, .desc {
    color : #48484A;
    font-weight: bold;
  }
  .date {
    font-size : 12px;
  }
  .location {
    font-size: 12px;
  }
  .desc {
    font-size: 12px;
  }
`
