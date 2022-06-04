import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Button, Container, ListGroup, Spinner } from 'react-bootstrap';
import PostForm from './Components/PostForm';
import './index.css';

function App() {
  //
  // ─── STATES DECLARATION ─────────────────────────────────────────────────────────
  //
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  //
  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
  //   :::::: F E T C H   D A T A   F R O M   A P I   A N D   S T O R E   I N   S T A T E : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  //
  const fetchData = async () => {
    setLoading(true);
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');

    const apiData = await response.json();

    setData(apiData.splice(0, 5));
    setLoading(false);
  };

  //
  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
  //   :::::: F U C N T I O N   T O   A D D   D A T A   F R O M   F O R M   C O M P O N E N T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  //
  const addToData = async (formData) => {
    setData((prevData) => [
      ...prevData,
      {
        title: formData.title,
        id: new Date().getTime(),
      },
    ]);
  };

  //
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
  //   :::::: D E L T E   I T E M   F R O M   S T A T E   F R O M   D U M M Y   A P I   C A L L : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  //

  const deleteItemHandler = async (id) => {
    setLoading(true);
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    });

    const apiData = await response.json();

    setData((data) => data.filter((item) => item.id !== id));
    setLoading(false);
  };

  //
  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
  //   :::::: E D I T   I T E M   F R O M   S T A T E   B Y   C A L L I N G   D U M M Y   A P I   C A L L : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  //

  const editItemHandler = async (id) => {
    setLoading(true);
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: 'foo',
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const apiData = await response.json();
    apiData.id = new Date().getTime(); // setting date as id so it always get unique id
    // console.log(apiData);
    setData((data) => data.map((item) => (item.id === id ? apiData : item)));

    setLoading(false);
  };

  const Home = (
    <>
      <div>
        <h4 className="text-center">Click to fetch response </h4>
      </div>

      <div className="actions text-center mt-3">
        <Button variant="primary" onClick={fetchData}>
          GET POSTS
        </Button>
      </div>

      <div className="output mt-5">
        <div className="text-center">
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <ListGroup>
              {data.map((item) => (
                <div className="d-flex justify-content-between align-items-center" key={item.id}>
                  <ListGroup.Item className="my-2">{item.title}</ListGroup.Item>
                  <div className="btns d-flex gap-3">
                    <Button onClick={() => editItemHandler(item.id)}>Edit</Button>
                    <Button onClick={() => deleteItemHandler(item.id)} variant="secondary">
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </ListGroup>
          )}
        </div>
      </div>
    </>
  );

  //
  // ──────────────────────────────────────────────────────────────────────────── II ──────────
  //   :::::: M A I N   A P P   C O M P O N E N T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────────
  //
  return (
    <>
      <Container className="shadow-lg p-3">
        {Home}
        <PostForm addToData={addToData}></PostForm>
      </Container>
    </>
  );
}

export default App;
