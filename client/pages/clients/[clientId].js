import useRequest from "../../hooks/use-request";
import { useState } from "react";

const ClientShow = ({ client, clientId }) => {
  const items = client.map((item) => (
    <tr key={item.id}>
      <td>{item.message.sender}</td>
      <td>{item.message.recipient}</td>
      <td>{item.message.text}</td>
    </tr>
  ));

  const [text, setText] = useState("");

  const { doRequest, errors } = useRequest({
    url: "/api/message",
    method: "post",
    body: { id: clientId, text },
    onSuccess: (message) => console.log(message),
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    doRequest();
  };

  return (
    <div>
      <h1>Clients</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Sender</th>
            <th>Recipient</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </table>
      <a href="/clients/new">Create new message</a>
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
    </div>
  );
};

ClientShow.getInitialProps = async (context, client) => {
  const { clientId } = context.query;

  const { data } = await client.get(`/api/message/chat/${clientId}`);
  return { client: data, clientId };
};

export default ClientShow;
