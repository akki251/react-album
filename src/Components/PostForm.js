import { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function PostForm({ addToData }) {
  const inputRef = useRef();

  const [loading, setLoading] = useState(false);

  //
  // ────────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
  //   :::::: H A N D L E   S U B M I T   F O R   F O R M   S U B M I T : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  //
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const title = inputRef.current.value.trim();
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const responseData = await response.json();

    addToData(responseData);

    setLoading(false);
  };

  return (
    <>
      <h4 className="text-center mt-3">POST REQUEST FORM</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title </Form.Label>
          <Form.Control ref={inputRef} type="text" placeholder="Enter title" />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Loading....' : 'Submit'}
        </Button>
      </Form>
    </>
  );
}

export default PostForm;
