import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteUrlAction, updateUrlAction } from "../../actions/urlActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";

function SingleUrl({ match }) {
  const [shortUrl, setShortUrl] = useState();
  const [longUrl, setLongUrl] = useState();
  const [date, setDate] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   const { id } = useParams();
  //   console.log(id);

  const urlUpdate = useSelector((state) => state.urlUpdate);
  const { loading, error } = urlUpdate;

  //   const urlDelete = useSelector((state) => state.urlDelete);
  //   const { loading: loadingDelete, error: errorDelete } = urlDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUrlAction(id));
    }
    navigate("/myurls");
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/urls/${match.params?.id}`);
      console.log(data);

      setShortUrl(data.shortUrl);
      setLongUrl(data.longUrl);
      setDate(data.updatedAt);
    };

    fetching();
  }, [match.params?.id, date]);

  const resetHandler = () => {
    setShortUrl("");
    setLongUrl("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateUrlAction(match.params.id, shortUrl));
    if (!shortUrl) return;

    resetHandler();
    navigate("/myurls");
  };

  return (
    <MainScreen title="Update Url">
      <Card>
        <Card.Header>Change Url</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler(match.params.id)}>
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
            <Button variant="primary" type="submit">
              Update Url
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(match.params.id)}
            >
              Delete Url
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleUrl;
