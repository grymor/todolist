import { useUsers } from "../../../context/UsersContext";
import UsersForm from "../../common/users-form";
import UsersTable from "../../common/users-table";

export default function SubscribePage() {
  const { users } = useUsers();
  return (
    <div className="table-panel">
      <header className="table-panel__header">
        <h2>Users</h2>
        <span className="table-panel__badge">{users.length} users</span>
      </header>

      <UsersForm />

      <div className="table-panel__scroll">
        <UsersTable />
      </div>
    </div>
  );
}
