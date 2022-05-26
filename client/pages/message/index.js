import Link from "next/link";

const ListMessage = ({ clients }) => {
  const clientList = clients.map((client) => {
    return (
      <tr key={client.id}>
        <td>{client.clientId}</td>
        <td>
          <Link href="/clients/[clientId]" as={`/clients/${client.id}`}>
            <a>View</a>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h1>Clients</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{clientList}</tbody>
      </table>
    </div>
  );
};

ListMessage.getInitialProps = async (context, client, currentUser) => {
  // const { data } = await client.get("/api/message/client");
  const { data } = await client.get(`/api/message/client`);
  return { clients: data };
};

export default ListMessage;
