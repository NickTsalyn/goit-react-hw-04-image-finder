// import { Container } from "react-bootstrap";
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

import 'bootstrap/dist/css/bootstrap.min.css';

 export const SearchBar = ({onSubmit}) =>  {


  const [query, setQuery] = useState("")

  const handleSearchQueryChange = e => {
   setQuery(e.currentTarget.value.toLowerCase())
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.error('Please enter a search value');
      return;
    }

    onSubmit(query);
  };



    return (
      <Stack direction="horizontal" className="justify-content-center mt-5">
        <Form className="d-flex" onSubmit={handleSubmit}>
          <Form.Control
            name="query"
            className="me-auto"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleSearchQueryChange}
            value={query}
          />
          <Button type="submit">
            <span>Search</span>
          </Button>
        </Form>
      </Stack>
    );
  }
