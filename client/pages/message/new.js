import { useState } from "react";
import useRequest from "../../hooks/use-request";

const NewMessage = ({ data }) => {
  const [text, setText] = useState("");

  console.log(data);

  const { doRequest, errors } = useRequest({
    url: "/api/message",
    method: "post",
    body: { text, data },
    onSuccess: (message) => console.log(message),
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    doRequest();
  };
  return (
    <form onSubmit={onSubmit}>
      <h1>Message</h1>
      <div className="form-group">
        <label> Message </label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="form-control"
        />
      </div>
      {errors}
      <button className="btn btn-primary">Send</button>
    </form>
  );
};

NewMessage.getInitialProps = async (context, client, currentUser) => {
  const { clientId } = context.query;
  // const string = "a";
  const { data } = await client.get(`/api/message/client/${clientId}`);
  return { chat: data };
};

export default NewMessage;
