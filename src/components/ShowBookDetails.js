import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";

function ShowBookDetails(props) {
  const [book, setBook] = useState({});

  //useParams 是 React Router 提供的一個鉤子，用於獲取 URL 中的參數。在這裡，使用它來獲取 id 參數
  //在App.js中使用<Route path="/show-book/:id" element={<ShowBookDetails />} /> 宣告了id這個變數名
  const { id } = useParams();
  const navigate = useNavigate(); //useNavigate 是用於瀏覽到不同路由的鉤子，這裡用於在刪除後導航回書籍列表頁面

  // useEffect(callback, array) 資料獲取、訂閱或手動方式修改 React Component DOM
  // 當組件首次渲染時（以及 id 改變時），發送一個 HTTP GET 請求以獲取特定書籍的詳細信息。
  useEffect(() => {
    axios
      .get(`https://cise-w3-server.vercel.app/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const onDeleteClick = (id) => {
    axios
      .delete(`https://cise-w3-server.vercel.app/${id}`)
      .then((res) => {
        navigate("/"); //useNavigate 的輸入參數不需要包含域名。它僅需要你想要導航到的相對路徑或路由的路徑。React Router 會自動處理路由的跳轉和導航，你只需要提供相對路徑即可。
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const BookItem = (
    <div>
      <table className="table table-hover table-dark">
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Title</td>
            <td>{book.title}</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Author</td>
            <td>{book.author}</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>ISBN</td>
            <td>{book.isbn}</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Publisher</td>
            <td>{book.publisher}</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Published Date</td>
            <td>{book.published_date}</td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>Description</td>
            <td>{book.description}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="ShowBookDetails">
      <div className="container">
        <div className="row">
          <div className="col-md-10 m-auto">
            <br /> <br />
            <Link to="/" className="btn btn-outline-warning float-left">
              Show Book List
            </Link>
            {/* <Link> 是 React Router 中提供的組件，用於在前端應用程序中創建頁面之間的導航鏈接。它能夠以更優雅的方式實現內部路由導航，而不需要刷新整個頁面。 */}
          </div>
          <br />
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Book's Record</h1>
            <p className="lead text-center">View Book's Info</p>
            <hr /> <br />
          </div>
          <div className="col-md-10 m-auto">{BookItem}</div>
          <div className="col-md-6 m-auto">
            <button
              type="button"
              className="btn btn-outline-danger btn-lg btn-block"
              onClick={() => {
                onDeleteClick(book._id);
              }}
            >
              Delete Book
            </button>
          </div>
          <div className="col-md-6 m-auto">
            <Link
              to={`/edit-book/${book._id}`}
              className="btn btn-outline-info btn-lg btn-block"
            >
              Edit Book
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowBookDetails;
