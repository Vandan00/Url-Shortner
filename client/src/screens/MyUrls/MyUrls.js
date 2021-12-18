import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import urls from "../../Urls/Url";

const MyUrls = () => {
  return (
    <MainScreen title="Welcome Back">
      <Link to="createUrl">
        <Button style={{ marginleft: 10, marginbottom: 6 }} size="lg">
          {" "}
          Create Url
        </Button>
        {urls.map((url) => (
          <Card style={{ margin: 10 }}>
            <Card.Header style={{ display: "flex" }}>
              <span
                style={{
                  color: "black",
                  textDecoration: "none",
                  flex: 1,
                  cursor: "pointer",
                  alignSelf: "center",
                  fontSize: 18,
                }}
              >
                {url.Short_Url}
              </span>

              <div>
                <Button>Edit</Button>
                <Button varient="Danger" className="mx-2">
                  Delete
                </Button>
              </div>
            </Card.Header>
          </Card>
        ))}
      </Link>
    </MainScreen>
  );
};

export default MyUrls;
