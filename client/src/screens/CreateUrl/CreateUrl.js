import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createUrlAction } from "../../actions/urlActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

const CreateUrl = ({ history }) => {
  const [longUrl, setLongUrl] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const urlCreate = useSelector((state) => state.urlCreate);
  const { loading, error, url } = urlCreate;

  console.log(url);

  const resetHandler = () => {
    setLongUrl("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createUrlAction(longUrl));
    if (!longUrl) return;

    resetHandler();
    navigate("/myurls");
    // history.push("/myurls");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Create a Url">
      <Card>
        <Card.Header>Create a new Url</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

            <Form.Group controlId="longUrl">
              <Form.Label>Enter Url</Form.Label>
              <Form.Control
                as="textarea"
                value={longUrl}
                placeholder="Enter the Url"
                rows={4}
                onChange={(e) => setLongUrl(e.target.value)}
              />
            </Form.Group>
            {longUrl && (
              <Card>
                <Card.Header>Url Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{longUrl}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Url
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feild
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default CreateUrl;
